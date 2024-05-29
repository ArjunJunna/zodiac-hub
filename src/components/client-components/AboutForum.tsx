"use client";

import { usePathname } from "next/navigation";
import SkeletonAboutForumCard from "./SkeletonAboutForumCard";
import AuthModal from "./AuthModal";
import { useEffect, useState } from "react";
import { PostType } from "@/utils/types";
import { BASE_URL } from "@/lib/Constants";
import { handleSubscription } from "@/actions/actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubscribeButton } from "./SubmitButtons";
import { useForumByIdData } from "@/hooks/useForumsData";
import { useSession } from "next-auth/react";


type AboutForumProps = {
  postId?: string;
};

const AboutForum = ({ postId }: AboutForumProps) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  let postIdToUse = postId || pathname.split("/").slice(2).join("/");
  const { data: session } = useSession();

  const [singlePostData, setSinglePostData] = useState<PostType | undefined>();
  const { data } = useForumByIdData(singlePostData?.forum.id as string);

  const fetchPostById = async (postId: string) => {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const postData: PostType = await response.json();
    setSinglePostData(postData);
  };

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


  useEffect(() => {
    fetchPostById(postIdToUse);
  }, [postIdToUse]);

  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      {!singlePostData ? (
        <SkeletonAboutForumCard />
      ) : (
        <>
          <div className="flex flex-col bg-gray-200/50 dark:bg-primary-foreground rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">
                {singlePostData?.forum.name}
              </p>
              <form action={handleJoin}>
                <input type="hidden" name="forumId" value={singlePostData.forum.id} />
                <SubscribeButton text={text} />
              </form>
            </div>
            <p className="text-sm ">{singlePostData?.forum.description}</p>
            <div className="flex flex-col">
              <span>{singlePostData?.forum?._count?.subscribers}</span>
              <p className="text-xs text-gray-400">Members</p>
            </div>
            {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
          </div>
        </>
      )}
    </>
  );
};

export default AboutForum;
