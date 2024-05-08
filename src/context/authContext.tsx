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

type UserDetailsProp = {
  id: string;
  username: string;
  email: string;
  image: string | null;
  token:string
};

type AuthContextType = {
  logout: () => void;
  userDetails: UserDetailsProp | null;
  setUserDetails: Dispatch<SetStateAction<UserDetailsProp | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [userDetails,setUserDetails]=useState<UserDetailsProp | null>(null)
  const logout = () => {
    localStorage.removeItem("token");
    setUserDetails(null);
    toast('You are logged out.')
  };
  return (
    <AuthContext.Provider
      value={{  logout,  userDetails, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext) as AuthContextType;
export default AuthProvider;
