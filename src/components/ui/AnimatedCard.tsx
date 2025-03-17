
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
    
    // Set visible after delay
    useEffect(() => {
      if (!animateEntry) {
        setIsVisible(true);
        return;
      }
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [animateEntry, delay]);
    
    // Set up intersection observer for scroll animations
    useEffect(() => {
      if (!cardRef.current || !animateEntry || isVisible) return;
      
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
    }, [animateEntry, isVisible]);
    
    return (
      <Card
        ref={cardRef || ref}
        className={cn(
          'transition-all duration-500',
          animateEntry && !isVisible && 'opacity-0 translate-y-4',
          isVisible && 'opacity-100 translate-y-0',
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
