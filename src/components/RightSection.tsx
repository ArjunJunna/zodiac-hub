import PopularSection from "./client-components/PopularSection";
import Info from "./client-components/Info";


const RightSection = () => {

  return (
    <div className="block max-md:hidden w-[37rem] p-2 min-h-fit">
      <Info/>
    </div>
  );
};

export default RightSection;
