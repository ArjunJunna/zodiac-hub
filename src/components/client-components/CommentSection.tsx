import React, { memo, useCallback, useEffect, useState } from "react";
import { getAllCommentsOnPostById } from "@/actions/actions";
import CreateComment from "./CreateComment";
import { useSession } from "next-auth/react";
import ViewComments from "./ViewComments";
import Seperator from "../server-components/Seperator";
import { CommentType } from "@/utils/types";

const CommentSection = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const [comments,setComments]=useState<CommentType[] | undefined>([])
   const fetchComments = useCallback(async () => {
     try {
       const fetchedComments = await getAllCommentsOnPostById(postId);
       setComments(fetchedComments);
     } catch (error) {
       console.error("Error fetching comments:", error);
     }
   }, [postId]);

   useEffect(() => {
     fetchComments();
   }, [fetchComments]);

  return (
    <div className="flex flex-col gap-y-4">
      <Seperator />
      <CreateComment postId={postId} onCommentCreated={fetchComments} />
      <div className="flex flex-col gap-y-6">
        {comments
          ?.filter(comment => !comment.replyToId)
          .map(topLevelComment => {
            const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === "UP") return acc + 1;
                if (vote.type === "DOWN") return acc - 1;
                return acc;
              },
              0
            );

            const topLevelCommentVote = topLevelComment.votes.find(
              vote => vote.userId === session?.user.id
            );

            return (
              <div key={topLevelComment.id} className="flex flex-col">
                <div>
                  <ViewComments
                    comment={topLevelComment}
                    currentVote={topLevelCommentVote}
                    votesAmt={topLevelCommentVotesAmt}
                    postId={postId}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(CommentSection);