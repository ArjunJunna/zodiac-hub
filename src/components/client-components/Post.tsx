'use client';

import Image from 'next/image';
import { PostType } from '@/utils/types';
import { countVotes } from '@/utils/utilities';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import AuthModal from '../client-components/AuthModal';
import { RenderToJson } from '../server-components/RenderToJson';
import { useState } from 'react';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

type PostProps = {
  postData: PostType;
};

const Post = ({ postData }: PostProps) => {
  const {
    id,
    title,
    content,
    image: postImage,
    createdAt,
    author: { username },
    forum: {
      id: forumId,
      _count: { subscribers },
      description,
      image: forumImage,
      name: forumName,
    },
    comments,
    votes,
  } = postData;

  const pathname = usePathname();
  const voteCount = countVotes(votes);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-2 max-w-[46rem] hover:cursor-pointer relative py-2 px-4 rounded-md',
          pathname === '/'
            ? 'hover:bg-gray-200/50 dark:hover:bg-primary-foreground'
            : ''
        )}
        key={id}
      >
        <PostHeader
          forumImage={forumImage}
          forumId={forumId}
          forumName={forumName}
          postId={id}
          description={description}
          subscribers={subscribers}
          username={username}
          title={title}
          createdAt={createdAt}
        />

        <div className="flex flex-col flex-grow gap-1">
          <div className="max-h-60 text-ellipsis overflow-hidden  ">
            {postImage ? (
              <>
                <Image
                  src={postImage}
                  alt="Post Image"
                  width={500}
                  height={200}
                  className="w-full h-full"
                />
              </>
            ) : null}
            {content !== null ? <RenderToJson data={content} /> : null}
          </div>
          <PostFooter
            postId={id}
            voteCount={voteCount}
            commentsCount={comments.length}
            post={postData}
            setShowAuthModal={setShowAuthModal}
          />
        </div>
        {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
      </div>
    </>
  );
};

export default Post;
