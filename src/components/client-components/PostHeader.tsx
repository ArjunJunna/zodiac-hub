import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AboutForum from './AboutForum';
import Moment from 'react-moment';
import { useRouter } from 'next/navigation';

type PostHeaderProps = {
  forumImage: string;
  forumId: string;
  forumName: string;
  postId: string;
  description: string;
  subscribers: number;
  username: string;
  title: string;
  createdAt: Date;
};

const PostHeader = ({
  forumImage,
  forumId,
  forumName,
  postId,
  description,
  subscribers,
  username,
  title,
  createdAt,
}: PostHeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <Image
            height={32}
            width={32}
            alt="profile avatar"
            className="h-8 w-8 rounded-full  hover:cursor-pointer"
            src={forumImage}
          />
          <div className="flex justify-between gap-x-2 items-center">
            <div className="flex flex-col">
              {!pathname.startsWith('/forums') ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <p
                      className="font-normal text-[12px]  "
                      onClick={() => router.push(`forums/${forumId}`)}
                    >
                      {forumName}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[25rem]">
                    <AboutForum
                      postId={postId}
                      forumId={forumId}
                      forumName={forumName}
                      description={description}
                      subscribersCount={subscribers}
                    />
                  </HoverCardContent>
                </HoverCard>
              ) : null}

              {pathname !== '/' ? (
                <>
                  <p className="font-normal text-[12px]  ">{username}</p>
                </>
              ) : null}
            </div>

            <span>&#128908;</span>

            <Moment fromNow className="text-[12px]">
              {createdAt}
            </Moment>
          </div>
        </div>
      </div>
      <p onClick={() => router.push(`/post/${postId}`)}>{title}</p>
    </div>
  );
};

export default PostHeader;
