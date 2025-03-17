
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends CardProps {
  animateEntry?: boolean;
  animateHover?: boolean;
  delay?: number;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, animateEntry = true, animateHover = true, delay = 0, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Check if we're in the initial page load
    const isInitialLoad = document.documentElement.classList.contains('no-animations');
    
    // Set visible immediately if animations are disabled
    useEffect(() => {
      if (isInitialLoad || !animateEntry) {
        setIsVisible(true);
        return;
      }
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [animateEntry, delay, isInitialLoad]);
    
    // Set up intersection observer for scroll animations
    useEffect(() => {
      if (!cardRef.current || !animateEntry || isInitialLoad) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(cardRef.current);
      
      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [animateEntry, isInitialLoad]);
    
    return (
      <Card
        ref={cardRef || ref}
        className={cn(
          'transition-all duration-500',
          animateEntry && !isInitialLoad && !isVisible && 'opacity-0 translate-y-4',
          (isVisible || isInitialLoad) && 'opacity-100 translate-y-0',
          animateHover && 'hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-2px]',
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export { AnimatedCard };
