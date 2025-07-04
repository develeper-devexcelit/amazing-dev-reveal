'use client';

import { useState, useRef, useEffect } from 'react';
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

export default function Chatbot() {
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
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
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
      {/* Animated background elements */}
      <MotionDiv 
        className="absolute inset-0 opacity-20"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.4) 0%, transparent 30%)',
          zIndex: -1
        }}
      />
      
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
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          >
            <Bot className="h-5 w-5 text-purple-300" />
          </MotionDiv>
          <h3 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
            AI Assistant
          </h3>
        </MotionDiv>
        <MotionButton 
          onClick={toggleChat}
          className="p-1.5 rounded-full hover:bg-purple-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          aria-label="Close chat"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-5 w-5 text-purple-200" />
        </MotionButton>
      </MotionDiv>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto" style={{ background: 'rgba(15, 23, 42, 0.7)' }}>
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MotionDiv
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.3,
                  delay: index === messages.length - 1 ? 0.1 : 0
                }}
              >
                <MotionDiv 
                  className={`flex max-w-[85%] rounded-2xl px-4 py-3 backdrop-blur-sm ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none shadow-lg shadow-purple-500/20' 
                      : 'bg-slate-800/80 text-slate-100 rounded-bl-none border border-purple-500/20 shadow-lg shadow-purple-900/20'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.1 }
                  }}
                >
                  {message.role === 'assistant' && (
                    <MotionDiv 
                      className="mr-2 mt-0.5"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                      }}
                    >
                      <Bot className="h-4 w-4 text-purple-400" />
                    </MotionDiv>
                  )}
                  <div className="prose prose-sm max-w-none prose-p:leading-snug prose-strong:text-purple-300 prose-strong:font-semibold">
                    {message.content.split('\n').map((line, i) => (
                      <MotionP 
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        {line}
                      </MotionP>
                    ))}
                  </div>
                  {message.role === 'user' && (
                    <MotionDiv 
                      className="ml-2 mt-0.5"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                      }}
                    >
                      <User className="h-4 w-4 text-purple-200" />
                    </MotionDiv>
                  )}
                </MotionDiv>
              </MotionDiv>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <MotionDiv 
              className="flex justify-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }
              }}
            >
              <div className="bg-slate-800/80 rounded-2xl rounded-bl-none border border-purple-500/20 px-4 py-3 shadow-lg shadow-purple-900/20">
                <TypingIndicator />
              </div>
            </MotionDiv>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <MotionForm 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-purple-500/10 bg-slate-900/80 backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <MotionDiv 
          className="relative flex items-center"
          whileHover={{ scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <MotionDiv
            className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/20 rounded-xl -z-10"
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [0.98, 1, 0.98]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full pr-12 bg-slate-800/80 border border-purple-500/30 text-slate-100 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-all duration-300"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <MotionButton
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-1.5 p-1.5 rounded-full ${
              !input.trim() || isLoading
                ? 'text-slate-600'
                : 'text-purple-300 hover:bg-purple-900/50 hover:text-white'
            } transition-all duration-300`}
            aria-label="Send message"
            whileHover={{ 
              scale: input.trim() && !isLoading ? 1.2 : 1,
              rotate: input.trim() && !isLoading ? [0, 10, -10, 0] : 0,
            }}
            whileTap={{ scale: 0.9 }}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
            ) : (
              <MotionDiv
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                <Send className="h-5 w-5" />
              </MotionDiv>
            )}
          </MotionButton>
        </MotionDiv>
        <MotionP 
          className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center space-x-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span>Powered by</span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium">
            OpenRouter AI
          </span>
          <Sparkles className="h-3 w-3 text-purple-400" />
        </MotionP>
      </MotionForm>
    </MotionDiv>
  );
}
