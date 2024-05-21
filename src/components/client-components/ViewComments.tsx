import { CommentType, UserVoteType } from "@/utils/types";
import Moment from "react-moment";
import { useRef } from "react";

type ViewCommentsProp = {
  comment: CommentType;
  currentVote: UserVoteType | undefined;
  votesAmt: number;
  postId: string;
};

const ViewComments = ({comment,currentVote,votesAmt,postId}:ViewCommentsProp) => {
     const commentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <img
          alt="profile avatar"
          className="h-8 w-8 rounded-full  hover:cursor-pointer"
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author.username}&backgroundColor=3e3f4a&chars=1`}
        />
        <div className="flex flex-col ml-2">
          <div className=" flex items-center gap-x-2">
            <p className="text-xs">z/{comment.author.username}</p>

            <Moment fromNow className="truncate text-xs text-zinc-500">
              {comment.createdAt}
            </Moment>
          </div>
          <p className="text-sm">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewComments;
