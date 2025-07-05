import { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// Explicitly define motion components
const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionSpan = motion.span;
const MotionForm = motion.form;
const MotionP = motion.p;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  id: string;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    <MotionDiv
      className="flex space-x-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {[1, 2, 3].map((i) => (
        <MotionDiv
          key={i}
          className="w-2 h-2 bg-purple-400 rounded-full"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </MotionDiv>
    <MotionSpan 
      className="text-sm text-purple-300 ml-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      typing...
    </MotionSpan>
  </div>
);

// Add system prompt with all info
const SYSTEM_PROMPT = `
You are a helpful assistant with a friendly and professional tone. You know the following information about the user:

About:
- Passionate about technology, always learning and exploring new tools.
- Expertise in Supabase, Stripe, Next.js.
- Experience as a Machine Learning Engineer/Intern (Machine Learning 1 Limited, Lahore, 2024), and as a Full Stack Developer & Data Scientist (Devexcel IT, Lahore, 2024–present).
- Work includes LLMs, AI frameworks, chatbot prototypes, e-learning platforms, card trading apps, OpenAI API integration, and workflow automation.

Contact:
- Email: malikirtaza96@gmail.com
- Phone: +923035737327
- Location: Lahore, Pakistan

Projects:
- Live Bitcoin Prediction: Django app for real-time Bitcoin price prediction using linear regression. GitHub: https://github.com/irtaza302/Bit_coin-prediction-Django-Live
- Advanced Research Agent System: Multi-agent AI research system using OpenAI Agents SDK. GitHub: https://github.com/irtaza302/open-router-agent
- AI-Powered Personal Diary: Secure diary app with AI insights, built with Next.js, MongoDB, Google Generative AI. GitHub: https://github.com/irtaza302/ai-personal-diary

Skills:
TypeScript, Next.js, Supabase, Stripe, Google Analytics/Tag Manager, Full Stack Development, n8n Automation, Database Optimization, AI Integrations, Workflow Automation, Debugging, Troubleshooting, API Development, RESTful APIs, MongoDB, Google Cloud, Docker, Langchain, PostgreSQL, GitHub, Web Development.

When asked about any of these, answer with the relevant details. If you don't know, say so. Keep responses concise and to the point.
`;

// Export the ChatbotComponent as the default export
export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant',
      content: "Hi! I am Irtaza Malik's personal AI assistant. Ask me anything about Irtaza.",
      id: 'welcome-message'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize OpenAI client with OpenRouter
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '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', // Hardcoded for build
    baseURL: 'https://openrouter.ai/api/v1',
    dangerouslyAllowBrowser: true,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      id: Date.now().toString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
            .filter(msg => msg.role !== 'system')
            .map(msg => ({
              role: msg.role as 'user' | 'assistant' | 'system',
              content: msg.content
            })),
          { role: 'user', content: input }
        ],
        stream: false,
      });

      const assistantMessage = completion.choices[0]?.message;
      if (assistantMessage?.content) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: assistantMessage.content,
          id: `assistant-${Date.now()}`
        }]);
      }
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again in a moment.',
        id: `error-${Date.now()}`
      }]);
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

  // Floating button when chat is closed
  if (!isOpen) {
    return (
      <MotionDiv
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <MotionButton
          onClick={toggleChat}
          className="group relative bg-black text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-gray-400/30 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.95 }}
          // Pulsing glow animation
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(168,85,247,0.7)',
              '0 0 0 12px rgba(168,85,247,0.2)',
              '0 0 0 0 rgba(168,85,247,0.7)'
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }
          }}
        >
          {/* Sparkle shimmer effect on hover */}
          <span className="absolute inset-0 pointer-events-none">
            <MotionDiv
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
              style={{ pointerEvents: 'none' }}
            >
              <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <MotionDiv
                  initial={{ x: -48 }}
                  animate={{ x: [ -48, 48 ] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                >
                  <rect x="0" y="0" width="48" height="48" fill="url(#shimmer)" fillOpacity="0.3" />
                </MotionDiv>
                <defs>
                  <linearGradient id="shimmer" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </MotionDiv>
          </span>
          <MessageCircle className="h-8 w-8 relative z-10" />
        </MotionButton>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv 
      className="fixed bottom-8 right-8 w-96 bg-white rounded-2xl shadow-2xl flex flex-col h-[600px] border border-gray-300 overflow-hidden z-50"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        damping: 25, 
        stiffness: 300,
        duration: 0.5
      }}
    >
      {/* Header */}
      <MotionDiv 
        className="p-4 bg-white text-black flex justify-between items-center border-b border-gray-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <MotionDiv 
          className="flex items-center space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <MotionDiv
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            <Bot className="h-6 w-6 text-gray-700" />
          </MotionDiv>
          <h2 className="font-semibold text-lg">AI Assistant</h2>
        </MotionDiv>
        <MotionButton
          onClick={toggleChat}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="h-5 w-5 text-gray-500" />
        </MotionButton>
      </MotionDiv>
      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-white">
        <div className="space-y-4">
          {messages.map((message) => (
            <MotionDiv
              key={message.id}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`
                  max-w-[80%] rounded-2xl p-4 
                  ${message.role === 'assistant' 
                    ? 'bg-gray-200 text-black border border-gray-300' 
                    : 'bg-gray-100 text-black border border-gray-300'}
                `}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-gray-500" />
                  ) : (
                    <User className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-xs font-medium text-gray-700">
                    {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                  </span>
                </div>
                <MotionP
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm whitespace-pre-wrap"
                >
                  {message.role === 'assistant' ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </MotionP>
              </div>
            </MotionDiv>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      {/* Input */}
      <MotionForm 
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 bg-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 border-gray-300 text-black placeholder-gray-500 focus:border-gray-500 focus:ring-gray-200"
            disabled={isLoading}
            ref={inputRef}
          />
          <Button 
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={`rounded-full p-2 ${
              isLoading || !input.trim()
                ? 'bg-gray-200 text-gray-400'
                : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </MotionForm>
    </MotionDiv>
  );
} 