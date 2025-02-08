'use client';

import { HomeIcon, User2Icon, Upload, LogOut, ChevronDown, Rocket, Menu, Loader2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Error signing out. Please try again.');
      console.error('SignOut Error:', error);
    }
  };

  const NavigationLinks = () => (
    <>
      {session && (
        <>
          <Link
            href="/upload"
            className="flex items-center space-x-2 text-purple-200 hover:text-purple-100 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Link>
          <Link
            href="/ask-ai"
            className="flex items-center space-x-2 text-purple-200 hover:text-purple-100 transition-colors"
          >
            <Rocket className="h-4 w-4" />
            <span>Ask AI</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-700/20 bg-purple-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-purple-100 hover:text-purple-200 transition-colors"
              aria-label="Home"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="text-xl font-bold">ScrollHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavigationLinks />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 w-9 p-0 text-purple-200 hover:text-purple-100 hover:bg-purple-800/50"
                  aria-label="User menu"
                  disabled={isLoading}
                >
                  <User2Icon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-purple-900/95 backdrop-blur-sm border-purple-700/50 text-purple-100"
                align="end"
              >
                {isLoading ? (
                  <DropdownMenuLabel className="text-purple-300">
                    <Loader2 />
                  </DropdownMenuLabel>
                ) : session ? (
                  <>
                    <DropdownMenuLabel className="text-purple-300">
                      {session.user?.email?.split('@')[0]}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-purple-700/50" />
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
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden h-9 w-9 p-0 text-purple-200 hover:text-purple-100 hover:bg-purple-800/50"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-purple-950/95 border-purple-700/50 p-0">
              <nav className="flex flex-col space-y-4 p-4">
                <NavigationLinks />
                {!isLoading && (
                  session ? (
                    <>
                      <div className="text-purple-300 px-2">
                        {session.user?.email?.split('@')[0]}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 px-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center space-x-2 text-purple-200 hover:text-purple-100 px-2"
                    >
                      <ChevronDown className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;