
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  // Handle initial page load
  useEffect(() => {
    if (isFirstLoad) {
      // On first load, we want to render immediately without animations
      document.documentElement.classList.add('no-animations');
      setIsReady(true);
      
      // After a short delay, we can enable animations for future navigation
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
        document.documentElement.classList.remove('no-animations');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  // Handle route changes after initial load
  useEffect(() => {
    if (!isFirstLoad) {
      // For subsequent navigation, we want to animate
      setIsReady(true);
    }
  }, [location.pathname, isFirstLoad]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageTransition;
