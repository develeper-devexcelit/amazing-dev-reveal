import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import OpenAI from "openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  MessageCircle,
  X,
  Bot,
  User,
  Loader2,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

// Motion components
const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionSpan = motion.span;
const MotionForm = motion.form;
const MotionP = motion.p;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id: string;
  timestamp: Date;
  reactions?: { type: "like" | "dislike"; count: number }[];
}

interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

// Enhanced Typing Indicator with black/white theme
const TypingIndicator = () => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex items-center space-x-2 p-4 bg-white rounded-none border border-gray-200 backdrop-blur-sm shadow-sm"
  >
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3].map((i) => (
          <MotionDiv
            key={i}
            className="w-2 h-2 bg-black rounded-none"
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <MotionSpan
        className="text-sm font-medium text-black"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        AI is thinking...
      </MotionSpan>
    </div>
  </MotionDiv>
);

// Floating particles with grayscale theme
const FloatingParticles = () => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: FloatingParticle[] = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: `particle-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.3 + 0.1,
          color: ["#000000", "#374151", "#6B7280", "#9CA3AF"][
            Math.floor(Math.random() * 4)
          ],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <MotionDiv
          key={particle.id}
          className="absolute rounded-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 0.5,
              particle.opacity,
            ],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Message Component with black/white theme and forwardRef
const MessageComponent = forwardRef<
  HTMLDivElement,
  {
    message: Message;
    onReact: (messageId: string, reaction: "like" | "dislike") => void;
    onCopy: (content: string) => void;
  }
>(({ message, onReact, onCopy }, ref) => {
  const [showActions, setShowActions] = useState(false);
  const isAssistant = message.role === "assistant";

  return (
    <MotionDiv
      ref={ref}
      className={`flex ${isAssistant ? "justify-start" : "justify-end"} group`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        type: "spring",
        damping: 25,
        stiffness: 300,
      }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
    >
      <div
        className={`max-w-[85%] relative ${isAssistant ? "mr-12" : "ml-12"}`}
      >
        <div
          className={`
            relative rounded-none p-4 backdrop-blur-lg border shadow-lg transition-all duration-300 hover:shadow-xl
            transition-all duration-300 hover:shadow-xl
            ${
              isAssistant
                ? "bg-white border-gray-200 text-black hover:border-gray-300 hover:shadow-lg"
                : "bg-gray-100 border-gray-300 text-black hover:border-gray-400 hover:shadow-lg"
            }
          `}
        >
          {/* Message Header */}
          <div className="flex items-center space-x-2 mb-2">
            <div
              className={`w-6 h-6 rounded-none flex items-center justify-center ${
                isAssistant ? "bg-black" : "bg-gray-800"
              }`}
            >
              {isAssistant ? (
                <Bot className="h-3 w-3 text-white" />
              ) : (
                <User className="h-3 w-3 text-white" />
              )}
            </div>
            <span
              className={`text-xs font-semibold ${
                isAssistant ? "text-black" : "text-black"
              }`}
            >
              {isAssistant ? "AI Assistant" : "You"}
            </span>
            <span
              className={`text-xs ${
                isAssistant ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Message Content */}
          <div
            className={`text-sm leading-relaxed ${
              isAssistant ? "text-black" : "text-black"
            }`}
          >
            {isAssistant ? (
              <div className="prose prose-sm max-w-none prose-black">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>

          {/* Message Actions */}
          <AnimatePresence>
            {showActions && (
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute top-2 ${isAssistant ? "right-2" : "left-2"} flex space-x-1`}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-gray-100 backdrop-blur-sm text-black"
                  onClick={() => onCopy(message.content)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                {isAssistant && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-gray-100 backdrop-blur-sm text-black"
                      onClick={() => onReact(message.id, "like")}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-gray-100 backdrop-blur-sm text-black"
                      onClick={() => onReact(message.id, "dislike")}
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionDiv>
  );
});

MessageComponent.displayName = "MessageComponent";

// System prompt with enhanced information
const SYSTEM_PROMPT = `
You are Irtaza Malik's sophisticated AI assistant with a professional yet friendly personality. You have comprehensive knowledge about Irtaza:

🎯 About:
- Passionate technology enthusiast, constantly learning and exploring cutting-edge tools
- Expert in Supabase, Stripe, Next.js, and modern web development
- Machine Learning Engineer/Intern at Machine Learning 1 Limited, Lahore (2024)
- Full Stack Developer & Data Scientist at Devexcel IT, Lahore (2024–present)
- Specializes in LLMs, AI frameworks, chatbot development, e-learning platforms, trading apps, OpenAI integration, and workflow automation

📞 Contact:
- Email: malikirtaza96@gmail.com
- Phone: +923035737327
- Location: Lahore, Pakistan

🚀 Featured Projects:
- Live Bitcoin Prediction: Django-powered real-time Bitcoin price prediction using advanced linear regression
- Advanced Research Agent System: Multi-agent AI research platform built with OpenAI Agents SDK
- AI-Powered Personal Diary: Secure diary application with AI insights using Next.js, MongoDB, and Google Generative AI

💻 Technical Skills:
TypeScript, Next.js, Supabase, Stripe, Google Analytics/Tag Manager, Full Stack Development, n8n Automation, Database Optimization, AI Integrations, Workflow Automation, Debugging, API Development, RESTful APIs, MongoDB, Google Cloud, Docker, Langchain, PostgreSQL, GitHub, Web Development.

Respond with enthusiasm and expertise. Use emojis appropriately and provide detailed, helpful answers while maintaining a conversational tone.
`;

// Main ChatbotComponent
export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi there! I'm Irtaza Malik's AI assistant. I'm here to help you learn about Irtaza's expertise, projects, and experience. What would you like to know?",
      id: "welcome-message",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey:
      import.meta.env.VITE_OPENROUTER_API_KEY ||
      "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",
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
          toast.error("Speech recognition error. Please try again.");
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      toast.error("Speech recognition not supported in this browser");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      id: `user-${Date.now()}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
            .filter((msg) => msg.role !== "system")
            .map((msg) => ({
              role: msg.role as "user" | "assistant" | "system",
              content: msg.content,
            })),
          { role: "user", content: input.trim() },
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1000,
      });

      const assistantMessage = completion.choices[0]?.message;
      if (assistantMessage?.content) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: assistantMessage.content,
            id: `assistant-${Date.now()}`,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, I encountered an error. Please try again in a moment.",
          id: `error-${Date.now()}`,
          timestamp: new Date(),
        },
      ]);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleReact = (messageId: string, reaction: "like" | "dislike") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions: [{ type: reaction, count: 1 }] }
          : msg,
      ),
    );
    toast.success(`Thanks for your feedback! 👍`);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard! 📋");
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi there! I'm Irtaza Malik's AI assistant. I'm here to help you learn about Irtaza's expertise, projects, and experience. What would you like to know?",
        id: "welcome-message",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat cleared! 🧹");
  };

  // Floating button when chat is closed
  if (!isOpen) {
    return (
      <MotionDiv
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <MotionButton
          onClick={toggleChat}
          className="group relative overflow-hidden bg-black text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-black/25 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(0,0,0,0.4)",
              "0 0 0 20px rgba(0,0,0,0.1)",
              "0 0 0 0 rgba(0,0,0,0.4)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            },
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

          {/* Sparkles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <MotionDiv
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${15 + (i % 3) * 25}%`,
                  top: `${20 + Math.floor(i / 3) * 30}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <MessageCircle className="h-8 w-8 relative z-10" />
        </MotionButton>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className="fixed bottom-8 right-8 w-96 bg-white backdrop-blur-xl rounded-none shadow-2xl flex flex-col h-[650px] border border-gray-200 overflow-hidden z-50"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.6,
      }}
    >
      {/* Background particles */}
      <FloatingParticles />

      {/* Header */}
      <MotionDiv
        className="relative p-4 bg-white text-black flex justify-between items-center border-b border-gray-300"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center space-x-3">
          <MotionDiv
            className="w-10 h-10 bg-black rounded-none flex items-center justify-center backdrop-blur-sm border border-gray-200"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Bot className="h-5 w-5 text-white" />
          </MotionDiv>
          <div>
            <h2 className="font-bold text-lg tracking-wide text-black">
              AI Assistant
            </h2>
            <p className="text-xs text-gray-600 font-medium">
              Always here to help ✨
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={clearChat}
            variant="ghost"
            size="sm"
            className="text-black hover:bg-gray-100 h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button
            onClick={toggleChat}
            variant="ghost"
            size="sm"
            className="text-black hover:bg-gray-100 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </MotionDiv>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-white backdrop-blur-sm">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <MessageComponent
                key={message.id}
                message={message}
                onReact={handleReact}
                onCopy={handleCopy}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <MotionForm
        onSubmit={handleSubmit}
        className="p-4 bg-white backdrop-blur-sm border-t border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Irtaza..."
              className="pr-12 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:ring-gray-200 rounded-none"
              disabled={isLoading}
              ref={inputRef}
              maxLength={500}
            />
            <Button
              type="button"
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-none transition-all duration-300 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:scale-110"
              }`}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`h-12 w-12 rounded-none p-0 ${
              isLoading || !input.trim()
                ? "bg-gray-200 text-gray-400"
                : "bg-black text-white hover:bg-gray-800 shadow-lg"
            }`}
          >
            <MotionDiv
              animate={isLoading ? { rotate: 360 } : {}}
              transition={
                isLoading
                  ? { duration: 2, repeat: Infinity, ease: "linear" }
                  : {}
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </MotionDiv>
          </Button>
        </div>
        <div className="mt-2 text-xs text-black text-center flex items-center justify-center space-x-2">
          <span>Press Enter to send</span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center space-x-1">
            <Mic className="h-3 w-3" />
            <span>Voice input</span>
          </span>
        </div>
      </MotionForm>
    </MotionDiv>
  );
}
