import React, { ReactNode, createContext, startTransition, useContext, useEffect, useOptimistic, useState } from "react";

export const SpinContext = createContext({
  isSpinning: false,
  Spin: () => {},
  stopSpin: () => {},
});

export const SpinProvider = ({ children }: { children: ReactNode }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  // subscribe to the supabase websocket

  const Spin = () => {
    setIsSpinning(true);
  };

  const stopSpin = () => {
    setIsSpinning(false);
  };

  return <SpinContext.Provider value={{ isSpinning, Spin, stopSpin }}>{children}</SpinContext.Provider>;
};

// create hook
export const useSpin = () => {
  const context = useContext(SpinContext);
  if (!context) {
    throw new Error("useSpin must be used within a SpinProvider");
  }
  return context;
};
