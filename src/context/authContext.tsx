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
import { useSession } from "next-auth/react";

type UserDetailsProp = {
  id: string | null;
  username: string;
  email: string;
  image: string | null;
  token: string | null;
};

type AuthContextType = {
  logout: () => void;
  userDetails: UserDetailsProp | null;
  setUserDetails: Dispatch<SetStateAction<UserDetailsProp | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [userDetails, setUserDetails] = useState<UserDetailsProp | null>({
    id: session?.user.id as string,
    username: "",
    email: "",
    image: "",
    token: session?.user?.token as string,
  });
  /*const { data} = useUserData(
      userDetails?.id as string
    );*/
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserDetails(null);
    toast("You are logged out.");
  };

   useEffect(() => {
     if (session) {
       setUserDetails({
         id: session.user.id as string,
         username: session.user.username,
         email: session.user.email,
         image: session.user.image,
         token: session.user.token,
       });
     } else {
       setUserDetails(null);
     }
   }, [session, queryClient]);
  return (
    <AuthContext.Provider value={{ logout, userDetails, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext) as AuthContextType;
export default AuthProvider;
