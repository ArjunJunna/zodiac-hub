'use client';

import AuthModal from './AuthModal';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SubscriptionForm from './SubscriptionForm';
import { PostType, SubscriptionType } from '@/utils/types';
import { BASE_URL } from '@/lib/Constants';

type Forum = {
  id: string;
  creator: {
    username: string;
  };
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: string | null;
  creatorId: string;
  posts: PostType[];
  subscribers: SubscriptionType[];
};

type AboutForumProps = {
  postId: string;
  forumId: string;
  forumName: string;
  description: string;
  subscribersCount: number;
};

const AboutForum = ({
  forumId,
  forumName,
  description,
  subscribersCount,
}: AboutForumProps) => {
  const { data: session } = useSession();
  const [forumData, setForumData] = useState<Forum | undefined>();

  const fetchForumById = async (forumId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/forums/${forumId}`);
      const data = await response.json();
      setForumData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchForumById(forumId);
  }, [forumId]);

  const text = forumData?.subscribers
    ?.map((sub: any) => sub.userId)
    .includes(session?.user.id)
    ? 'Leave'
    : 'Join';

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div className="flex flex-col bg-gray-200/50 dark:bg-primary-foreground rounded-xl p-4 space-y-2">
        <div className="flex justify-between">
          <p className="font-medium text-lg">{forumName}</p>
          {session?.user.token ? (
            <SubscriptionForm forumId={forumId as string} initialText={text} />
          ) : null}
        </div>
        <p className="text-sm ">{description}</p>
        <div className="flex flex-col">
          <span>{subscribersCount}</span>
          <p className="text-xs text-gray-400">Members</p>
        </div>
        {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
      </div>
    </>
  );
};

export default AboutForum;
