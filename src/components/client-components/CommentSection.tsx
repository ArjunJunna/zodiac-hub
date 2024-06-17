import CreateComment from './CreateComment';
import { useSession } from 'next-auth/react';
import ViewComments from './ViewComments';
import Seperator from '../server-components/Seperator';
import { CommentType } from '@/utils/types';

type CommentSectionProps = {
  postComment: () => Promise<number | undefined>;
  id: string;
  comments: CommentType[];
};

const CommentSection = ({ postComment, id, comments }: CommentSectionProps) => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-y-4">
      <Seperator />
      {session && <CreateComment postId={id} postComment={postComment} />}
      <div className="flex flex-col gap-y-6">
        {comments
          ?.filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentVotesAmt = topLevelComment.votes?.reduce(
              (acc, vote) => {
                if (vote.type === 'UP') return acc + 1;
                if (vote.type === 'DOWN') return acc - 1;
                return acc;
              },
              0
            );

            const topLevelCommentVote = topLevelComment.votes?.find(
              (vote) => vote.userId === session?.user.id
            );

            return (
              <div key={topLevelComment.id} className="flex flex-col">
                <ViewComments
                  comment={topLevelComment}
                  currentVote={topLevelCommentVote}
                  votesAmt={topLevelCommentVotesAmt}
                  postId={id}
                />
                {topLevelComment.replies
                  ?.sort((a, b) => b.votes.length - a.votes.length)
                  .map((reply) => {
                    const replyVotesAmt = reply.votes?.reduce((acc, vote) => {
                      if (vote.type === 'UP') return acc + 1;
                      if (vote.type === 'DOWN') return acc - 1;
                      return acc;
                    }, 0);

                    const replyVote = reply.votes?.find(
                      (vote) => vote.userId === session?.user.id
                    );

                    return (
                      <div
                        key={reply.id}
                        className="ml-2 py-2 pl-4 border-l-2 border-zinc-200"
                      >
                        <ViewComments
                          comment={reply}
                          currentVote={replyVote}
                          votesAmt={replyVotesAmt}
                          postId={id}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
