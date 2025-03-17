
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  animateOnHover?: boolean;
  animationType?: 'pulse' | 'scale' | 'glow';
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animateOnHover = true, animationType = 'scale', children, ...props }, ref) => {
    const animationClasses = {
      pulse: 'transition-transform hover:animate-pulse-slow',
      scale: 'transition-transform hover:scale-105 active:scale-95',
      glow: 'transition-all hover:shadow-[0_0_15px_rgba(220,20,60,0.5)]',
    };

    return (
      <Button
        ref={ref}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          animateOnHover && animationClasses[animationType],
          className
        )}
        {...props}
      >
        {children}
        {animationType === 'glow' && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };
