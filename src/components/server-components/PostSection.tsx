"use client"

import Post from "../client-components/Post";
import Seperator from "./Seperator";
import usePostsData from "@/hooks/usePostsData";
import { SkeletonPost } from "../client-components/SkeletonPost";
import React from "react";

const PostSection = () => {

  const {data,isLoading}=usePostsData();

  return (
    <div className="flex flex-col gap-1">
      {isLoading
        ? Array.from({ length: 5 })?.map((_, index) => (
            <React.Fragment key={index}>
              <SkeletonPost />
              <Seperator />
            </React.Fragment>
          ))
        : data?.map(post => (
            <>
              <Post postData={post} />
              <Seperator />
            </>
          ))}
    </div>
  );
}

export default PostSection