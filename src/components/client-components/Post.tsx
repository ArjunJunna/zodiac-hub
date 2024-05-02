import {
  MessageSquare,
  Share,
  ArrowBigUp,
  ArrowBigDown,
  Ellipsis,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostType, Votes } from "@/utils/types";
import Moment from "react-moment";
import { countVotes } from "@/utils/utilities";

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
    author: { image, username },
    forum: {
      _count: { creator, posts, subscribers },
      description,
      image: forumImage,
      name:forumName,
    },
    comments,
    votes
  } = postData;

  const voteCounts = countVotes(votes);
  return (
    
      <div className="flex flex-col gap-2 hover:cursor-pointer relative py-2 px-4 rounded-md hover:bg-gray-200/50 dark:hover:bg-primary-foreground">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <img
                alt="profile avatar"
                className="h-8 w-8 rounded-full  hover:cursor-pointer"
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${forumName}&backgroundColor=3e3f4a&chars=1`}
              />
              <div className="flex justify-between gap-x-2 items-center">
                <p className="font-normal text-[12px]  ">{forumName}</p>
                <span>&#128908;</span>

                <Moment fromNow className="text-[12px]">
                  {createdAt}
                </Moment>
              </div>
            </div>

            <div className="flex justify-center gap-x-3">
              <button className="text-xs py-0 px-2 rounded-md bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40">
                Join
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis className="hover:bg-gray-600/10 px-1 rounded-md" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p>{title}</p>
        </div>

        <div className="flex flex-col flex-grow gap-1">
          <p className="text-sm ">{content}</p>
          <div className="flex justify-between pt-1 ">
            <div className="flex gap-x-3">
              <button className="flex gap-x-1 hover:text-green-500">
                <ArrowBigUp />
                <p className="text-xs self-center">{voteCounts.UP}</p>
              </button>
              <button className="flex gap-x-1 hover:text-red-400">
                <ArrowBigDown />
                <p className="text-xs self-center">{voteCounts.DOWN}</p>
              </button>
              <button className="flex gap-x-1 hover:text-blue-400">
                <MessageSquare />
                <p className="text-xs self-center">{comments.length}</p>
              </button>
            </div>

            <button className="flex gap-x-1 hover:text-orange-400">
              <Share />
              <p className="text-xs self-end">share</p>
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default Post;
