"use client";

import Image from "next/image";
import { PostType } from "@/utils/types";
import { countVotes } from "@/utils/utilities";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import AuthModal from "../client-components/AuthModal";
import { RenderToJson } from "../server-components/RenderToJson";
import {handlePostVote } from "@/actions/actions";
import { useSession } from "next-auth/react";
import {useQueryClient} from "@tanstack/react-query"
import { useState } from "react";
import CommentSection from "./CommentSection";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

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
          "flex flex-col gap-2 max-w-[46rem] hover:cursor-pointer relative py-2 px-4 rounded-md",
          pathname === "/"
            ? "hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
            : ""
        )}
        key={id}
      >
        <PostHeader forumImage={forumImage} forumId={forumId} forumName={forumName} postId={id} description={description} subscribers={subscribers} username={username} title={title} createdAt={createdAt}/>

        <div className="flex flex-col flex-grow gap-1">
          <div
            className="max-h-60 text-ellipsis overflow-hidden  "
          >
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
            ) : null}
            {content !== null ? <RenderToJson data={content} /> : null}
          </div>
        <PostFooter handleSubmit={handleSubmit} postId={id} voteCount={voteCount} commentsCount={comments.length}/>
        </div>
        {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
      </div>
      {pathname.startsWith("/post") ? (
        <>
         <CommentSection postComment={postComment} id={id} comments={comments}/>
        </>
      ) : null}
    </>
  );
};

export default Post;
