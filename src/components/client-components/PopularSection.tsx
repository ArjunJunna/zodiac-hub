'use client'
import useForumsData from "@/hooks/useForumsData";
import React from "react";
import SkeletonPopularCard from "./SkeletonPopularCard";

const PopularSection = () => {
 
 const { data, isLoading } = useForumsData();
  return (
    <div className="p-4 w-full rounded-lg border">
      <p className=" text-xs font-medium ">POPULAR COMMUNITIES</p>
      <div className="flex flex-col gap-y-1.5 mt-6 pl-3 ">
        {isLoading
          ? Array.from({ length: 5 })?.map((_, index) => (
              <div key={index} className=" my-1.5">
                <SkeletonPopularCard />
              </div>
            ))
          : data?.map((item, index) => (
              <div
                key={index}
                className="flex gap-x-2 p-2
          hover:bg-gray-200/50 dark:hover:bg-primary-foreground cursor-pointer rounded-sm
        "
              >
                <img
                  alt="profile avatar"
                  className="h-8 w-8 rounded-full  hover:cursor-pointer"
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.name}&backgroundColor=3e3f4a&chars=1`}
                />
                <div className="flex flex-col  text-xs">
                  <p className="text-xs">{item?.name}</p>
                  <p className="font-light">{item?.subscribersCount}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PopularSection;
