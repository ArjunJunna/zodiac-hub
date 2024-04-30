"use client";

import { useState } from "react";
import {
  Home,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSideBarResource } from "@/hooks/SideBarResource";
import Footer from "./server-components/Footer";
import Seperator from "./server-components/Seperator";

const LeftSidebar = () => {
  const [showTopics, setShowTopics] = useState(false);
  const [showResources, setShowResources] = useState(false);
 
  const [topicsList, resourcesList] = useSideBarResource();

  return (
    <div className="hidden lg:flex lg:flex-col w-[26rem] p-2 border-r min-h-full">
      <div>
        <ul className="px-3 ">
          <li
            key="home"
            className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] dark:hover:bg-slate-900 hover:bg-gray-100"
          >
            <Home className="h-4 w-4" />
            Home
          </li>

          <li
            key="flame"
            className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] hover:bg-gray-100 dark:hover:bg-slate-900"
          >
            <Flame className="h-4 w-4" />
            Popular
          </li>
        </ul>
        <Seperator />
        <ul className="px-3">
          <li
            key="home"
            className="flex justify-between cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] dark:hover:bg-slate-900 hover:bg-gray-100"
            onClick={() => setShowTopics(prev => !prev)}
          >
            Topics
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
             px-3 py-[0.5rem] text-[14px] hover:bg-gray-100 dark:hover:bg-slate-900 animated fadeInUp"
                >
                  <menu.icon className="h-4 w-4" />
                  {menu.name}
                </li>
              ))}
            </>
          )}
        </ul>
        <Seperator />
      </div>

      <div className="grow">
        <ul className="px-3">
          <li
            key="home"
            className="flex justify-between cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] dark:hover:bg-slate-900 hover:bg-gray-100"
            onClick={() => setShowResources(prev => !prev)}
          >
            Resources
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
             px-3 py-[0.5rem] text-[14px] hover:bg-gray-100 dark:hover:bg-slate-900 animated fadeInUp"
                >
                  <menu.icon className="h-4 w-4" />
                  {menu.name}
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default LeftSidebar;
