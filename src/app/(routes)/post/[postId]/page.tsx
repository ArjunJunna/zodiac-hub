import SinglePost from "@/components/client-components/SinglePost";
import { PostType } from "@/utils/types";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/Constants";

export async function generateStaticParams(){
  const response = await fetch(`${BASE_URL}/posts`);
  const posts: PostType[] = await response.json();
  return posts.map(({id})=>id)
}

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const response = await fetch(`${BASE_URL}/posts/${params.postId}`);
  const post:PostType = await response.json();
  return {
    title:post.title,
    description:post.content,
    openGraph:{
      images:[
        {
          url:post?.image
        }
      ]
    }
  };
}

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
