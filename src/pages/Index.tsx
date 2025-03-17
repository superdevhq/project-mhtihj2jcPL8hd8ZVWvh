
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, ArrowRight, CreditCard, Shield, Clock } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in', 'animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-background z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.15),transparent_40%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="text-primary">Streamline</span> Your Invoicing Process
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Create professional invoices, track payments, and manage your business finances with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/register">
                <AnimatedButton size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </AnimatedButton>
              </Link>
              <Link to="/features">
                <AnimatedButton size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Everything you need to manage your invoicing process efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Invoices</h3>
              <p className="text-foreground/70">
                Create beautiful, customizable invoices that reflect your brand identity.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-foreground/70">
                Accept payments online and track your income with our secure payment system.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time-Saving Automation</h3>
              <p className="text-foreground/70">
                Automate recurring invoices, payment reminders, and receipt generation.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Security</h3>
              <p className="text-foreground/70">
                Your data is encrypted and securely stored with enterprise-grade security.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compliance Ready</h3>
              <p className="text-foreground/70">
                Stay compliant with tax regulations and financial reporting requirements.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-foreground/70">
                Generate comprehensive reports to gain insights into your business finances.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(220,20,60,0.1),transparent_30%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Get started with The Invoice Link in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-on-scroll opacity-0">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-foreground/70">
                Sign up and complete your business profile to get started.
              </p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
              <p className="text-foreground/70">
                Our team will review and approve your account within 24 hours.
              </p>
            </div>
            
            <div className="text-center animate-on-scroll opacity-0">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Invoicing</h3>
              <p className="text-foreground/70">
                Create and send professional invoices to your customers.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12 animate-on-scroll opacity-0">
            <Link to="/register">
              <AnimatedButton size="lg">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Trusted by businesses of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-foreground/60">Small Business Owner</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                "The Invoice Link has transformed how I manage my business finances. The interface is intuitive and the customer support is exceptional."
              </p>
              <div className="flex text-primary mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary mr-4">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-foreground/60">Freelance Designer</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                "As a freelancer, keeping track of invoices was always a challenge. The Invoice Link has made it so simple that I can focus on my creative work instead."
              </p>
              <div className="flex text-primary mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-on-scroll opacity-0">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary mr-4">
                  RJ
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-foreground/60">Agency Owner</p>
                </div>
              </div>
              <p className="text-foreground/80 italic">
                "We've tried several invoicing solutions, but The Invoice Link stands out with its clean interface and powerful features. It's been a game-changer for our agency."
              </p>
              <div className="flex text-primary mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(220,20,60,0.1),transparent_30%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Start with a 5-day free trial, then pay only £9.99 per month
            </p>
          </div>
          
          <div className="max-w-md mx-auto animate-on-scroll opacity-0">
            <AnimatedCard className="p-8 border-primary/20 border-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Standard Plan</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold">£9.99</span>
                  <span className="text-foreground/60 ml-2">/month</span>
                </div>
                <p className="text-foreground/70 mt-2">
                  Everything you need to manage your invoices
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Unlimited invoices</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Unlimited customers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Custom invoice templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Automated payment reminders</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Detailed financial reports</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Export to PDF, CSV, Excel</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Link to="/register">
                  <AnimatedButton className="w-full" size="lg">
                    Start 5-Day Free Trial
                  </AnimatedButton>
                </Link>
                <p className="text-sm text-foreground/60 mt-4">
                  No credit card required for trial. Cancel anytime.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Streamline Your Invoicing?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Join thousands of businesses that trust The Invoice Link for their invoicing needs.
            </p>
            <Link to="/register">
              <AnimatedButton size="lg" animationType="glow">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
