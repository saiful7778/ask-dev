"use client";
import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StateContextProps {}

const StateContext = createContext<StateContextProps | null>(null);

const StateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export { StateContextProvider, StateContext };
