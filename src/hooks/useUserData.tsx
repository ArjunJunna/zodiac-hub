"use client";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../requestMethods";
import { UserType } from "@/utils/types";
import { useSession } from "next-auth/react";

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };



const useUserData = (userId:string) => {
    const { data: session } = useSession();
  const fetchUserData = async (): Promise<UserType> => {
     const { data } = await axios.get(`${BASE_URL}/users/${userId}`, {
       headers: {
         Authorization: `Bearer ${session?.user.token}`,
       },
     });
    return data;
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserData,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  };
};

export default useUserData;
