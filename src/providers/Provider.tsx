"use client";
import StateContextProvider from "@/contexts/StateContext";
import ThemeProvider from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <StateContextProvider>{children}</StateContextProvider>
      </ThemeProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "hot-toast-item",
          duration: 5000,
          removeDelay: 1000,
        }}
      />
    </SessionProvider>
  );
};

export default Provider;
