import { CommentType, UserVoteType } from "@/utils/types";
import Moment from "react-moment";
import { useRef } from "react";
import { countVotes } from "@/utils/utilities";
import { DownVoteButton, UpVoteButton } from "./SubmitButtons";
import { handleCommentVote } from "@/actions/actions";

type ViewCommentsProp = {
  comment: CommentType;
  currentVote: UserVoteType | undefined;
  votesAmt: number;
  postId: string;
};

const ViewComments = ({comment,currentVote,votesAmt,postId}:ViewCommentsProp) => {
     const commentRef = useRef<HTMLDivElement>(null);
     const voteCount = countVotes(comment.votes);

     const handleSubmit = async (formData: FormData) => {
       const statusCode = await handleCommentVote(formData);
       console.log('status',statusCode);
     };
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
      <div className="flex justify-between pt-1 ">
        <div className="flex gap-x-3 items-center justify-center">
          <form action={handleSubmit}>
            <input type="hidden" name="voteDirection" value="UP" />
            <input type="hidden" name="commentId" value={comment.id} />
            <UpVoteButton />
          </form>
          {voteCount > 0 ? (
            <p className="text-xs self-center">{voteCount}</p>
          ) : null}
          <form action={handleSubmit}>
            <input type="hidden" name="voteDirection" value="DOWN" />
            <input type="hidden" name="commentId" value={comment.id} />
            <DownVoteButton />
          </form>
         
        </div>

      </div>
    </div>
  );
};

export default ViewComments;
