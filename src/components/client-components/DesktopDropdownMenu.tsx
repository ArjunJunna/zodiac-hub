"use client";

import { Menu, UserRound, Moon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/authContext";
import { signOut } from "next-auth/react";

const DesktopDropdownMenu = () => {
  const {userDetails} = useAuth();
  const { setTheme, theme } = useTheme();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu
            className={cn("h-6 w-4", userDetails?.token ? "flex" : "hidden")}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <UserRound className="h-4 w-4 mr-3" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon className="h-4 w-4 mr-3" />
            Change Theme
            <Switch
              onCheckedChange={() => {
                theme === "light" ? setTheme("dark") : setTheme("light");
              }}
              className="ml-3"
            />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              signOut()
            }}
          >
            <LogOut className="h-4 w-4 mr-3" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DesktopDropdownMenu;
