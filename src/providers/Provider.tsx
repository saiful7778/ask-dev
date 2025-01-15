"use client";
import StateContextProvider from "@/contexts/StateContext";
import ThemeProvider from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <StateContextProvider>{children}</StateContextProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
