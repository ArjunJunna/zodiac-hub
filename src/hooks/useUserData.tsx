"use client";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../requestMethods";
import { UserType } from "@/utils/types";

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

const useUserData = (userId:string) => {
  const fetchUserData = async (): Promise<UserType> => {
     const { data } = await axios.get(`${BASE_URL}/users/${userId}`, {
       headers: {
         Authorization: `Bearer ${getToken()}`,
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
