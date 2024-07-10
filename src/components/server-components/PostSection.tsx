import Post from '../client-components/Post';
import Seperator from './Seperator';
import { SkeletonPost } from '../client-components/SkeletonPost';
import React, { Suspense } from 'react';
import { PostType } from '@/utils/types';
import { getAllPosts } from '@/actions/actions';

const PostSection = async () => {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-1">
      <Suspense
        fallback={Array.from({ length: 5 })?.map((_, index) => (
          <React.Fragment key={index}>
            <SkeletonPost />
            <Seperator />
          </React.Fragment>
        ))}
      >
        {posts?.map((post: PostType) => (
          <>
            <Post postData={post} />
            <Seperator />
          </>
        ))}
      </Suspense>
    </div>
  );
};

export default PostSection;
