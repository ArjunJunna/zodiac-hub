'use client';

import { useQuery } from '@tanstack/react-query';
import { publicRequest } from '../requestMethods';
import { PostType } from '@/utils/types';

const usePostsData = () => {
  const fetchPostsData = async (): Promise<PostType[]> => {
    const { data } = await publicRequest.get('/posts');
    return data;
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPostsData,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  };
};

export default usePostsData;
