import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { SkeletonPost } from "@/components/client-components/SkeletonPost";
import Post from "@/components/client-components/Post";
import { PostType } from "@/utils/types";
import Seperator from "@/components/server-components/Seperator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Feed",
};

async function getCustomFeed() {
  const session = await getServerSession(authOptions);
  const postsData = await fetch(
    `https://zodiac-hub.onrender.com/api/v1/posts/custom/${session?.user.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    }
  );
  return postsData.json();
}

const CustomFeed = async () => {
  const postsData = await getCustomFeed();
  return (
    <div className=" w-full p-2 h-full max-md:mx-3 border-l border-r">
      <div className="flex flex-col gap-1">
        <Suspense
          fallback={Array.from({ length: 5 })?.map((_, index) => (
            <React.Fragment key={index}>
              <SkeletonPost />
              <Seperator />
            </React.Fragment>
          ))}
        >
          {postsData?.map((post: PostType) => (
            <>
              <Post postData={post} />
              <Seperator />
            </>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default CustomFeed;
