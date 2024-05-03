'use client'

import useSinglePostData from "@/hooks/useSinglePostData"
import Post from "./Post";
import { PostType } from "@/utils/types";
import React from "react";
import { SkeletonPost } from "./SkeletonPost";

type SinglePostType={
    postId:string
}

const SinglePost = ({postId}:SinglePostType) => {
    const { singlePostData, isLoadingSinglePost } = useSinglePostData(postId);
  return (
    <div>
      {isLoadingSinglePost ? (
        <>
          <SkeletonPost />
        </>
      ) : (
        <Post postData={singlePostData as PostType} />
      )}
    </div>
  );
}

export default SinglePost