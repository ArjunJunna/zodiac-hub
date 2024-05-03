"use client";

import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../requestMethods";
import { PostType } from "@/utils/types";

const useSinglePostData = (postId:string) => {

  const fetchPostById = async (): Promise<PostType> => {
    const { data } = await publicRequest.get(`/posts/${postId}`);
    return data;
  };

  const {
    data: singlePostData,
    isLoading: isLoadingSinglePost,
    isError,
    error,
    isFetching: isFetchingSinglePost,
  } = useQuery({
    queryKey: ["singlePost",postId],
    queryFn: fetchPostById,

  });

  return {
    singlePostData,
    isLoadingSinglePost,
    isError,
    error,
    isFetchingSinglePost,
  };
};

export default useSinglePostData;
