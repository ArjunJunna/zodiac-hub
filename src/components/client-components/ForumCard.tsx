'use client'

import React from "react";
import { useSession } from "next-auth/react";
import Seperator from "../server-components/Seperator";
import Image from "next/image";
import CreatePostButton from "@/components/client-components/CreatePostButton";
import { SubscribeButton } from "@/components/client-components/SubmitButtons";
import { handleSubscription } from "@/actions/actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForumByIdData } from "@/hooks/useForumsData";
import PostsSection from "./PostsSection";

const ForumCard = ({forumId}:{forumId:string}) => {
      const { data, isFetching } = useForumByIdData(forumId);
      const postsData = data?.posts;
      const queryClient = useQueryClient();
      const { data: session } = useSession();
      const handleJoin = async (formData: FormData) => {
        const response = await handleSubscription(formData);
        queryClient.invalidateQueries({ queryKey: ["forum"] });
        if (response?.status === 201) {
          toast.message(response?.data?.message);
        }
      };

      const text = data?.subscribers
        ?.map((sub: any) => sub.userId)
        .includes(session?.user.id)
        ? "Leave"
        : "Join";
  return (
    <>
      {isFetching ? null : (
        <div className="flex justify-between p-2">
          <div className="flex gap-x-2">
            <Image
              src={data?.image}
              alt="Forum Image"
              width={6}
              height={6}
              className="rounded-full max-sm:w-20 max-sm:h-20 sm:w-24 sm:h-24"
            />
            <p className="self-end font-bold text-2xl">z/{data?.name}</p>
          </div>
          <div className="flex gap-x-2">
            <CreatePostButton />

            <form action={handleJoin}>
              <input type="hidden" name="forumId" value={forumId} />
              <SubscribeButton text={text} />
            </form>
          </div>
        </div>
      )}

      <Seperator />
      <PostsSection postData={postsData} isLoading={isFetching} />
    </>
  );
}

export default ForumCard