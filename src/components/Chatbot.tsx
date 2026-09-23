import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  Zap,
  Cpu,
  Briefcase,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

type ModelType = 'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview';
type RoleType = 'general' | 'technical' | 'recruiter';

const SUGGESTIONS = [
  'What are Ansh\'s core Spring Boot projects?',
  'How did Ansh implement JWT security?',
  'Why hire Ansh for a backend internship?',
  'What is Ansh\'s education and graduation year?',
  'How can I contact Ansh for an interview?',
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Model & Role state
  const [selectedModel, setSelectedModel] = useState<ModelType>('gemini-3.5-flash');
  const [selectedRole, setSelectedRole] = useState<RoleType>('general');
  const [showConfig, setShowConfig] = useState(false);

  // Chat message history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        '👋 Hi! I\'m **Ansh AI**, a virtual technical assistant trained on Ansh Jain\'s developer background, Spring Boot projects, and software engineering skills.\n\nHow can I help you today? You can ask about his architecture choices, backend experience, or availability for internships!',
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: 'Conversation cleared! How can I assist you now?',
        timestamp: new Date(),
      },
    ]);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    // Append user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const botMessageId = `bot-${Date.now()}`;
    const botPlaceholder: ChatMessage = {
      id: botMessageId,
      role: 'model',
      content: '',
      timestamp: new Date(),
    };

    // Add empty placeholder for streaming
    setMessages((prev) => [...prev, botPlaceholder]);

    try {
      // Prepare history payload
      const historyPayload = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: historyPayload,
          model: selectedModel,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, content: accumulatedText }
                        : msg
                    )
                  );
                } else if (parsed.error) {
                  accumulatedText += `\n\n*(Error: ${parsed.error})*`;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, content: accumulatedText }
                        : msg
                    )
                  );
                }
              } catch {
                // Ignore parse errors on partial frames
              }
            }
          }
        }
      } else {
        throw new Error('Response stream not readable.');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                content:
                  msg.content ||
                  `Sorry, I encountered an issue connecting to the AI service: ${err?.message || 'Network error'}. Please try again.`,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper function to render text with markdown code snippets & bold formatting
  const renderMessageContent = (content: string) => {
    // Split by code blocks ```
    const codeBlockRegex = /```([a-zA-Z0-9]*)\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
        });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        code: match[2].trim(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex),
      });
    }

    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {parts.map((part, index) => {
          if (part.type === 'code') {
            return (
              <div
                key={index}
                className="my-2 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 font-mono text-xs"
              >
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>{part.language || 'code'}</span>
                  <button
                    onClick={() => handleCopy(part.code || '', `code-${index}`)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === `code-${index}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 overflow-x-auto text-emerald-300">
                  <code>{part.code}</code>
                </pre>
              </div>
            );
          }

          // Format paragraphs, bold, and list items in regular text
          const lines = part.content.split('\n');
          return (
            <div key={index} className="space-y-1">
              {lines.map((line, lIdx) => {
                if (!line.trim()) return <div key={lIdx} className="h-1" />;

                // Check for bullet list item
                const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
                const cleanLine = isBullet ? line.trim().substring(2) : line;

                // Simple bold replacement
                const formattedLine = cleanLine.split(/(\*\*.*?\*\*)/g).map((seg, sIdx) => {
                  if (seg.startsWith('**') && seg.endsWith('**')) {
                    return <strong key={sIdx} className="font-semibold text-slate-900 dark:text-white">{seg.slice(2, -2)}</strong>;
                  }
                  return seg;
                });

                if (isBullet) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{formattedLine}</span>
                    </div>
                  );
                }

                return <p key={lIdx}>{formattedLine}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            id="open-chatbot-btn"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-xl shadow-emerald-900/30 transition-all duration-200 border border-emerald-400/30 group"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
              </span>
            </div>
            <span className="font-semibold">Ask Ansh AI</span>
            <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed z-50 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden ${
              isExpanded
                ? 'inset-4 md:inset-10'
                : 'bottom-4 right-4 w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide">Ansh AI Assistant</h3>
                    <span className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                      Gemini
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Online • Ansh Jain Portfolio</span>
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Configure Model & Persona"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showConfig ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Config & Model Drawer (collapsible) */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-800/90 border-b border-slate-700 p-3 text-xs space-y-2.5 overflow-hidden"
                >
                  {/* Model Selector */}
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">
                      Gemini Model Selection:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setSelectedModel('gemini-3.5-flash')}
                        className={`p-1.5 rounded text-[11px] font-medium transition-colors text-left flex items-center gap-1 ${
                          selectedModel === 'gemini-3.5-flash'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Bot className="w-3 h-3 shrink-0" />
                        <span className="truncate">3.5 Flash (General)</span>
                      </button>

                      <button
                        onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                        className={`p-1.5 rounded text-[11px] font-medium transition-colors text-left flex items-center gap-1 ${
                          selectedModel === 'gemini-3.1-flash-lite'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Zap className="w-3 h-3 shrink-0" />
                        <span className="truncate">Flash Lite (Fast)</span>
                      </button>

                      <button
                        onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
                        className={`p-1.5 rounded text-[11px] font-medium transition-colors text-left flex items-center gap-1 ${
                          selectedModel === 'gemini-3.1-pro-preview'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Cpu className="w-3 h-3 shrink-0" />
                        <span className="truncate">3.1 Pro (Complex)</span>
                      </button>
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">
                      Assistant Focus Role:
                    </label>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setSelectedRole('general')}
                        className={`px-2 py-1 rounded text-[11px] transition-colors ${
                          selectedRole === 'general'
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        General Overview
                      </button>
                      <button
                        onClick={() => setSelectedRole('technical')}
                        className={`px-2 py-1 rounded text-[11px] transition-colors flex items-center gap-1 ${
                          selectedRole === 'technical'
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Cpu className="w-3 h-3" />
                        <span>Technical Deep-Dive</span>
                      </button>
                      <button
                        onClick={() => setSelectedRole('recruiter')}
                        className={`px-2 py-1 rounded text-[11px] transition-colors flex items-center gap-1 ${
                          selectedRole === 'recruiter'
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Briefcase className="w-3 h-3" />
                        <span>Recruiter Advisor</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        isUser
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`relative max-w-[85%] rounded-2xl px-4 py-3 shadow-xs ${
                        isUser
                          ? 'bg-emerald-600 text-white rounded-tr-xs'
                          : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200 dark:border-slate-700/80'
                      }`}
                    >
                      {/* Message Content */}
                      {message.content ? (
                        renderMessageContent(message.content)
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-slate-400 text-xs font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                          <span className="ml-1 text-[11px]">Thinking...</span>
                        </div>
                      )}

                      {/* Timestamp & Copy for Bot */}
                      {!isUser && message.content && (
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-700/50 text-[10px] text-slate-500 dark:text-slate-400">
                          <span>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <button
                            onClick={() => handleCopy(message.content, message.id)}
                            className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                            title="Copy response"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (Shown if conversation has <= 2 messages) */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      disabled={isLoading}
                      className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-end gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask about Ansh's code, stack, or experience..."
                    disabled={isLoading}
                    className="w-full resize-none rounded-xl bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all max-h-24"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-emerald-900/20 transition-all shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500 dark:text-slate-400">
                <span>Model: {selectedModel}</span>
                <span>Press Enter to send, Shift+Enter for newline</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
