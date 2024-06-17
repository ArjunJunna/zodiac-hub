'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Menu, Plus, User } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { useSideBarResource } from '@/hooks/useSideBarResource';
import Seperator from '../server-components/Seperator';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useForumsData } from '@/hooks/useForumsData';
import CreateForumModal from './CreateForumModal';
import CreatePostButton from './CreatePostButton';
import SignInButton from '../SignInButton';
import { ThemeSwitcherBtn } from '../ThemeSwitcherBtn';
import { signOut } from 'next-auth/react';
import UserAvatar from './UserAvatar';

export default function MobileNavbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const { data, isLoading } = useForumsData();
  const [createForumModal, setCreateForumModal] = useState(false);

  const [topicsList, resourcesList] = useSideBarResource();

  return (
    <div className="block bg-background lg:hidden border-b sticky top-0 z-10">
      <nav className="container flex items-center justify-between px-8 h-[3.25rem]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[430px]" side="left">
            <div className="flex justify-between space-x-2 mt-4">
              <Image
                src={'/zodiac-logo.png'}
                alt="zodiac-logo"
                height={40}
                width={60}
                className="mr-2 cursor-pointer"
              />
              <ThemeSwitcherBtn />
              {session ? <CreatePostButton /> : null}
            </div>

            <div className="flex flex-col p-2 min-h-full">
              <div className="">
                <ul className="px-3 ">
                  <li
                    key="home"
                    className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                  >
                    <Link
                      href="/"
                      className="flex cursor-pointer items-center gap-3 "
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </li>

                  <li
                    key="flame"
                    className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                  >
                    <Flame className="h-4 w-4" />
                    Popular
                  </li>
                  {session?.user.token && (
                    <li
                      key="custom-feed"
                      className="flex cursor-pointer items-center gap-3 rounded-md 
           px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                    >
                      <Link
                        href="/custom-feed"
                        className="flex cursor-pointer items-center gap-3 "
                      >
                        <User className="h-4 w-4" />
                        Your Feed
                      </Link>
                    </li>
                  )}
                </ul>

                <Seperator />
                {!session?.user.token && (
                  <>
                    <ul className="px-3">
                      <li
                        key="home"
                        className="flex justify-between cursor-pointer items-center gap-3 rounded-md font-light
           px-3 py-[0.5rem] text-[12px] tracking-wider text-gray-400 hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                        onClick={() => setShowTopics((prev) => !prev)}
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
                {session?.user.token && (
                  <>
                    <ul className="px-3">
                      <li
                        key="home"
                        className="flex justify-between cursor-pointer items-center gap-3 rounded-md font-light
           px-3 py-[0.5rem] text-[12px] tracking-wider text-gray-400 hover:bg-gray-200/50 dark:hover:bg-primary-foreground"
                        onClick={() => setShowTopics((prev) => !prev)}
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
                            onClick={() => setCreateForumModal(true)}
                          >
                            <Plus className="h-7 w-7" />
                            Create Community
                          </li>
                          {!isLoading ? (
                            <>
                              {data?.map((item, index) => (
                                <li
                                  key={index}
                                  className="flex cursor-pointer items-center gap-3 rounded-md 
             px-3 py-[0.5rem] text-[14px]  hover:bg-gray-200/50 dark:hover:bg-primary-foreground "
                                >
                                  <UserAvatar name={item.name} h="7" w="7" />

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
                    onClick={() => setShowResources((prev) => !prev)}
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
             px-3 py-[0.5rem] text-[14px] hover:bg-gray-200/50 dark:hover:bg-primary-foreground "
                        >
                          <menu.icon className="h-4 w-4" />
                          {menu.name}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
              <div className="flex flex-col items-start gap-2 mb-10">
                {!session ? <SignInButton /> : null}
                {session ? (
                  <Button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    LogOut
                  </Button>
                ) : null}
              </div>
              {createForumModal ? (
                <CreateForumModal setCreateForumModal={setCreateForumModal} />
              ) : null}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
