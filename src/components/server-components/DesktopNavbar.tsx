import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import { Search } from "lucide-react";
import Image from "next/image";
import DesktopDropdownMenu from "../client-components/DesktopDropdownMenu";
import SignInButton from "../SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreatePostButton from "../client-components/CreatePostButton";
import AppbarLogo from "../client-components/AppbarLogo";

export async function DesktopNavbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="hidden border-b bg-background lg:block px-2 sticky top-0 z-20 w-full">
      <nav className="container flex gap-x-2 items-center justify-between px-4 py-1">
        <AppbarLogo />

        <div className="flex items-center gap-2 rounded-lg border border-gray-200/70 px-2 py-[3px] hover:border-gray-300 w-[30rem]">
          <Search className="h-8 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          {session ? <CreatePostButton /> : null}
          {!session ? <SignInButton /> : null}
          <DesktopDropdownMenu />
          <ThemeSwitcherBtn />
        </div>
      </nav>
    </div>
  );
}
