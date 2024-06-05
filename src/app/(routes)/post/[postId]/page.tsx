import { PostType } from "@/utils/types";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/Constants";
import { Suspense } from "react";
import { SkeletonPost } from "@/components/client-components/SkeletonPost";
import Post from "@/components/client-components/Post";
import { postComment } from "@/actions/actions";

export async function generateStaticParams(){
  const response = await fetch(`${BASE_URL}/posts`);
  const posts: PostType[] = await response.json();
   return posts.map(({ id }) => ({ postId: `${id}` }));
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

const SinglePostPage = async({ params }: { params: { postId: string } }) => {
    const response = await fetch(`${BASE_URL}/posts/${params.postId}`, {
      cache: "no-cache", next: { tags: ['single-post'] } 
    });
    const postData = await response.json();

  return (
    <>
      <div className=" w-full p-2 h-full max-md:mx-3 border-l border-r">
        <div>
          <Suspense fallback={<SkeletonPost />}>
            <Post postData={postData as PostType} postComment={postComment} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
