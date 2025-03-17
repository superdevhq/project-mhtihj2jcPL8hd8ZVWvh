
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Mail, Lock, User, Building, MapPin, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Registration form schema
const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  businessName: z.string().min(2, { message: 'Business name is required' }),
  address: z.string().min(5, { message: 'Address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  postcode: z.string().min(2, { message: 'Postcode is required' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      address: '',
      city: '',
      postcode: '',
      phone: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...userData } = data;
      await register(userData, data.password);
      setActiveTab('login');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-background z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.15),transparent_40%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
                <FileText className="h-8 w-8" />
                <span>The Invoice Link</span>
              </Link>
              <h1 className="text-3xl font-bold mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h1>
              <p className="text-foreground/70">
                {activeTab === 'login' 
                  ? 'Sign in to access your account' 
                  : 'Register to start your 5-day free trial'}
              </p>
            </div>
            
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="animate-fade-in">
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          {...loginForm.register('email')}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...loginForm.register('password')}
                        />
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    <AnimatedButton 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </AnimatedButton>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="animate-fade-in">
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          className="pl-10"
                          {...registerForm.register('fullName')}
                        />
                      </div>
                      {registerForm.formState.errors.fullName && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.fullName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          {...registerForm.register('email')}
                        />
                      </div>
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...registerForm.register('password')}
                          />
                        </div>
                        {registerForm.formState.errors.password && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...registerForm.register('confirmPassword')}
                          />
                        </div>
                        {registerForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          placeholder="Your Business Ltd"
                          className="pl-10"
                          {...registerForm.register('businessName')}
                        />
                      </div>
                      {registerForm.formState.errors.businessName && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.businessName.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="123 Business Street"
                          className="pl-10"
                          {...registerForm.register('address')}
                        />
                      </div>
                      {registerForm.formState.errors.address && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.address.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="London"
                          {...registerForm.register('city')}
                        />
                        {registerForm.formState.errors.city && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.city.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          placeholder="SW1A 1AA"
                          {...registerForm.register('postcode')}
                        />
                        {registerForm.formState.errors.postcode && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.postcode.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+44 123 456 7890"
                          className="pl-10"
                          {...registerForm.register('phone')}
                        />
                      </div>
                      {registerForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">{registerForm.formState.errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="pt-2">
                      <AnimatedButton 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </AnimatedButton>
                    </div>
                    
                    <p className="text-sm text-center text-muted-foreground mt-4">
                      By registering, you agree to our{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </AnimatedCard>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
