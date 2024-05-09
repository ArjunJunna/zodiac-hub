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
import { useQueryClient } from "@tanstack/react-query";
import useUserData from "@/hooks/useUserData";

type UserDetailsProp = {
  id: string|null;
  username: string;
  email: string;
  image: string | null;
  token:string | null
};

type AuthContextType = {
  logout: () => void;
  userDetails: UserDetailsProp | null;
  setUserDetails: Dispatch<SetStateAction<UserDetailsProp | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [userDetails, setUserDetails] = useState<UserDetailsProp | null>({
    id: localStorage.getItem("userId"),
    username: "",
    email: "",
    image: "",
    token: localStorage.getItem("token"),
  });
    const { data} = useUserData(
      userDetails?.id as string
    );
  const logout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("userId");
    setUserDetails(null);
    toast('You are logged out.')
  };
 
 useEffect(() => {
   if (userDetails?.id && !userDetails?.username) {
    setUserDetails({
      ...userDetails,
      username: data?.username as string,
      email: data?.email as string,
      image: data?.image as string,
    });
   }
 }, [userDetails, queryClient]);
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
