import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Ansh Jain",
    roleTitle: "Java Backend Developer | Spring Boot | Full-Stack Developer",
    location: "Indore, Madhya Pradesh, India",
    phone: "9264974887",
    email: "anshjain1440@gmail.com",
    github: "https://github.com/Anshjain1489",
    linkedin: "https://www.linkedin.com/in/ansh-jain-66a4b6326",
    portfolioDomain: "developeransh.netlify.app",
    statusBadge: "Open to Software Development Opportunities",
    heroHeadline: "Java Backend & Full-Stack Developer",
    heroSupportingText:
      "BCA Computer Science student building scalable backend systems, modern web applications, and AI-powered developer tools with Java, Spring Boot, React, and PostgreSQL.",
    aboutSummary:
      "I am a BCA Computer Science student at IPS Academy, Indore, with hands-on experience developing and deploying full-stack and backend applications. My primary focus is Java, Spring Boot, Spring Security, REST APIs, React, and PostgreSQL.\n\nI enjoy building practical applications that combine clean backend architecture, secure authentication, database integration, and modern user interfaces. I also use Generative AI and AI-assisted development tools to accelerate development, debugging, and experimentation.\n\nI am currently seeking internship and entry-level opportunities in Java Backend, Spring Boot, Full-Stack Development, and Software Engineering.",
    primaryFocus: "Java Backend & Spring Boot",
    secondaryFocus: "Full-Stack & AI-integrated Applications",
    college: "IPS Academy, Indore",
    degree: "BCA – Computer Science",
    expectedGraduation: "2027",
  },
  skills: [
    {
      title: "Programming Languages",
      iconName: "Code2",
      badgeTone: "emerald",
      skills: ["Java", "C", "C++", "Python", "JavaScript"],
    },
    {
      title: "Backend Development",
      iconName: "Server",
      badgeTone: "cyan",
      skills: [
        "Spring Boot",
        "Spring MVC",
        "Spring Security",
        "REST APIs",
        "JPA",
        "Hibernate",
        "JDBC",
      ],
    },
    {
      title: "Frontend Engineering",
      iconName: "Layout",
      badgeTone: "blue",
      skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite"],
    },
    {
      title: "Databases & Persistence",
      iconName: "Database",
      badgeTone: "indigo",
      skills: ["MySQL", "PostgreSQL", "Supabase"],
    },
    {
      title: "Developer Tools",
      iconName: "Wrench",
      badgeTone: "amber",
      skills: ["Git", "GitHub", "Maven", "IntelliJ IDEA", "Postman", "JWT"],
    },
    {
      title: "Artificial Intelligence",
      iconName: "Sparkles",
      badgeTone: "violet",
      skills: [
        "Generative AI",
        "Gemini API",
        "OpenAI APIs",
        "AI-assisted Software Development",
      ],
    },
    {
      title: "Core Computer Science Concepts",
      iconName: "Cpu",
      badgeTone: "slate",
      skills: [
        "OOP",
        "DBMS",
        "CRUD",
        "Authentication",
        "Authorization",
        "MVC",
        "Exception Handling",
        "Validation",
      ],
    },
  ],
  projects: [
    {
      id: "apex-hospital-management",
      name: "Apex Hospital Management System",
      shortDescription:
        "Full-stack hospital management platform with separate frontend and backend architecture.",
      technologies: [
        "Java 17",
        "Spring Boot",
        "Spring Security",
        "JWT",
        "JPA/Hibernate",
        "React",
        "PostgreSQL",
        "Razorpay",
      ],
      keyFeatures: [
        "JWT-based stateless authentication",
        "Role-based authorization",
        "Hospital management workflows",
        "REST APIs",
        "Online payment integration",
        "PostgreSQL/Supabase persistence",
        "Responsive React interface",
        "Axios API integration",
        "Protected routes",
      ],
      liveDemoUrl: "https://full-stack-projects-lake.vercel.app",
      githubUrl: "https://github.com/Anshjain1489",
      architectureDiagram: {
        steps: [
          {
            title: "React Client",
            subtitle: "Responsive UI & Axios State",
            tech: "React, Tailwind, Axios",
          },
          {
            title: "Security & Gateway Layer",
            subtitle: "Stateless JWT & RBAC Filters",
            tech: "Spring Security, JWT Token Filter",
          },
          {
            title: "Backend Business Logic",
            subtitle: "REST Controllers & Hospital Workflows",
            tech: "Spring Boot 3, Java 17, Razorpay SDK",
          },
          {
            title: "Data Persistence",
            subtitle: "Relational ORM & Cloud DB",
            tech: "JPA / Hibernate, PostgreSQL / Supabase",
          },
        ],
      },
      highlights: [
        "Architected complete role-based authorization for administrative, doctor, and patient access controls.",
        "Implemented stateless JSON Web Token (JWT) request filtering with cryptographic signature verification.",
        "Engineered transactional billing workflows with integrated Razorpay payment gateway checkout handling.",
        "Designed normalized schema mappings with Hibernate/JPA to manage appointments, medical records, and invoices.",
      ],
    },
    {
      id: "ai-code-reviewer",
      name: "AI Code Reviewer and Bug Detection Platform",
      shortDescription:
        "AI-powered platform for reviewing source code and identifying potential bugs, improvements, and development issues.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Gemini/OpenAI",
      ],
      keyFeatures: [
        "AI-powered code analysis",
        "Automated developer feedback",
        "Authentication",
        "PostgreSQL database integration",
        "Code editor",
        "Analysis dashboard",
        "Gemini/OpenAI integration",
      ],
      liveDemoUrl: "https://ai-code-reviewer-ips-academy.vercel.app",
      githubUrl: "https://github.com/Anshjain1489",
      architectureDiagram: {
        steps: [
          {
            title: "Developer Web Studio",
            subtitle: "Interactive Code Editor & Dashboard",
            tech: "React, Vite, Tailwind CSS",
          },
          {
            title: "Backend API Engine",
            subtitle: "Authentication & Submission Handlers",
            tech: "Node.js, Express, REST APIs",
          },
          {
            title: "LLM Intelligence Service",
            subtitle: "AST-Aware Bug Detection & Quality Scoring",
            tech: "Gemini API, OpenAI Engine",
          },
          {
            title: "Data & Review History",
            subtitle: "Persistent Session & Review Storage",
            tech: "PostgreSQL Database",
          },
        ],
      },
      highlights: [
        "Constructed an automated code review engine that inspects syntax, security bugs, and performance anti-patterns.",
        "Implemented structured prompt templates targeting code smell remediation and algorithmic complexity advice.",
        "Provided instant interactive feedback with actionable diff suggestions and explanation cards.",
        "Stored audit logs and developer submission records within PostgreSQL for historical progress tracking.",
      ],
    },
    {
      id: "full-stack-web-apps",
      name: "Full-Stack Web Applications",
      shortDescription:
        "Collection of database-driven full-stack applications developed using modern frontend, backend, API, authentication, and deployment technologies.",
      technologies: [
        "React",
        "JavaScript",
        "Node.js",
        "Supabase",
        "REST APIs",
      ],
      keyFeatures: [
        "CRUD operations",
        "REST API integration",
        "Authentication",
        "Database integration",
        "Responsive UI",
        "Deployment workflows",
        "AI-assisted development",
      ],
      githubUrl: "https://github.com/Anshjain1489",
      architectureDiagram: {
        steps: [
          {
            title: "Frontend Client",
            subtitle: "Modular Component Architecture",
            tech: "React, JavaScript (ES6+), Modern CSS",
          },
          {
            title: "Application Protocol",
            subtitle: "Decoupled Data Exchange",
            tech: "RESTful JSON Endpoints",
          },
          {
            title: "Backend Engine",
            subtitle: "Business Rules & Controller Logic",
            tech: "Node.js Environment",
          },
          {
            title: "Cloud Persistence",
            subtitle: "Relational Storage & Row-Level Rules",
            tech: "Supabase (PostgreSQL engine)",
          },
        ],
      },
      highlights: [
        "Engineered scalable CRUD data pipelines with comprehensive server-side input validation and error handling.",
        "Integrated modern cloud authentication flows with persistent relational database schemas on Supabase.",
        "Utilized AI-assisted engineering methodologies to accelerate test-case drafting, debugging, and rapid deployment.",
      ],
    },
  ],
  certifications: [
    {
      id: "chatgpt-java-springboot",
      title: "ChatGPT for Java Spring Boot Developers: Code Faster with AI",
      issuer: "Udemy (Java Guides - Ramesh Fadatare)",
      issuedDate: "September 2026",
      credentialId: "UC-b0b50125-52b6-451a-b812-93f8d1a648d4",
      verificationUrl: "https://ude.my/UC-b0b50125-52b6-451a-b812-93f8d1a648d4",
      hours: "9 total hours",
      topics: [
        "AI-assisted Spring Boot REST APIs",
        "Prompt Engineering for Java Developers",
        "Spring Data JPA & Unit Testing with AI",
        "Spring Security Configuration with AI",
      ],
      themeColor: "from-emerald-500/20 to-teal-500/10",
    },
    {
      id: "claude-code-action",
      title: "Claude Code in Action",
      issuer: "Anthropic",
      issuedDate: "April 2026",
      credentialId: "6ra5yuhaouf5",
      verificationUrl: "https://verify.skilljar.com/c/6ra5yuhaouf5",
      topics: [
        "Advanced Claude Developer Tooling",
        "Autonomous CLI & Terminal Agents",
        "Repository-Wide Context & Refactoring",
        "Enterprise Coding Workflows",
      ],
      themeColor: "from-amber-500/20 to-orange-500/10",
    },
    {
      id: "genai-landscape",
      title: "Generative AI Landscape",
      issuer: "Infosys Springboard",
      issuedDate: "March 2026",
      verificationUrl: "https://verify.onwingspan.com",
      topics: [
        "Foundational Large Language Models",
        "Enterprise Generative AI Adoption",
        "Neural Architectures & Transformers",
        "AI Ethics & Responsible Computing",
      ],
      themeColor: "from-blue-500/20 to-cyan-500/10",
    },
    {
      id: "genai-for-all",
      title: "Generative AI for All",
      issuer: "Physics Wallah x Microsoft",
      issuedDate: "December 2025",
      credentialId: "5de54845-35a0-4dcb-af35-12f9869af4ee",
      topics: [
        "Core Generative AI Concepts",
        "Microsoft Cloud & Cognitive Services",
        "Productivity Acceleration with Copilot",
        "Prompt Systems & AI Problem Solving",
      ],
      themeColor: "from-purple-500/20 to-indigo-500/10",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA), Computer Science",
      institution: "IPS Academy, Indore",
      period: "2024–2027",
      details: "Expected Graduation: 2027",
      isCurrent: true,
    },
    {
      degree: "Class XII, CBSE",
      institution: "Gyanodaya Higher Secondary School",
      period: "2024",
      score: "70%",
      details: "Senior Secondary Education (Central Board of Secondary Education)",
      isCurrent: false,
    },
    {
      degree: "Class X, CBSE",
      institution: "Alpine Public School",
      period: "2022",
      score: "66.6%",
      details: "Secondary School Examination (Central Board of Secondary Education)",
      isCurrent: false,
    },
  ],
  buildSteps: [
    {
      step: "01",
      title: "Understand",
      description:
        "Analyze requirements, user workflows, database schema relations, and technical constraints before writing code.",
    },
    {
      step: "02",
      title: "Build",
      description:
        "Develop clean frontend, backend services, RESTful APIs, and relational database integration using Spring Boot or Node.js.",
    },
    {
      step: "03",
      title: "Secure",
      description:
        "Implement stateless JWT authentication, role-based authorization, request payload validation, and robust exception handling.",
    },
    {
      step: "04",
      title: "Deploy",
      description:
        "Test endpoints via Postman, debug edge cases, optimize queries, and deploy production builds with continuous delivery.",
    },
  ],
};
