import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // POST /api/chat - Multi-turn Chat Endpoint with Streaming
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, model, role } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'Gemini API key is not configured in environment. Please check your settings.',
        });
      }

      // Model selection per user instructions:
      // - gemini-3.1-pro-preview for particularly complex tasks
      // - gemini-3.5-flash for general tasks (default)
      // - gemini-3.1-flash-lite for tasks that should happen fast
      let selectedModel = 'gemini-3.5-flash';
      if (model === 'gemini-3.1-pro-preview') {
        selectedModel = 'gemini-3.1-pro-preview';
      } else if (model === 'gemini-3.1-flash-lite') {
        selectedModel = 'gemini-3.1-flash-lite';
      }

      // Role specific guidelines
      let roleContext = '';
      if (role === 'recruiter') {
        roleContext = 'Focus on hiring suitability, technical strengths in Java 17 and Spring Boot, problem-solving, architectural rigor, and readiness for Software Development Internships and Junior Backend positions.';
      } else if (role === 'technical') {
        roleContext = 'Focus on deep technical reasoning, system architecture, database schema design (PostgreSQL/JPA), Spring Security stateless JWT implementation, RESTful API design patterns, and code structure.';
      } else {
        roleContext = 'Provide balanced, friendly, and comprehensive answers about Ansh Jain, his developer journey, skills, projects, and contact info.';
      }

      const systemInstruction = `You are "Ansh AI", the virtual technical representative and intelligent assistant for Ansh Jain's portfolio.
Your active role persona: ${roleContext}

About Ansh Jain:
- Name: Ansh Jain
- Location: Indore, Madhya Pradesh, India
- Email: anshjain1440@gmail.com
- Degree: Bachelor of Computer Applications (BCA) in Computer Science, IPS Academy, Indore (Graduation: Class of 2027)
- GitHub: https://github.com/anshjain1440
- LinkedIn: https://www.linkedin.com/in/ansh-jain-567838321
- Professional Summary: Passionate Java Backend & Full-Stack Developer specializing in building high-throughput REST APIs, robust Spring Boot microservices, relational PostgreSQL databases, and modern React interfaces.
- Current Status: Open for Software Development Internships, Junior Backend Developer positions, and project collaborations.

Key Projects Built by Ansh:
1. Smart Healthcare Management System (Full-Stack):
   - Tech: Java, Spring Boot 3.2, React 18, PostgreSQL, Spring Security, JWT, Tailwind CSS.
   - Highlights: Role-Based Access Control (Admin, Doctor, Patient), secure authentication flow, appointment scheduling with conflict prevention, responsive dashboard.
2. College Student Information Portal (Backend & MVC):
   - Tech: Java, Spring Boot, PostgreSQL, REST APIs, MVC.
   - Highlights: Automated student record management, course enrollments, grade calculations, faculty assignments.
3. Personal Financial Tracker & Budget Planner:
   - Tech: React, Tailwind CSS, Spring Boot REST endpoints, Chart visualization.
   - Highlights: Categorized expense tracking, recurring budget goals, monthly analytics.

Core Technical Skills:
- Languages: Java (OOP, Streams, Collections, Multithreading, Generics), JavaScript/TypeScript, SQL, HTML/CSS.
- Backend Frameworks: Spring Boot 3.x, Spring MVC, Spring Data JPA, Hibernate ORM, Spring Security, JWT (JSON Web Tokens).
- Frontend: React 18, Tailwind CSS, Component Architecture, Responsive Layouts.
- Databases & Tools: PostgreSQL, MySQL, Postman (API testing), Git & GitHub, Maven, Docker.
- AI Skills: Integrating Gemini API, generative AI toolkits, prompt engineering for developer workflows.

Conversation Rules:
- Answer accurately and helpfully based on the facts above.
- Be articulate, concise, professional, and engineer-focused.
- If asked about hiring or interviews, encourage reaching out directly to anshjain1440@gmail.com or via LinkedIn.
- Format code snippets cleanly with syntax-highlighted markdown blocks.
- Never hallucinate false degrees or companies not in his profile.`;

      // Convert messages to Gemini format: role 'user' | 'model'
      const formattedContents = messages.map((m: any) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.content || m.text || '') }],
      }));

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const streamResponse = await ai.models.generateContentStream({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });

      for await (const chunk of streamResponse) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error('Chat API Error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: error?.message || 'An error occurred while generating response.',
        });
      } else {
        res.write(`data: ${JSON.stringify({ error: error?.message || 'Error generating response' })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
      }
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'portfolio-backend' });
  });

  const httpServer = http.createServer(app);

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
