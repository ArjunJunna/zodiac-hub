import ForumCard from "@/components/client-components/ForumCard";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/Constants";
import { ForumType } from "@/utils/types";

export async function generateStaticParams() {
  const response = await fetch(`${BASE_URL}/forums`);
  const forums: ForumType[] = await response.json();

  return forums.map(({ id }) => ({ forumId: `${id}` }))
}

export async function generateMetadata({
  params,
}: {
  params: { forumId: string };
}): Promise<Metadata> {
  const response = await fetch(`${BASE_URL}/forums/${params.forumId}`);
  const forum: ForumType = await response.json();
  return {
    title: forum.name,
    description: forum.description,
    openGraph: {
      images: [
        {
          url: forum.image,
        },
      ],
    },
  };
}

const ForumPage = async ({ params }: { params: { forumId: string } }) => {
  const response = await fetch(
    `https://zodiac-hub.onrender.com/api/v1/forums/${params.forumId}`,
    {
      cache: "no-store",
      next: { tags: [`${params.forumId}`] },
    }
  );
  const forumData = await response.json();

  return (
    <>
      <div className="w-full p-2 h-fit max-md:mx-3 border-l border-r">
        <ForumCard forumData={forumData} />
      </div>
    </>
  );
};

export default ForumPage;
