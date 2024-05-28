import CreatePost from "@/components/client-components/CreatePost";
import { Metadata } from "next";

export const metadata:Metadata={
  title:'Create New Post'
}

const CreatePostPage = () => {
  return (
    <>
      <div className=" w-full p-2 h-full max-md:mx-3 border-l border-r">
        <div className="mx-auto flex justify-center mt-4">
          <CreatePost/>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
