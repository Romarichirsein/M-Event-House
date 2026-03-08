'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function ButtonPremium({ 
  variant = 'gold', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    gold: 'btn-gold neon-gold',
    outline: 'border border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/10 transition-all',
    ghost: 'text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-all'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs uppercase tracking-widest',
    md: 'px-8 py-3 text-sm uppercase tracking-[0.2em]',
    lg: 'px-12 py-4 text-base uppercase tracking-[0.3em] font-bold'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center font-medium overflow-hidden rounded-sm transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'gold' && (
        <motion.div 
          className="absolute inset-0 bg-white/20 translate-x-[-100%]"
          animate={{ x: '200%' }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 3 }}
        />
      )}
    </motion.button>
  );
}
