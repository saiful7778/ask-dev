"use client";
import StateContextProvider from "@/contexts/StateContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <StateContextProvider>{children}</StateContextProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "hot-toast-item",
          duration: 2000,
          removeDelay: 1000,
        }}
      />
    </SessionProvider>
  );
};

export default Provider;
