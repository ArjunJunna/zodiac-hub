'use client'
import {useForumsData } from "@/hooks/useForumsData";
import React from "react";
import SkeletonPopularCard from "./SkeletonPopularCard";
import Image from "next/image";

const PopularSection = () => {
 
 const { data, isLoading } = useForumsData();
 const popularForums= data?.sort((a, b) => b.subscribersCount - a.subscribersCount).slice(0, 5);
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
          : popularForums?.map((item, index) => (
              <div
                key={index}
                className="flex gap-x-2 p-2
          hover:bg-gray-200/50 dark:hover:bg-primary-foreground cursor-pointer rounded-sm
        "
              >
                <Image
                width={32}
                height={32}
                alt="profile avatar"
                className="h-8 w-8 rounded-full  hover:cursor-pointer"
                src={item.image}
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
