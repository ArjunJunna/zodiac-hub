"use client";

import { useState } from "react";
import { Home, Flame, ChevronDown, ChevronUp } from "lucide-react";
import { useSideBarResource } from "@/hooks/useSideBarResource";
import Footer from "./server-components/Footer";
import Seperator from "./server-components/Seperator";
import { useAuth } from "@/context/authContext";
import { Plus } from "lucide-react";
import useForumsData from "@/hooks/useForumsData";
import CreateForumModal from "./client-components/CreateForumModal";

const LeftSidebar = () => {
  const [showTopics, setShowTopics] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const [topicsList, resourcesList] = useSideBarResource();
  const { token } = useAuth();
  const { data, isLoading } = useForumsData();
  const [createForumModal,setCreateForumModal]=useState(false)

  return (
    <div className="hidden lg:flex lg:flex-col w-[30rem] p-2 min-h-full ">
      <div className="sticky top-16">
        <div>
          <ul className="px-3 ">
            <li
              key="home"
              className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
            >
              <Home className="h-4 w-4" />
              Home
            </li>

            <li
              key="flame"
              className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
            >
              <Flame className="h-4 w-4" />
              Popular
            </li>
          </ul>
          <Seperator />
          {!token && (
            <>
              <ul className="px-3">
                <li
                  key="home"
                  className="flex justify-between cursor-pointer items-center gap-3 rounded-md font-light
           px-3 py-[0.5rem] text-[12px] tracking-wider text-gray-400 hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                  onClick={() => setShowTopics(prev => !prev)}
                >
                  TOPICS
                  {showTopics === true ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </li>

                {showTopics && (
                  <>
                    {topicsList.map((menu, index) => (
                      <li
                        key={index}
                        className="flex cursor-pointer items-center gap-3 rounded-md 
             px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground "
                      >
                        <menu.icon className="h-4 w-4" />
                        {menu.name}
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <Seperator />
            </>
          )}
          {token && (
            <>
              <ul className="px-3">
                <li
                  key="home"
                  className="flex justify-between cursor-pointer items-center gap-3 rounded-md font-light
           px-3 py-[0.5rem] text-[12px] tracking-wider text-gray-400 hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                  onClick={() => setShowTopics(prev => !prev)}
                >
                  COMMUNITIES
                  {showTopics === true ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </li>

                {showTopics && (
                  <>
                    <li
                      className="flex cursor-pointer items-center gap-3 rounded-md 
             px-3 py-[0.5rem] text-[14px]  hover:bg-gray-200/50 dark:hover:bg-primary-foreground "
             onClick={()=>setCreateForumModal(true)}
                    >
                      <Plus className="h-7 w-7" />
                      Create Community
                    </li >
                    {!isLoading ? (
                      <>
                        {data?.map((item, index) => (
                          <li
                            key={index}
                            className="flex cursor-pointer items-center gap-3 rounded-md 
             px-3 py-[0.5rem] text-[14px]  hover:bg-gray-200/50 dark:hover:bg-primary-foreground "
                          >
                            <img
                              alt="profile avatar"
                              className="h-7 w-7 rounded-full  hover:cursor-pointer"
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.name}&backgroundColor=3e3f4a&chars=1`}
                            />

                            {item.name}
                          </li>
                        ))}
                      </>
                    ) : null}
                  </>
                )}
              </ul>
              <Seperator />
            </>
          )}
        </div>

        <div className="grow">
          <ul className="px-3">
            <li
              key="home"
              className="flex justify-between cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[12px] tracking-wider text-gray-400 font-light hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
              onClick={() => setShowResources(prev => !prev)}
            >
              RESOURCES
              {showResources === true ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </li>
            {showResources && (
              <>
                {resourcesList.map((menu, index) => (
                  <li
                    key={index}
                    className="flex cursor-pointer items-center gap-3 rounded-md 
             px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground animated fadeInUp"
                  >
                    <menu.icon className="h-4 w-4" />
                    {menu.name}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
      {createForumModal?<CreateForumModal setCreateForumModal={setCreateForumModal}/>:null}
    </div>
  );
};

export default LeftSidebar;
