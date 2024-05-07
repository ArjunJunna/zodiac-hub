"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

type AuthContextType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast('You are logged out.')
  };
  return (
    <AuthContext.Provider value={{ token, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext) as AuthContextType;
export default AuthProvider;
