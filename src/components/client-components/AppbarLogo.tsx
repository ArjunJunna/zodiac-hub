'use client'

import Image from "next/image";
import Link from "next/link";

const AppbarLogo = () => {
  return (
    <Link href="/" className="flex cursor-pointer items-center gap-3 ">
      <Image
        src={"/zodiac-logo.png"}
        alt="zodiac-logo"
        height={40}
        width={60}
        className="mr-2 cursor-pointer"
      />
    </Link>
  );
}

export default AppbarLogo