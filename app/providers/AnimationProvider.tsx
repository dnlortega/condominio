"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { AnimationSettingsType } from "@/app/actions/settings";

const AnimationContext = createContext<AnimationSettingsType | null>(null);

export function AnimationProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: AnimationSettingsType;
}) {
  return (
    <AnimationContext.Provider value={settings}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationSettings() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimationSettings must be used within AnimationProvider");
  }
  return context;
}
