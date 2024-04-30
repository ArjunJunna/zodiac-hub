import Post from "../client-components/Post";
import Seperator from "./Seperator";

const PostSection = () => {
  return (
    <div className="flex flex-col gap-3 ">
      <Post />
      <Seperator />
      <Post />
      <Seperator />
      <Post />
      <Seperator />
      <Post />
    </div>
  );
}

export default PostSection