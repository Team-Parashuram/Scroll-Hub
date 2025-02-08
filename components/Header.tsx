'use client';

import { HomeIcon, User2Icon, Upload, LogOut, ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Error signing out');
      console.error(error);
    }
  };

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-700/20 bg-purple-950/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-purple-100 hover:text-purple-200 transition-colors"
              prefetch={true}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="text-xl font-bold">ScrollHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session && (
              <Link
                href="/upload"
                className="hidden md:flex items-center space-x-2 text-purple-200 hover:text-purple-100 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 w-9 p-0 text-purple-200 hover:text-purple-100 hover:bg-purple-800/50"
                >
                  <User2Icon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-purple-900/95 backdrop-blur-sm border-purple-700/50 text-purple-100"
                align="end"
              >
                {session ? (
                  <>
                    <DropdownMenuLabel className="text-purple-300">
                      {session.user?.email?.split('@')[0]}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-purple-700/50" />
                    <DropdownMenuItem
                      className="hover:bg-purple-800/50 focus:bg-purple-800/50 cursor-pointer"
                      asChild
                    ></DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400 hover:text-red-300 hover:bg-purple-800/50 focus:bg-purple-800/50 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem
                    className="hover:bg-purple-800/50 focus:bg-purple-800/50 cursor-pointer"
                    asChild
                  >
                    <Link href="/login" className="flex items-center">
                      <ChevronDown className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
