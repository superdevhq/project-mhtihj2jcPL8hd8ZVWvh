
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary transition-transform hover:scale-105"
        >
          <FileText className="h-8 w-8" />
          <span className="animate-fade-in">The Invoice Link</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/invoices"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Invoices
              </Link>
              <Link
                to="/customers"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Customers
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Admin
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary/50">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.fullName ? getInitials(user.fullName) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer flex w-full items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                to="/features"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link to="/login">
                <AnimatedButton variant="ghost">Login</AnimatedButton>
              </Link>
              <Link to="/register">
                <AnimatedButton>Get Started</AnimatedButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Dashboard
                </Link>
                <Link
                  to="/invoices"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Invoices
                </Link>
                <Link
                  to="/customers"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Customers
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-foreground/80 hover:text-primary transition-colors py-2"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Settings
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start text-destructive hover:text-destructive py-2"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/features"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  Contact
                </Link>
                <Link to="/login" className="py-2">
                  <Button variant="ghost" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="py-2">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
