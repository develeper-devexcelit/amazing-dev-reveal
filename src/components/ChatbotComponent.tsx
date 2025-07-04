import React, { useState, useRef, useEffect, useMemo } from 'react';
import OpenAI from 'openai';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Export the ChatbotComponent as the default export
export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
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
          { 
            role: 'system', 
            content: 'You are a helpful assistant with a friendly and professional tone. Keep responses concise and to the point.' 
          },
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
          className="group relative bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="h-8 w-8" />
          <MotionDiv 
            className="absolute -top-1 -right-1 bg-purple-400 rounded-full p-1"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
          >
            <Sparkles className="h-3 w-3 text-white" />
          </MotionDiv>
        </MotionButton>
      </MotionDiv>
    );
  }

  // Memoize rendered messages to avoid re-rendering on input change
  const renderedMessages = useMemo(() => (
    messages.map((message) => (
      <MotionDiv
        key={message.id}
        className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className={
            `max-w-[80%] rounded-2xl p-4 ` +
            (message.role === 'assistant'
              ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-white border border-blue-500/20'
              : 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 text-white border border-purple-500/20')
          }
        >
          <div className="flex items-center space-x-2 mb-1">
            {message.role === 'assistant' ? (
              <Bot className="h-4 w-4 text-blue-400" />
            ) : (
              <User className="h-4 w-4 text-purple-400" />
            )}
            <span className="text-xs font-medium text-gray-300">
              {message.role === 'assistant' ? 'AI Assistant' : 'You'}
            </span>
          </div>
          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm whitespace-pre-wrap"
          >
            {message.content}
          </MotionP>
        </div>
      </MotionDiv>
    ))
  ), [messages]);

  return (
    <MotionDiv 
      className="fixed bottom-8 right-8 w-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl flex flex-col h-[600px] border border-purple-500/20 overflow-hidden z-50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        damping: 25, 
        stiffness: 300,
        duration: 0.5
      }}
      style={{
        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
      }}
    >
      {/* Header */}
      <MotionDiv 
        className="p-4 bg-gradient-to-r from-purple-900/80 to-blue-900/80 text-white flex justify-between items-center border-b border-purple-500/30"
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
            <Bot className="h-6 w-6 text-purple-300" />
          </MotionDiv>
          <h2 className="font-semibold text-lg">AI Assistant</h2>
        </MotionDiv>
        <MotionButton
          onClick={toggleChat}
          className="p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="h-5 w-5 text-gray-300" />
        </MotionButton>
      </MotionDiv>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {renderedMessages}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input */}
      <MotionForm 
        onSubmit={handleSubmit}
        className="p-4 border-t border-purple-500/20 bg-gradient-to-r from-slate-900/90 to-slate-800/90"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800/50 border-slate-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
            disabled={isLoading}
            ref={inputRef}
          />
          <Button 
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={`rounded-full p-2 ${
              isLoading || !input.trim()
                ? 'bg-slate-700 text-gray-400'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
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