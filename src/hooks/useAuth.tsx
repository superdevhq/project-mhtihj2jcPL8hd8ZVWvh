
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock data for development until Supabase is connected
const MOCK_ADMIN_EMAIL = 'admin@theinvoicelink.com';
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: MOCK_ADMIN_EMAIL,
    fullName: 'Admin User',
    businessName: 'The Invoice Link',
    address: '123 Admin Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    phone: '07700900000',
    isApproved: true,
    trialEndsAt: null,
    subscriptionAmount: 0,
    subscriptionStatus: 'active',
    createdAt: new Date('2023-01-01')
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - will be replaced with Supabase auth
      const mockUser = MOCK_USERS.find(u => u.email === email);
      
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }
      
      if (!mockUser.isApproved && email !== MOCK_ADMIN_EMAIL) {
        throw new Error('Your account is pending approval');
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: 'Login successful',
        description: `Welcome back, ${mockUser.fullName}!`,
      });
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    try {
      // Mock registration - will be replaced with Supabase auth
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email || '',
        fullName: userData.fullName || '',
        businessName: userData.businessName || '',
        address: userData.address || '',
        city: userData.city || '',
        postcode: userData.postcode || '',
        phone: userData.phone || '',
        isApproved: false, // Requires admin approval
        trialEndsAt: null, // Will be set when approved
        subscriptionAmount: 9.99, // Default amount
        subscriptionStatus: 'pending',
        createdAt: new Date(),
      };
      
      // Check for duplicate business at same address
      const existingBusiness = MOCK_USERS.find(
        u => u.businessName === newUser.businessName && 
             u.address === newUser.address &&
             u.postcode === newUser.postcode
      );
      
      if (existingBusiness) {
        throw new Error('A business with this name and address already exists');
      }
      
      // In a real app, we would save to Supabase here
      toast({
        title: 'Registration successful',
        description: 'Your account is pending approval. You will be notified when approved.',
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout - will be replaced with Supabase auth
      setUser(null);
      localStorage.removeItem('user');
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: 'An error occurred while logging out.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = user?.email === MOCK_ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
