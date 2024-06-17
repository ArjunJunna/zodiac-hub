'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useUserData from '@/hooks/useUserData';
import { useSession } from 'next-auth/react';
import { useForumsData } from '@/hooks/useForumsData';
import { Dispatch, SetStateAction, useState } from 'react';

type ForumType = {
  userId: string;
  forumId: string;
  forumName: string;
};

const ForumPicker = ({
  setSelectedForum,
  selectedForum,
}: {
  setSelectedForum: Dispatch<SetStateAction<ForumType | null>>;
  selectedForum: ForumType | null;
}) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { data: forumData } = useForumsData();

  const forumDetails = forumData?.map((forum) => ({
    id: forum.id,
    name: forum.name,
  }));

  const { data: userData } = useUserData(session?.user.id as string);

  const forumMap = forumDetails?.reduce(
    (acc: { [key: string]: string }, item) => {
      acc[item.id] = item.name;
      return acc;
    },
    {}
  );

  const userAssociatedForums = forumMap
    ? userData?.subscriptions.map(({ userId, forumId }) => ({
        userId,
        forumId,
        forumName: forumMap[forumId],
      }))
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedForum ? selectedForum.forumName : 'Select community...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search community..." />
          <CommandEmpty>No community found.</CommandEmpty>

          <CommandGroup>
            {userAssociatedForums?.map((community) => (
              <CommandItem
                key={community.forumId}
                value={community.forumName}
                onSelect={() => {
                  setSelectedForum(community);
                  setOpen(false);
                }}
              >
                <div className="flex items-center">
                  {selectedForum === community && (
                    <Check className="mr-2 h-4 w-4 opacity-100" />
                  )}
                  {community.forumName}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ForumPicker;
