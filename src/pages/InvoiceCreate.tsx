
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock customer data
const mockCustomers = [
  { id: '1', name: 'Acme Inc.' },
  { id: '2', name: 'Globex Corp' },
  { id: '3', name: 'Stark Industries' },
  { id: '4', name: 'Wayne Enterprises' },
];

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

const InvoiceCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 30))
  );
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, price: 0 }
  ]);
  const [notes, setNotes] = useState('');

  // Add a new item to the invoice
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', quantity: 1, price: 0 }
    ]);
  };

  // Remove an item from the invoice
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      toast({
        title: "Cannot remove item",
        description: "An invoice must have at least one item.",
        variant: "destructive"
      });
    }
  };

  // Update an item's property
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
  // Calculate tax (assuming 20% VAT)
  const tax = subtotal * 0.2;
  
  // Calculate total
  const total = subtotal + tax;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!customer) {
      toast({
        title: "Missing information",
        description: "Please select a customer.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (items.some(item => !item.description || item.quantity <= 0 || item.price <= 0)) {
      toast({
        title: "Invalid items",
        description: "All items must have a description, quantity, and price.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invoice created",
        description: "Your invoice has been created successfully.",
      });
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">Create New Invoice</h1>
            </div>
            <p className="text-foreground/70">
              Create a new invoice for your customer
            </p>
          </div>
          
          {/* Invoice Form */}
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Invoice Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Selection */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customer">Customer</Label>
                      <Select value={customer} onValueChange={setCustomer}>
                        <SelectTrigger id="customer">
                          <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCustomers.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Items */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
                  
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                        <div className="col-span-12 sm:col-span-5">
                          <Label htmlFor={`description-${item.id}`}>Description</Label>
                          <Input
                            id={`description-${item.id}`}
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="Item description"
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-2">
                          <Label htmlFor={`quantity-${item.id}`}>Qty</Label>
                          <Input
                            id={`quantity-${item.id}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <Label htmlFor={`price-${item.id}`}>Price</Label>
                          <Input
                            id={`price-${item.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="pr-8"
                          />
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-10 w-10"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addItem}
                      className="w-full mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any additional notes or payment instructions"
                      className="h-32"
                    />
                  </div>
                </div>
              </div>
              
              {/* Right Column - Summary & Dates */}
              <div className="space-y-6">
                {/* Dates */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Invoice Dates</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="invoice-date">Invoice Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="invoice-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {invoiceDate ? format(invoiceDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={invoiceDate}
                            onSelect={setInvoiceDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="due-date">Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="due-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                {/* Summary */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Subtotal:</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">VAT (20%):</span>
                      <span>£{tax.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-border my-2"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Invoice
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InvoiceCreate;
