"use client";

import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../requestMethods";
import { ForumType } from "@/utils/types";
import { useSession } from "next-auth/react";
import axios from "axios";

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

const useForumByIdData = (forumId: string) => {
  const { data: session } = useSession();
  const fetchForumById = async ({ queryKey }: { queryKey: any }) => {
    try {
      const [_, forumId] = queryKey;
      const response = await axios.get(
        `https://zodiac-hub.onrender.com/api/v1/forums/${forumId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["forum", forumId],
    queryFn: fetchForumById,
    enabled: !!session,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  };
};

export { useForumsData, useForumByIdData };
