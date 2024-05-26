"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Users } from "lucide-react";
import { ExtendedCreatedForumType } from "@/utils/types";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });
  const debounce = (func:any, delay:number) => {
    let timer:any;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this);
      }, delay);
    };
  };

  const request = debounce(async () => {
    refetch();
  }, 300);

 const debounceRequest = useCallback(() => {
    request();
  }, []);

  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async (): Promise<ExtendedCreatedForumType[]> => {
      if (!input) return [];
      const { data } = await axios.get(
        `https://zodiac-hub.onrender.com/api/v1/forums/search?q=${input}`
      );
      return data;
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-2xl border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={text => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities..."
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-inherit top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map(forum => (
                <CommandItem
                  onSelect={e => {
                    router.push(`/forums/${forum.id}`);
                    router.refresh();
                  }}
                  key={forum.id}
                  value={forum.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/forums/${forum.id}`}>r/{forum.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
