import SinglePost from "@/components/client-components/SinglePost";

const SinglePostPage = ({ params }: { params: { postId: string } }) => {
  return (
    <>
      <div className=" w-full p-2 h-full max-md:mx-3 border-l border-r">
        <SinglePost postId={params.postId} />
      </div>
    </>
  );
};

export default SinglePostPage;
