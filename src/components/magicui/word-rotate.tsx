"use client";

import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSpin } from "@/provider/spin-provider";

interface SlotMachineProps {
  words: string[];
  spinTime?: number;
  className?: string;
}

export default function SlotMachine({
  words,
  spinTime = 5000, // Default to 5 seconds of spinning
  className,
}: SlotMachineProps) {
  const [index, setIndex] = useState(0);
  const {isSpinning, stopSpin, Spin} = useSpin();
  const [winner, setWinner] = useState<string | null>(null);

  const startSpin = () => {
    setWinner(null);

    const interval = 100; // Time between each word change
    const iterations = spinTime / interval;
    let count = 0;

    const id = setInterval(() => {
      count++;
      if (count >= iterations) {
        stopSpin();
        setWinner(words[Math.floor(Math.random() * words.length)]);
        clearInterval(id);
      } else {
        setIndex((state) => (state + 1) % words.length);
      }
    }, interval);
  };



  useEffect(() => {
    if (isSpinning) {
      startSpin();
    }
  }, [isSpinning]);
  

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="overflow-hidden py-2 bg-gray-800 rounded-lg p-4 border-4 border-yellow-500 h-20 flex items-center justify-center w-96">
        <AnimatePresence mode="wait">
          {isSpinning ? (
            <motion.div
              key={words[index]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={cn("text-center text-4xl font-bold", className)}
            >
              {words[index]}
            </motion.div>
          ) : winner ? (
            <motion.div
              key="winner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={cn("text-center text-4xl font-bold", className)}
            >
              {winner}
            </motion.div>
          ) : (
            <div className={cn("text-center text-4xl font-bold", className)}>
              Ready!
            </div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => {
          if (!isSpinning) {
            Spin();
          }
        }}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

    </div>
  );
}