import {
  Gamepad2,
  Medal,
  Clapperboard,
  Cat,
  Palette,
  Settings,
  Grid2X2,
  Info,
  LayoutGrid,
  Github,
  LucideIcon,
} from "lucide-react";
import React from "react";
type SideBarList={
    id: number;
    name: string;
    icon: LucideIcon;
    path: string;
}[]

export const useSideBarResource = () => {
  const topicsList = [
    {
      id: 1,
      name: "Gaming",
      icon: Gamepad2,
      path: "",
    },
    {
      id: 2,
      name: "Sports",
      icon: Medal,
      path: "",
    },

    {
      id: 3,
      name: "Cinema",
      icon: Clapperboard,
      path: "",
    },
    {
      id: 4,
      name: "Pets & Animals",
      icon: Cat,
      path: "",
    },
    {
      id: 5,
      name: "Art",
      icon: Palette,
      path: "",
    },
  ];
  const resourcesList = [
    {
      id: 1,
      name: "Settings",
      icon: Settings,
      path: "",
    },
    {
      id: 2,
      name: "Communities",
      icon: Grid2X2,
      path: "",
    },

    {
      id: 3,
      name: "Topics",
      icon: LayoutGrid,
      path: "",
    },
    {
      id: 4,
      name: "About Zodiac",
      icon: Info,
      path: "",
    },
    {
      id: 5,
      name: "Github Code",
      icon: Github,
      path: "",
    },
  ];
 
  return [
    topicsList,
    resourcesList,

  ]
};

