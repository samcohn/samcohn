'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SlidingPuzzleProps {
  frontFaceImage: string;
  onComplete: () => void;
}

interface Tile {
  id: number;
  currentPosition: number;
}

// Individual tile component
function PuzzleTile({ 
  tile, 
  imageSrc, 
  onClick,
  isComplete
}: { 
  tile: Tile; 
  imageSrc: string; 
  onClick: () => void;
  isComplete: boolean;
}) {
  const GRID_SIZE = 4;
  const TILE_SIZE = 25;
  
  const row = Math.floor(tile.currentPosition / GRID_SIZE);
  const col = tile.currentPosition % GRID_SIZE;
  
  const bgRow = Math.floor(tile.id / GRID_SIZE);
  const bgCol = tile.id % GRID_SIZE;
  
  const isEmpty = tile.id === 15;
  
  return (
    <motion.div
      className={`absolute ${isEmpty ? 'pointer-events-none' : 'cursor-pointer'}`}
      initial={false}
      animate={{
        x: `${col * TILE_SIZE * 4}%`,
        y: `${row * TILE_SIZE * 4}%`,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.8,
      }}
      style={{
        width: `${TILE_SIZE}%`,
        height: `${TILE_SIZE}%`,
      }}
      onClick={onClick}
      whileHover={!isEmpty && !isComplete ? { scale: 0.98 } : {}}
      whileTap={!isEmpty && !isComplete ? { scale: 0.95 } : {}}
    >
      {!isEmpty && (
        <div
          className="w-full h-full border border-white"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: '400% 400%',
            backgroundPosition: `${bgCol * 33.333}% ${bgRow * 33.333}%`,
          }}
        />
      )}
    </motion.div>
  );
}

// Rubik's Cube 3D component
function RubiksCube({ 
  isRevealing,
  frontFaceImage 
}: { 
  isRevealing: boolean;
  frontFaceImage: string;
}) {
  return (
    <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ rotateY: 0 }}
        animate={isRevealing ? { 
          rotateY: [0, 90, 180],
        } : {}}
        transition={{
          duration: 2,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        }}
      >
        {/* Front face - completed puzzle */}
        <div
          className="absolute inset-0 border border-white"
          style={{
            backfaceVisibility: 'hidden',
            backgroundImage: `url(${frontFaceImage})`,
            backgroundSize: 'cover',
          }}
        >
          {/* Grid overlay to show it's still a puzzle */}
          <div className="w-full h-full grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-white/30" />
            ))}
          </div>
        </div>

        {/* Back face - clickable menu */}
        <div
          className="absolute inset-0 border border-white"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#000',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-12">
            <motion.button
              className="text-white border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'Arizona Variable, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WORK
            </motion.button>
            <motion.button
              className="text-white border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'Arizona Variable, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ABOUT
            </motion.button>
            <motion.button
              className="text-white border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'Arizona Variable, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SlidingPuzzle({ 
  frontFaceImage, 
  onComplete 
}: SlidingPuzzleProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    const solvedTiles: Tile[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      currentPosition: i,
    }));
    
    const twoMovesScrambled = makeTwoMoves(solvedTiles);
    setTiles(twoMovesScrambled);
  }, []);

  useEffect(() => {
    if (tiles.length === 0) return;
    
    const solved = tiles.every(tile => tile.currentPosition === tile.id);
    
    if (solved && moveCount > 0 && !isComplete) {
      setIsComplete(true);
      // Wait a moment, then start cube reveal
      setTimeout(() => {
        setIsRevealing(true);
      }, 800);
      
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  }, [tiles, moveCount, isComplete, onComplete]);

  const getMovableTiles = (emptyPos: number): number[] => {
    const row = Math.floor(emptyPos / 4);
    const col = emptyPos % 4;
    const movable: number[] = [];
    
    if (row > 0) movable.push(emptyPos - 4);
    if (row < 3) movable.push(emptyPos + 4);
    if (col > 0) movable.push(emptyPos - 1);
    if (col < 3) movable.push(emptyPos + 1);
    
    return movable;
  };

  const handleTileClick = (clickedTile: Tile) => {
    if (isComplete || clickedTile.id === 15) return;

    const emptyTile = tiles.find(t => t.id === 15);
    if (!emptyTile) return;

    const movablePositions = getMovableTiles(emptyTile.currentPosition);
    
    if (movablePositions.includes(clickedTile.currentPosition)) {
      const newTiles = tiles.map(tile => {
        if (tile.id === clickedTile.id) {
          return { ...tile, currentPosition: emptyTile.currentPosition };
        }
        if (tile.id === 15) {
          return { ...tile, currentPosition: clickedTile.currentPosition };
        }
        return tile;
      });
      
      setTiles(newTiles);
      setMoveCount(prev => prev + 1);
    }
  };

  if (tiles.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
        style={{ fontFamily: 'Arizona Variable, sans-serif' }}
      >
        <h1 className="text-sm mb-1" style={{ fontSize: '14px', color: '#000' }}>
          solve to enter
        </h1>
        <p className="text-xs" style={{ fontSize: '10px', color: '#000' }}>
          moves: {moveCount}
        </p>
      </motion.div>

      <div className="relative w-full max-w-[600px] aspect-square">
        {!isRevealing ? (
          <div className="absolute inset-0">
            {tiles.map((tile) => (
              <PuzzleTile
                key={tile.id}
                tile={tile}
                imageSrc={frontFaceImage}
                onClick={() => handleTileClick(tile)}
                isComplete={isComplete}
              />
            ))}
          </div>
        ) : (
          <RubiksCube 
            isRevealing={isRevealing}
            frontFaceImage={frontFaceImage}
          />
        )}
      </div>
    </div>
  );
}

function makeTwoMoves(tiles: Tile[]): Tile[] {
  let current = [...tiles];
  
  for (let i = 0; i < 2; i++) {
    const emptyTile = current.find(t => t.id === 15);
    if (!emptyTile) continue;
    
    const emptyPos = emptyTile.currentPosition;
    const row = Math.floor(emptyPos / 4);
    const col = emptyPos % 4;
    const possibleMoves: number[] = [];
    
    if (row > 0) possibleMoves.push(emptyPos - 4);
    if (row < 3) possibleMoves.push(emptyPos + 4);
    if (col > 0) possibleMoves.push(emptyPos - 1);
    if (col < 3) possibleMoves.push(emptyPos + 1);
    
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const tileToMove = current.find(t => t.currentPosition === randomMove);
    
    if (tileToMove) {
      current = current.map(tile => {
        if (tile.id === tileToMove.id) {
          return { ...tile, currentPosition: emptyPos };
        }
        if (tile.id === 15) {
          return { ...tile, currentPosition: randomMove };
        }
        return tile;
      });
    }
  }
  
  return current;
}
