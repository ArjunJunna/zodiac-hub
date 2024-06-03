import React from 'react'
import { DownVoteButton, UpVoteButton } from './SubmitButtons';
import { MessageSquare, Share } from 'lucide-react';

type PostFooterProps = {
  handleSubmit: (formData: FormData) => Promise<void>;
  postId:string;
  voteCount:number;
  commentsCount:number
};

const PostFooter = ({handleSubmit,postId,voteCount,commentsCount}:PostFooterProps) => {
  return (
    <div className="flex justify-between pt-1 ">
      <div className="flex gap-x-3 items-center justify-center">
        <form action={handleSubmit}>
          <input type="hidden" name="voteDirection" value="UP" />
          <input type="hidden" name="postId" value={postId} />
          <UpVoteButton />
        </form>
        {voteCount > 0 ? (
          <p className="text-xs self-center">{voteCount}</p>
        ) : null}
        <form action={handleSubmit}>
          <input type="hidden" name="voteDirection" value="DOWN" />
          <input type="hidden" name="postId" value={postId} />
          <DownVoteButton />
        </form>
        <button className="flex gap-x-1 hover:text-blue-400">
          <MessageSquare />
        </button>
        <p className="text-xs self-center">{commentsCount}</p>
      </div>

      {/*<button className="flex gap-x-1 hover:text-orange-400">
        <Share />
        <p className="text-xs self-center">share</p>
    </button>*/}
    </div>
  );
}

export default PostFooter