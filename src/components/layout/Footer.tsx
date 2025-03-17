
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-foreground/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <FileText className="h-8 w-8" />
              <span>The Invoice Link</span>
            </Link>
            <p className="mb-6">
              Streamline your invoicing process with our powerful, user-friendly platform designed for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-foreground/60 hover:text-primary transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-foreground/60 hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/60 hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="text-foreground/60 hover:text-primary transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-foreground/60 hover:text-primary transition-colors">Register</Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-foreground/60 hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-foreground/60 hover:text-primary transition-colors">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-foreground/60 hover:text-primary transition-colors">GDPR Compliance</Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>123 Invoice Street, London, UK</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>+44 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>info@theinvoicelink.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60 mb-4 md:mb-0">
              &copy; {currentYear} The Invoice Link. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
