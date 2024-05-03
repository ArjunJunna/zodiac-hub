"use client";
import { usePathname } from "next/navigation";
import PopularSection from "./PopularSection";
import AboutForum from "./AboutForum";

const Info = () => {
  const pathname = usePathname();
  return <div>{pathname === "/" ? <PopularSection /> : <AboutForum />}</div>;
};

export default Info;
