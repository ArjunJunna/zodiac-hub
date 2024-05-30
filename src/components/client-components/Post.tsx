"use client";

import {
  MessageSquare,
  Share,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { PostType } from "@/utils/types";
import Moment from "react-moment";
import { countVotes } from "@/utils/utilities";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import AboutForum from "./AboutForum";
import AuthModal from "../client-components/AuthModal";
import { RenderToJson } from "../server-components/RenderToJson";
import { UpVoteButton, DownVoteButton } from "./SubmitButtons";
import {handlePostVote } from "@/actions/actions";
import { useSession } from "next-auth/react";
import {useQueryClient} from "@tanstack/react-query"
import React, { useState } from "react";
import CreateComment from "./CreateComment";
import ViewComments from "./ViewComments";
import Seperator from "../server-components/Seperator";

type PostProps = {
  postData: PostType;
  postComment: (formData: FormData) => Promise<number | undefined>;
};

const Post = ({ postData,postComment }: PostProps) => {
  const {
    id,
    title,
    content,
    image: postImage,
    createdAt,
    author: { image, username },
    forum: {
      id:forumId,
      _count: { creator, posts, subscribers },
      description,
      image: forumImage,
      name: forumName,
    },
    comments,
    votes,
  } = postData;
  const queryClient=useQueryClient();
  const router = useRouter();

  const pathname = usePathname();
  const { data: session } = useSession();

  const voteCount = countVotes(votes);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    if (session) {
      const statusCode = await handlePostVote(formData);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-2 hover:cursor-pointer relative py-2 px-4 rounded-md",
          pathname === "/"
            ? "hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
            : ""
        )}
        key={id}
      >
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <img
                alt="profile avatar"
                className="h-8 w-8 rounded-full  hover:cursor-pointer"
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${forumName}&backgroundColor=3e3f4a&chars=1`}
              />
              <div className="flex justify-between gap-x-2 items-center">
                <div className="flex flex-col">
                  {!pathname.startsWith("/forums") ? (
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
                          postId={id}
                          forumId={forumId}
                          forumName={forumName}
                          description={description}
                          subscribersCount={subscribers}
                        />
                      </HoverCardContent>
                    </HoverCard>
                  ) : null}

                  {pathname !== "/" ? (
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
          <p onClick={() => router.push(`/post/${id}`)}>{title}</p>
        </div>

        <div className="flex flex-col flex-grow gap-1">
          <div className="max-h-[300px] overflow-hidden">
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
            ) : (
              <RenderToJson data={content} />
            )}
          </div>
          <div className="flex justify-between pt-1 ">
            <div className="flex gap-x-3 items-center justify-center">
              <form action={handleSubmit}>
                <input type="hidden" name="voteDirection" value="UP" />
                <input type="hidden" name="postId" value={id} />
                <UpVoteButton />
              </form>
              {voteCount > 0 ? (
                <p className="text-xs self-center">{voteCount}</p>
              ) : null}
              <form action={handleSubmit}>
                <input type="hidden" name="voteDirection" value="DOWN" />
                <input type="hidden" name="postId" value={id} />
                <DownVoteButton />
              </form>
              <button className="flex gap-x-1 hover:text-blue-400">
                <MessageSquare />
              </button>
              <p className="text-xs self-center">{comments.length}</p>
            </div>

            <button className="flex gap-x-1 hover:text-orange-400">
              <Share />
              <p className="text-xs self-center">share</p>
            </button>
          </div>
        </div>
        {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
      </div>
      {pathname.startsWith("/post") ? (
        <>
          <div className="flex flex-col gap-y-4">
            <Seperator />
            {session && <CreateComment postId={id} postComment={postComment} />}
            <div className="flex flex-col gap-y-6">
              {comments
                ?.filter(comment => !comment.replyToId)
                .map(topLevelComment => {
                  const topLevelCommentVotesAmt = topLevelComment.votes?.reduce(
                    (acc, vote) => {
                      if (vote.type === "UP") return acc + 1;
                      if (vote.type === "DOWN") return acc - 1;
                      return acc;
                    },
                    0
                  );

                  const topLevelCommentVote = topLevelComment.votes?.find(
                    vote => vote.userId === session?.user.id
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
                        .map(reply => {
                          const replyVotesAmt = reply.votes?.reduce(
                            (acc, vote) => {
                              if (vote.type === "UP") return acc + 1;
                              if (vote.type === "DOWN") return acc - 1;
                              return acc;
                            },
                            0
                          );

                          const replyVote = reply.votes?.find(
                            vote => vote.userId === session?.user.id
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
        </>
      ) : null}
    </>
  );
};

export default Post;
