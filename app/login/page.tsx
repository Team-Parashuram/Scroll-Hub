'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import CosmicLoader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CosmicLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-950 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-purple-900/20 backdrop-blur-sm border-purple-700/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <LogIn className="h-8 w-8 text-purple-300" />
              <CardTitle className="text-2xl text-purple-100">
                Welcome Back
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-purple-800/20 border-purple-600/50 text-purple-100 placeholder:text-purple-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-purple-800/20 border-purple-600/50 text-purple-100 placeholder:text-purple-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-purple-200">
                Don&#39;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-purple-300 hover:text-purple-200 underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
