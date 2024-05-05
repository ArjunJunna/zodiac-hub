"use client";

import useSinglePostData from "@/hooks/useSinglePostData";
import { usePathname } from "next/navigation";
import SkeletonAboutForumCard from "./SkeletonAboutForumCard";
import useAuthModal from "@/hooks/useAuthModal";
import AuthModal from "./AuthModal";

type AboutForumProps={
  postId?:string;
}

const AboutForum = ({postId}:AboutForumProps) => {
   const pathname = usePathname();
   let postIdToUse = postId || pathname.split("/").slice(2).join("/");

   const { singlePostData, isLoadingSinglePost } =
     useSinglePostData(postIdToUse);
      const { showAuthModal, setShowAuthModal, joinForum } =
        useAuthModal();

  return (
    <div>
      {isLoadingSinglePost ? (
        <SkeletonAboutForumCard />
      ) : (
        <>
          <div className="flex flex-col bg-gray-200/50 dark:bg-primary-foreground rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">
                {singlePostData?.forum.name}
              </p>
              <button
                className="text-sm px-2 bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40 rounded-lg"
                onClick={e => {
                  e.stopPropagation();
                  joinForum();
                }}
              >
                Join
              </button>
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
    </div>
  );
};

export default AboutForum;
