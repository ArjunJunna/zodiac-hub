import React from "react";

type UserAvatarProps = {
  name: string;
  h: string;
  w: string;
};

const UserAvatar = ({ name,h,w }:UserAvatarProps) => {
  return (
    <div className={`h-${h} w-${w} flex justify-center items-center rounded-full bg-black text-white  hover:cursor-pointer`}>
      {name.charAt(0)}
    </div>
  );
};

export default UserAvatar;
