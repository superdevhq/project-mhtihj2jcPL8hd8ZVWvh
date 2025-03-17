
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Loader2,
  CheckCircle,
  XCircle,
  Edit,
  Calendar
} from 'lucide-react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    fullName: 'John Doe',
    businessName: 'Doe Enterprises',
    address: '123 Main St',
    city: 'London',
    postcode: 'SW1A 1AA',
    phone: '07700900000',
    isApproved: false,
    trialEndsAt: null,
    subscriptionAmount: 9.99,
    subscriptionStatus: 'pending',
    createdAt: new Date('2023-05-01')
  },
  {
    id: '2',
    email: 'jane@example.com',
    fullName: 'Jane Smith',
    businessName: 'Smith Design',
    address: '456 High St',
    city: 'Manchester',
    postcode: 'M1 1AA',
    phone: '07700900001',
    isApproved: true,
    trialEndsAt: new Date('2023-05-20'),
    subscriptionAmount: 9.99,
    subscriptionStatus: 'trial',
    createdAt: new Date('2023-05-05')
  },
  {
    id: '3',
    email: 'bob@example.com',
    fullName: 'Bob Johnson',
    businessName: 'Johnson Consulting',
    address: '789 Park Lane',
    city: 'Birmingham',
    postcode: 'B1 1AA',
    phone: '07700900002',
    isApproved: true,
    trialEndsAt: null,
    subscriptionAmount: 7.99,
    subscriptionStatus: 'active',
    createdAt: new Date('2023-04-15')
  },
  {
    id: '4',
    email: 'sarah@example.com',
    fullName: 'Sarah Williams',
    businessName: 'Williams & Co',
    address: '101 Queen St',
    city: 'Glasgow',
    postcode: 'G1 1AA',
    phone: '07700900003',
    isApproved: false,
    trialEndsAt: null,
    subscriptionAmount: 9.99,
    subscriptionStatus: 'pending',
    createdAt: new Date('2023-05-10')
  },
  {
    id: '5',
    email: 'mike@example.com',
    fullName: 'Mike Brown',
    businessName: 'Brown Motors',
    address: '202 King St',
    city: 'Leeds',
    postcode: 'LS1 1AA',
    phone: '07700900004',
    isApproved: true,
    trialEndsAt: null,
    subscriptionAmount: 9.99,
    subscriptionStatus: 'canceled',
    createdAt: new Date('2023-03-20')
  }
];

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedSubscriptionAmount, setEditedSubscriptionAmount] = useState('');

  // Check if user is admin, if not redirect
  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  // Load users data
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter users based on search term and filter
  useEffect(() => {
    let result = users;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.fullName.toLowerCase().includes(term) || 
        user.businessName.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (filter !== 'all') {
      if (filter === 'pending') {
        result = result.filter(user => !user.isApproved);
      } else if (filter === 'approved') {
        result = result.filter(user => user.isApproved);
      } else if (filter === 'trial') {
        result = result.filter(user => 
          user.isApproved && 
          user.trialEndsAt && 
          new Date(user.trialEndsAt) > new Date()
        );
      } else if (filter === 'active') {
        result = result.filter(user => 
          user.isApproved && 
          user.subscriptionStatus === 'active'
        );
      } else if (filter === 'canceled') {
        result = result.filter(user => 
          user.subscriptionStatus === 'canceled'
        );
      }
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, filter]);

  // Approve user
  const approveUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          // Set trial end date to 5 days from now
          const trialEndsAt = new Date();
          trialEndsAt.setDate(trialEndsAt.getDate() + 5);
          
          return {
            ...user,
            isApproved: true,
            trialEndsAt,
            subscriptionStatus: 'trial'
          };
        }
        return user;
      })
    );
  };

  // Reject user
  const rejectUser = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.filter(user => user.id !== userId)
    );
  };

  // Update subscription amount
  const updateSubscriptionAmount = () => {
    if (!selectedUser) return;
    
    const amount = parseFloat(editedSubscriptionAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            subscriptionAmount: amount
          };
        }
        return user;
      })
    );
    
    setIsEditDialogOpen(false);
  };

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  // Get status badge class
  const getStatusBadgeClass = (user: User) => {
    if (!user.isApproved) {
      return 'bg-yellow-500/10 text-yellow-500';
    }
    
    switch (user.subscriptionStatus) {
      case 'trial':
        return 'bg-blue-500/10 text-blue-500';
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'canceled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Get status text
  const getStatusText = (user: User) => {
    if (!user.isApproved) {
      return 'Pending Approval';
    }
    
    switch (user.subscriptionStatus) {
      case 'trial':
        return 'Trial';
      case 'active':
        return 'Active';
      case 'canceled':
        return 'Canceled';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-foreground/70">
              Manage users, approvals, and subscriptions
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Total Users</h3>
                  <p className="text-2xl font-bold">{users.length}</p>
                </>
              )}
            </AnimatedCard>
            
            <AnimatedCard className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Pending Approval</h3>
                  <p className="text-2xl font-bold">{users.filter(user => !user.isApproved).length}</p>
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
                      <UserCheck className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-foreground/70 mb-1">Active Subscriptions</h3>
                  <p className="text-2xl font-bold">{users.filter(user => user.isApproved && user.subscriptionStatus === 'active').length}</p>
                </>
              )}
            </AnimatedCard>
          </div>
          
          {/* Users Table */}
          <AnimatedCard className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 border-b border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-semibold">Users</h2>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full md:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        {filter === 'all' ? 'All Users' : 
                         filter === 'pending' ? 'Pending Approval' : 
                         filter === 'approved' ? 'Approved' : 
                         filter === 'trial' ? 'Trial' : 
                         filter === 'active' ? 'Active' : 
                         'Canceled'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setFilter('all')}>
                        All Users
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter('pending')}>
                        Pending Approval
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter('approved')}>
                        Approved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter('trial')}>
                        Trial
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter('active')}>
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilter('canceled')}>
                        Canceled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
                      <th className="text-left p-4 text-sm font-medium text-foreground/70">User</th>
                      <th className="text-left p-4 text-sm font-medium text-foreground/70">Business</th>
                      <th className="text-left p-4 text-sm font-medium text-foreground/70">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-foreground/70">Trial Ends</th>
                      <th className="text-left p-4 text-sm font-medium text-foreground/70">Subscription</th>
                      <th className="text-left p-4 text-sm font-medium text-foreground/70">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-muted-foreground">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{user.fullName}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{user.businessName}</div>
                              <div className="text-sm text-muted-foreground">{user.city}, {user.postcode}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(user)}`}>
                              {getStatusText(user)}
                            </span>
                          </td>
                          <td className="p-4">
                            {user.trialEndsAt ? (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                {formatDate(user.trialEndsAt)}
                              </div>
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td className="p-4">
                            {formatCurrency(user.subscriptionAmount)}/month
                          </td>
                          <td className="p-4">
                            {!user.isApproved ? (
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-500 border-green-500/20 hover:bg-green-500/10"
                                  onClick={() => approveUser(user.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                                  onClick={() => rejectUser(user.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedUser(user);
                                    setIsUserDialogOpen(true);
                                  }}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedUser(user);
                                    setEditedSubscriptionAmount(user.subscriptionAmount.toString());
                                    setIsEditDialogOpen(true);
                                  }}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Subscription
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </AnimatedCard>
        </div>
      </div>
      
      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{selectedUser.fullName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Business Name</Label>
                <p className="font-medium">{selectedUser.businessName}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p className="font-medium">{selectedUser.address}, {selectedUser.city}, {selectedUser.postcode}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <p className="font-medium">{selectedUser.phone}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedUser)}`}>
                      {getStatusText(selectedUser)}
                    </span>
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Subscription</Label>
                  <p className="font-medium">{formatCurrency(selectedUser.subscriptionAmount)}/month</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Trial Ends</Label>
                  <p className="font-medium">{formatDate(selectedUser.trialEndsAt)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Subscription Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Update the monthly subscription amount for this user.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="subscriptionAmount">Monthly Subscription Amount (£)</Label>
                <Input
                  id="subscriptionAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editedSubscriptionAmount}
                  onChange={(e) => setEditedSubscriptionAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                Current amount: {formatCurrency(selectedUser.subscriptionAmount)}/month
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateSubscriptionAmount}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Admin;
