import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currencySymbol = 'Rs.'
  const value = { doctors, currencySymbol };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
