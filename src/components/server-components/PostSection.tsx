import Post from '../client-components/Post';
import Seperator from './Seperator';
import { SkeletonPost } from '../client-components/SkeletonPost';
import React, { Suspense } from 'react';
import { PostType } from '@/utils/types';
import { getAllPosts } from '@/actions/actions';

type PostSectionProps = {
  // eslint-disable-next-line no-unused-vars
  postComment: (formData: FormData) => Promise<number | undefined>;
};

const PostSection = async ({ postComment }: PostSectionProps) => {
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
            <Post postData={post} postComment={postComment} />
            <Seperator />
          </>
        ))}
      </Suspense>
    </div>
  );
};

export default PostSection;
