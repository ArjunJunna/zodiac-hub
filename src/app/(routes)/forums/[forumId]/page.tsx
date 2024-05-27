import ForumCard from "@/components/client-components/ForumCard";

const ForumPage = ({ params }: { params: { forumId: string } }) => {
  return (
    <>
      <div className="w-full p-2 h-fit max-md:mx-3 border-l border-r">
        <ForumCard forumId={params.forumId} />
      </div>
    </>
  );
};

export default ForumPage;
