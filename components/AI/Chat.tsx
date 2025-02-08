/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  SendHorizontal,
  MessageCircle,
  CircleX,
  CheckCircle2,
  UserCircle,
  Bot,
} from 'lucide-react';
import toast from 'react-hot-toast';
import apiRequest from '@/util/apiRequest';

const Chat = () => {
  const apiKeyRef = useRef<string>('');
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      const res = await apiRequest.get('/ai');
      if (res.status === 200 && res.data.data) {
        apiKeyRef.current = res.data.data;
        const newGenAI = new GoogleGenerativeAI(apiKeyRef.current);
        setGenAI(newGenAI);
        setModel(newGenAI.getGenerativeModel({ model: 'gemini-2.0-flash' }));
      }
    };
    fetchApiKey();
  }, []);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<
    {
      id: number;
      type: 'user' | 'ai';
      message: string;
    }[]
  >([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const chatSession = useMemo(() => {
    if (model) {
      return model.startChat({
        generationConfig,
        history: [],
      });
    }
    return null;
  }, [model]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = async () => {
    if (!prompt.trim() || !chatSession) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: prompt,
    };

    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    const modifiedPrompt = `${prompt},${process.env.NEXT_PUBLIC_SPECIAL_PROMPT}`;

    try {
      const result = await chatSession.sendMessage(modifiedPrompt);
      const aiMessage = {
        id: Date.now(),
        type: 'ai' as const,
        message: result.response.text(),
      };
      setChat((prev) => [...prev, aiMessage]);
      setPrompt('');
      toast.success('Message sent successfully', {
        icon: <CheckCircle2 />,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = {
        id: Date.now(),
        type: 'ai' as const,
        message: 'Sorry, there was an error processing your request.',
      };
      setChat((prev) => [...prev, errorMessage]);
      toast.error('Failed to send message', {
        icon: <CircleX />,
        style: {
          borderRadius: '10px',
          background: '#ff4b4b',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  const clearChat = () => {
    setChat([]);
    toast.success('Chat cleared', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <Card className="w-full shadow-2xl border-2 border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="text-primary" />
            <CardTitle className="text-primary">Scroll-Hub AI</CardTitle>
          </div>
          {chat.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={clearChat}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              Clear Chat
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <div
            ref={scrollRef}
            className="h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-track-secondary/10 scrollbar-thumb-primary/50"
          >
            <AnimatePresence>
              {chat.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: item.type === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                  className={`flex items-center ${
                    item.type === 'user' ? 'justify-end' : 'justify-start'
                  } space-x-2`}
                >
                  {item.type === 'ai' && <Bot className="text-secondary" />}
                  <div
                    className={`
                      p-3 rounded-xl max-w-[80%] shadow-sm
                      ${
                        item.type === 'user'
                          ? 'bg-primary/20 text-primary-foreground'
                          : 'bg-secondary/20 text-secondary-foreground'
                      }
                    `}
                  >
                    {item.message}
                  </div>
                  {item.type === 'user' && (
                    <UserCircle className="text-primary" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex space-x-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about social media wellness..."
              disabled={loading}
              className="flex-grow"
            />
            <Button
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="w-24"
              variant="default"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="mr-2 h-4 w-4" />
              )}{' '}
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;