"use client";
import { createContext } from "react";

interface StateContextProps {}

export const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export default StateContextProvider;
