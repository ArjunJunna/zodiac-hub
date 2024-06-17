'use client';

import Post from '../client-components/Post';
import Seperator from './Seperator';
import usePostsData from '@/hooks/usePostsData';
import { SkeletonPost } from '../client-components/SkeletonPost';
import React from 'react';

type PostSectionProps = {
  // eslint-disable-next-line no-unused-vars
  postComment: (formData: FormData) => Promise<number | undefined>;
};

const PostSection = ({ postComment }: PostSectionProps) => {
  const { data, isLoading } = usePostsData();

  return (
    <div className="flex flex-col gap-1">
      {isLoading
        ? Array.from({ length: 5 })?.map((_, index) => (
            <React.Fragment key={index}>
              <SkeletonPost />
              <Seperator />
            </React.Fragment>
          ))
        : data?.map((post) => (
            <>
              <Post postData={post} postComment={postComment} />
              <Seperator />
            </>
          ))}
    </div>
  );
};

export default PostSection;
