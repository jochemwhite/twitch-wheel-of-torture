"use client";
import { supabase } from "@/lib/supabase";
import React, { ReactNode, createContext, startTransition, useContext, useEffect, useOptimistic, useState } from "react";

export const SpinContext = createContext({
  isSpinning: false,
  Spin: () => {},
  stopSpin: () => {},
});

export const SpinProvider = ({ children }: { children: ReactNode }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  // subscribe to the supabase websocket

  useEffect(() => {
    const channelA = supabase.channel("room-1");
    channelA.subscribe((status) => {
      // Wait for successful connection
      if (status !== "SUBSCRIBED") {
        return null;
      }

      channelA.on("broadcast", { event: "channel.channel_points_custom_reward_redemption.add" }, (payload) => console.log(payload));
    });
  }, []);


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
