"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSideBarResource } from "@/hooks/SideBarResource";
import Footer from "../server-components/Footer";
import Seperator from "../server-components/Seperator";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const [topicsList, resourcesList] = useSideBarResource();

  return (
    <div className="block bg-background lg:hidden border-b sticky top-0 z-10">
      <nav className="container flex items-center justify-between px-8 h-[3.25rem]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[430px]" side="left">
            <Image
              src={"/zodiac-logo.png"}
              alt="zodiac-logo"
              height={40}
              width={60}
              className="mr-2 cursor-pointer"
            />
            <div className="flex flex-col p-2 min-h-full">
              <div className="">
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
                <Seperator/>
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
                <Seperator/>
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

              <Footer/>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
