"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

const items = [
  { label: "Home", link: "/" },
  { label: "Feed", link: "/feed" },
  { label: "Profile", link: "/profile" },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block bg-background lg:hidden border-b">
      <nav className="container flex items-center justify-between px-8 h-[3.25rem]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px] sm:w-[480px]" side="left">
            <Image
              src={"/zodiac-logo.png"}
              alt="zodiac-logo"
              height={40}
              width={60}
              className="mr-2 cursor-pointer"
            />
            <div className="flex flex-col gap-1 pt-4">
              {items.map(item => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallback={() => setIsOpen(prev => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}



function NavbarItem({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground bg-slate-400"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>
    </div>
  );
}