import React from "react";
import Seperator from "../server-components/Seperator";
import Image from "next/image";
import CreatePostButton from "@/components/client-components/CreatePostButton";
import PostsSection from "./PostsSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Suspense } from "react";
import SubscriptionForm from "./SubscriptionForm";

const ForumCard = async ({ forumData }: { forumData: any }) => {
  const session = await getServerSession(authOptions);
  const postsData = forumData?.posts;
  const text = forumData?.subscribers
    ?.map((sub: any) => sub.userId)
    .includes(session?.user.id)
    ? "Leave"
    : "Join";
  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <div className="flex justify-between p-2">
          <div className="flex gap-x-2">
            <Image
              src={forumData?.image}
              alt="Forum Image"
              width={6}
              height={6}
              className="rounded-full max-sm:w-20 max-sm:h-20 sm:w-24 sm:h-24"
            />
            <p className="self-end font-bold text-2xl">z/{forumData?.name}</p>
          </div>
          <div className="flex gap-x-2">
            <CreatePostButton />
            <SubscriptionForm forumId={forumData.id} initialText={text} />
          </div>
        </div>
      </Suspense>
      <Seperator />
      <PostsSection postData={postsData} />
    </>
  );
};

export default ForumCard;
