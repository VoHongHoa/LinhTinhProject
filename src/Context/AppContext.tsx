import React, { createContext, useState, ReactNode, useContext } from "react";

interface AppContextType {
  user: string;
  setUser: (user: string) => void;
}

interface AppProviderProps {
  children: ReactNode;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string>("");
  
    return (
      <AppContext.Provider value={{ user, setUser }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  // Hook sử dụng context
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext phải được sử dụng trong AppProvider");
    }
    return context;
  };
