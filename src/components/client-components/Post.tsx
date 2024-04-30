import {
  MessageSquare,
  Share,
  ArrowBigUp,
  ArrowBigDown,
  Ellipsis,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Post = () => {
  return (
    <div className="flex flex-col gap-2 hover:cursor-pointer relative py-2 px-4 rounded-md hover:bg-gray-200/50 dark:hover:bg-primary-foreground">
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <img
              alt="profile avatar"
              className="h-8 w-8 rounded-full  hover:cursor-pointer"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=arjun&backgroundColor=3e3f4a&chars=1`}
            />
            <div className="flex justify-between gap-x-2 items-center">
              <p className="font-normal text-[12px]  ">r/Cricket</p>
              <span>&#128908;</span>
              <p className="text-[12px]">3 hr. ago</p>
            </div>
          </div>

          <div className="flex justify-center gap-x-3">
            <button className="text-xs py-0 px-2 rounded-md bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40">
              Join
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis className="hover:bg-gray-600/10 px-1 rounded-md" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p>title comes here</p>
      </div>

      <div className="flex flex-col flex-grow gap-1">
        <p className="text-sm ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis sit
          eveniet laboriosam voluptates officia, deserunt rem maiores itaque
          ipsam quaerat expedita hic facere esse quae dolor amet praesentium
          delectus tenetur. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Officiis sit eveniet laboriosam voluptates officia, deserunt rem
          maiores itaque ipsam quaerat expedita hic facere esse quae dolor amet
          praesentium delectus tenetur. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Officiis sit eveniet laboriosam voluptates officia,
          deserunt rem maiores itaque ipsam quaerat expedita hic facere esse
          quae dolor amet praesentium delectus tenetur.
        </p>
        <div className="flex justify-between pt-1 ">
          <div className="flex gap-x-3">
            <button className="flex gap-x-1 hover:text-green-500">
              <ArrowBigUp />
              <p className="text-xs self-center">14</p>
            </button>
            <button className="flex gap-x-1 hover:text-red-400">
              <ArrowBigDown />
              <p className="text-xs self-center">7</p>
            </button>
            <button className="flex gap-x-1 hover:text-blue-400">
              <MessageSquare />
              <p className="text-xs self-center">14</p>
            </button>
          </div>

          <button className="flex gap-x-1 hover:text-orange-400">
            <Share />
            <p className="text-xs self-end">share</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
