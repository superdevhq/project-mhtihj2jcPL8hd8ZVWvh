
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(false);
  const location = useLocation();

  // Handle page transitions
  useEffect(() => {
    // Show content after a short delay
    const timer = setTimeout(() => {
      setDisplayChildren(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // If not ready to display, show nothing (the loader in index.html will be visible)
  if (!displayChildren) {
    return null;
  }

  return <>{children}</>;
};

export default PageTransition;
