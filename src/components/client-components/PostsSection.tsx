import React from "react";
import { PostType } from "@/utils/types";
import { SkeletonPost } from "./SkeletonPost";
import Post from "./Post";
import Seperator from "../server-components/Seperator";
import { postComment } from "@/actions/actions";

type PostsSectionProps = {
  postData: PostType[];
  isLoading?: Boolean;
};

const PostsSection = ({ postData, isLoading }: PostsSectionProps) => {
  return (
    <div className="flex flex-col gap-1">
      {isLoading
        ? Array.from({ length: 5 })?.map((_, index) => (
            <React.Fragment key={index}>
              <SkeletonPost />
              <Seperator />
            </React.Fragment>
          ))
        : postData?.map(post => (
            <>
              <Post postData={post} postComment={postComment}/>
              <Seperator />
            </>
          ))}
    </div>
  );
};

export default PostsSection;
