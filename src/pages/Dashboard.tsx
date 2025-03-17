
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  CreditCard, 
  BarChart3, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Plus, 
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data
const mockInvoices = [
  { id: '1', number: 'INV-001', customer: 'Acme Inc.', amount: 1250.00, status: 'paid', dueDate: '2023-05-15' },
  { id: '2', number: 'INV-002', customer: 'Globex Corp', amount: 850.50, status: 'pending', dueDate: '2023-05-20' },
  { id: '3', number: 'INV-003', customer: 'Stark Industries', amount: 3200.75, status: 'overdue', dueDate: '2023-05-10' },
  { id: '4', number: 'INV-004', customer: 'Wayne Enterprises', amount: 1750.25, status: 'draft', dueDate: '2023-05-25' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvoiced: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
    customers: 0
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Calculate stats from mock data
      const totalInvoiced = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
      const paid = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
      const pending = mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
      const overdue = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
      
      setStats({
        totalInvoiced,
        paid,
        pending,
        overdue,
        customers: 12 // Mock number of customers
      });
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'overdue':
        return 'bg-red-500/10 text-red-500';
      case 'draft':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Check if user is in trial period
  const isInTrial = user?.trialEndsAt && new Date(user.trialEndsAt) > new Date();
  
  // Calculate days left in trial
  const getDaysLeft = () => {
    if (!user?.trialEndsAt) return 0;
    const trialEnd = new Date(user.trialEndsAt);
    const today = new Date();
    const diffTime = trialEnd.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.fullName?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-foreground/70">
              Here's an overview of your business
            </p>
          </div>
          
          {/* Trial Notice */}
          {isInTrial && (
            <AnimatedCard className="mb-8 p-4 border-primary/30 bg-primary/5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm">
                  <span className="font-medium">Trial Period:</span> You have {getDaysLeft()} days left in your free trial.
                </p>
                <div className="ml-auto">
                  <Link to="/billing">
                    <Button variant="outline" size="sm">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          )}
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Total Invoiced</h3>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalInvoiced)}</p>
                  <div className="mt-2 text-xs text-green-500">
                    +12% from last month
                  </div>
                </>
              )}
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-500" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Paid</h3>
                  <p className="text-2xl font-bold">{formatCurrency(stats.paid)}</p>
                  <div className="mt-2 text-xs text-green-500">
                    +8% from last month
                  </div>
                </>
              )}
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-yellow-500" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Pending</h3>
                  <p className="text-2xl font-bold">{formatCurrency(stats.pending)}</p>
                  <div className="mt-2 text-xs text-yellow-500">
                    +5% from last month
                  </div>
                </>
              )}
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Overdue</h3>
                  <p className="text-2xl font-bold">{formatCurrency(stats.overdue)}</p>
                  <div className="mt-2 text-xs text-red-500">
                    +2% from last month
                  </div>
                </>
              )}
            </AnimatedCard>
          </div>
          
          {/* Recent Invoices */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnimatedCard className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Invoices</h2>
                    <Link to="/invoices">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-sm font-medium text-foreground/70">Invoice</th>
                          <th className="text-left p-4 text-sm font-medium text-foreground/70">Customer</th>
                          <th className="text-left p-4 text-sm font-medium text-foreground/70">Amount</th>
                          <th className="text-left p-4 text-sm font-medium text-foreground/70">Status</th>
                          <th className="text-left p-4 text-sm font-medium text-foreground/70">Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <Link to={`/invoices/${invoice.id}`} className="text-primary hover:underline">
                                {invoice.number}
                              </Link>
                            </td>
                            <td className="p-4">{invoice.customer}</td>
                            <td className="p-4">{formatCurrency(invoice.amount)}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="p-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                <div className="p-4 flex justify-center">
                  <Link to="/invoices/new">
                    <AnimatedButton>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Invoice
                    </AnimatedButton>
                  </Link>
                </div>
              </AnimatedCard>
            </div>
            
            {/* Quick Actions */}
            <div>
              <AnimatedCard className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold">Quick Actions</h2>
                </div>
                <div className="p-4 space-y-2">
                  <Link to="/invoices/new" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      New Invoice
                    </Button>
                  </Link>
                  <Link to="/customers/new" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      New Customer
                    </Button>
                  </Link>
                  <Link to="/reports" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                  </Link>
                </div>
              </AnimatedCard>
              
              {/* Customers Card */}
              <AnimatedCard className="mt-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Customers</h2>
                    <Link to="/customers">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground/70 mb-1">Total Customers</h3>
                    <p className="text-2xl font-bold">{stats.customers}</p>
                    <div className="mt-2 text-xs text-green-500">
                      +3 new this month
                    </div>
                    
                    <div className="mt-4">
                      <Link to="/customers/new">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Customer
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
