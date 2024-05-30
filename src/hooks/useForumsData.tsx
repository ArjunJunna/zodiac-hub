"use client";

import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../requestMethods";
import { ForumType } from "@/utils/types";

const useForumsData = () => {
  const fetchForumsData = async (): Promise<ForumType[]> => {
    const { data } = await publicRequest.get("/forums");
    return data;
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["forums"],
    queryFn: fetchForumsData,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  };
};

export { useForumsData};
