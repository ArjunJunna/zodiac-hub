const PopularSection = () => {
  const fakeData = [
    {
      id: 1,
      name: "Tom",
      title: "r/rugby",
      members: "1123435 members",
    },
    {
      id: 2,
      name: "Davinci",
      title: "r/sheets",
      members: "1876667 members",
    },
    {
      id: 3,
      name: "Theo",
      title: "r/soccer",
      members: "1876876 members",
    },
    {
      id: 4,
      name: "amigo",
      title: "r/palice",
      members: "1453354 members",
    },
    {
      id: 5,
      name: "zantos",
      title: "r/mateo",
      members: "123456 members",
    },
  ];

  return (
    <div className="p-4  w-full rounded-lg border">
      <p className=" text-xs font-medium ">POPULAR COMMUNITIES</p>
      <div className="flex flex-col gap-y-1.5 mt-6 pl-3 ">
        {fakeData.map((item, index) => (
          <div
            key={index}
            className="flex gap-x-2 p-2
          hover:bg-gray-200/50 dark:hover:bg-primary-foreground cursor-pointer rounded-sm
        "
          >
            <img
              alt="profile avatar"
              className="h-8 w-8 rounded-full  hover:cursor-pointer"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.name}&backgroundColor=3e3f4a&chars=1`}
            />
            <div className="flex flex-col  text-xs">
              <p className="text-xs">{item.title}</p>
              <p className="font-light">{item.members}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSection;
