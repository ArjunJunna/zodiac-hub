"use client";

import useSinglePostData from "@/hooks/useSinglePostData";
import Post from "./Post";
import { PostType } from "@/utils/types";
import React from "react";
import { SkeletonPost } from "./SkeletonPost";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CommentSection from "./CommentSection";

type SinglePostType = {
  postId: string;
};

const SinglePost = ({ postId }: SinglePostType) => {
  const { singlePostData, isLoadingSinglePost } = useSinglePostData(postId);
  return (
    <div>
      {isLoadingSinglePost ? (
        <>
          <SkeletonPost />
        </>
      ) : (
        <>
          <Post postData={singlePostData as PostType} />
        </>
      )}
      <Suspense
        fallback={<Loader2 className="h-5 w-5 animate-spin text-zinc-500" />}
      >
        <CommentSection postId={postId} />
      </Suspense>
    </div>
  );
};

export default SinglePost;
