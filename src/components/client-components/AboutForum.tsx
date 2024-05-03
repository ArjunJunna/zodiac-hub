"use client";

import useSinglePostData from "@/hooks/useSinglePostData";
import { usePathname } from "next/navigation";
import SkeletonAboutForumCard from "./SkeletonAboutForumCard";

const AboutForum = () => {
  const pathname = usePathname();
  let postId = pathname.split("/").slice(2).join("/");
  const { singlePostData, isLoadingSinglePost } = useSinglePostData(postId);

  return (
    <div>
      {isLoadingSinglePost ? (
        <SkeletonAboutForumCard/>
      ) : (
        <>
          <div className="flex flex-col bg-gray-200/50 dark:bg-primary-foreground rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <p className="font-medium text-lg">
                {singlePostData?.forum.name}
              </p>
              <button className="text-sm px-2 bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40 rounded-lg">
                Join
              </button>
            </div>
            <p className="text-sm ">{singlePostData?.forum.description}</p>
            <div className="flex flex-col">
              <span>{singlePostData?.forum?._count?.subscribers}</span>
              <p className="text-xs text-gray-400">Members</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutForum;
