import { CommentType, UserVoteType } from "@/utils/types";
import Moment from "react-moment";
import { useRef } from "react";
import { countVotes } from "@/utils/utilities";
import { DeleteButton, DownVoteButton, UpVoteButton } from "./SubmitButtons";
import { handleCommentVote } from "@/actions/actions";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postComment, deleteComment } from "@/actions/actions";
import { SubmitButton } from "./SubmitButtons";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import UserAvatar from "./UserAvatar";

type ViewCommentsProp = {
  comment: CommentType;
  currentVote: UserVoteType | undefined;
  votesAmt: number;
  postId: string;
};

const ViewComments = ({ comment, postId }: ViewCommentsProp) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const voteCount = countVotes(comment.votes);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    if (session) {
      const statusCode = await handleCommentVote(formData);
    } else {
      setShowAuthModal(true);
    }
  };
  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar name={comment.author.username} h="8" w="8" />
        <div className="flex flex-col ml-2">
          <div className=" flex items-center gap-x-2">
            <p className="text-xs">z/{comment.author.username}</p>

            <Moment fromNow className="truncate text-xs text-zinc-500">
              {comment.createdAt}
            </Moment>
          </div>
          <p className="text-sm">{comment.text}</p>
        </div>
        {comment.authorId === session?.user.id && (
          <form
            action={async (formData: FormData) => {
              const status = await deleteComment(formData);
              if (status == 200) {
                router.refresh();
                toast.message("Comment deleted.");
              } else {
                toast.error("Comment could not be deleted.");
              }
            }}
            className="ml-auto"
          >
            <input type="hidden" name="commentId" value={comment.id} />
            <DeleteButton />
          </form>
        )}
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
          <button
            className="flex"
            onClick={() => {
              if (session) {
                setIsReplying(true);
              } else {
                setShowAuthModal(true);
              }
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Reply
          </button>
        </div>
      </div>
      {isReplying ? (
        <>
          <div className="grid w-full gap-1.5">
            <form
              className="grid w-full gap-1.5"
              action={async (formData: FormData) => {
                const status = await postComment(formData);
                if (status == 201) {
                  router.refresh();
                  setInput("");
                  setIsReplying(false);
                  toast.message("Comment created.");
                }
              }}
            >
              <Label htmlFor="comment">Your comment</Label>
              <div className="mt-2">
                <input type="hidden" name="postId" value={postId} />
                <input
                  type="hidden"
                  name="replyToId"
                  value={comment.replyToId ?? comment.id}
                />
                <Textarea
                  id="comment"
                  name="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="What are your thoughts?"
                />
                {input.length == 0 ? null : (
                  <>
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button
                        tabIndex={-1}
                        onClick={() => setIsReplying(false)}
                      >
                        Cancel
                      </Button>

                      <SubmitButton text="Post Comment" />
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </>
      ) : null}
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </div>
  );
};

export default ViewComments;
