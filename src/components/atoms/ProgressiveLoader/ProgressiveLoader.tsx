'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressiveLoaderProps {
  isVisible: boolean;
  phase: string;
  delay?: number;
  children: React.ReactNode;
}

export const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  isVisible,
  phase,
  delay = 0,
  children
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 20,
            scale: 0.95
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            scale: 0.95
          }}
          transition={{
            duration: 0.5,
            delay: delay / 1000,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};



