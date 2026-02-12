'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlidingPuzzle from './SlidingPuzzle';

export default function PuzzleGatePage() {
  const [hasEntered, setHasEntered] = useState(false);

  const handlePuzzleComplete = () => {
    setHasEntered(true);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="puzzle"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: "blur(20px)",
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <SlidingPuzzle
              frontFaceImage="/your-image.jpg" // Replace with your image path
              onComplete={handlePuzzleComplete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="min-h-screen"
          >
            {/* Your actual portfolio content goes here */}
            <div className="flex items-center justify-center min-h-screen bg-white text-black">
              <div className="text-center">
                <h1 className="text-6xl font-light mb-4">Sam Cohn</h1>
                <p className="text-xl text-gray-600">Portfolio</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
