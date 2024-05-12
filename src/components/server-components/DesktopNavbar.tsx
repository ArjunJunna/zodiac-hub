import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import { Search } from "lucide-react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import DesktopDropdownMenu from "../client-components/DesktopDropdownMenu";
import SignInButton from "../SignInButton";


export default function DesktopNavbar() {
  return (
    <div className="hidden border-b bg-background lg:block px-2 sticky top-0 z-20 w-full">
      <nav className="container flex gap-x-2 items-center justify-between px-4 py-1">
        <Image
          src={"/zodiac-logo.png"}
          alt="zodiac-logo"
          height={40}
          width={60}
          className="mr-2 cursor-pointer"
        />

        <div className="flex items-center gap-2 rounded-lg border border-gray-200/70 px-2 py-[3px] hover:border-gray-300 w-[30rem]">
          <Search className="h-8 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          <SignInButton />
          {/*<LoginButton/>*/}
          <DesktopDropdownMenu/>
          <ThemeSwitcherBtn />
        </div>
      </nav>
    </div>
  );
}
