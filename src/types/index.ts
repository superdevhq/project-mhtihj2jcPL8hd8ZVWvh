
export interface User {
  id: string;
  email: string;
  fullName: string;
  businessName: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  isApproved: boolean;
  trialEndsAt: Date | null;
  subscriptionAmount: number;
  subscriptionStatus: 'trial' | 'active' | 'canceled' | 'pending';
  createdAt: Date;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  notes: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface Invoice {
  id: string;
  userId: string;
  customerId: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  notes: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
