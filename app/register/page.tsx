'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Home, ArrowRight, UserPlus } from 'lucide-react';
import CosmicLoader from '@/components/Loader';
import apiRequest from '@/util/apiRequest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (loading) {
    return <CosmicLoader />;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await apiRequest.post('/auth/register', {
        email,
        password,
      });

      if (res.status === 200) {
        router.push('/login');
      } else {
        setError('Failed to register');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-950 flex flex-col">
      {/* Navigation */}
      <nav className="p-4 bg-purple-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-purple-100 hover:text-purple-200 transition-colors"
          >
            <Home size={24} />
            <span className="font-semibold text-lg">Cosmic App</span>
          </Link>
          <div className="space-x-4">
            <Link
              href="/login"
              className="text-purple-200 hover:text-purple-100 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-purple-900/20 backdrop-blur-sm border-purple-700/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <UserPlus className="h-8 w-8 text-purple-300" />
              <CardTitle className="text-2xl text-purple-100">
                Create Account
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200">
              Enter your details to register for an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
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
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-purple-800/20 border-purple-600/50 text-purple-100 placeholder:text-purple-400"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-900/20 border-red-700/50"
                >
                  <AlertDescription className="text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-purple-200">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-purple-300 hover:text-purple-200 underline"
                >
                  Login
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
