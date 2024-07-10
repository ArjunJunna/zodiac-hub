import { PostType } from '@/utils/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SkeletonPost } from '@/components/client-components/SkeletonPost';
import Post from '@/components/client-components/Post';
import { fetchPostById } from '@/actions/actions';
import CommentSection from '@/components/client-components/CommentSection';
import CreateComment from '@/components/client-components/CreateComment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { BASE_URL } from '@/lib/Constants';

export const revalidate = 0;

export async function generateStaticParams() {
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
  const post: PostType = await response.json();
  return {
    title: post.title,
    description: post.content,
    openGraph: {
      images: [
        {
          url: post?.image,
        },
      ],
    },
  };
}

const SinglePostPage = async ({ params }: { params: { postId: string } }) => {
  const session = await getServerSession(authOptions);
  const postData = await fetchPostById(params.postId);

  return (
    <>
      <div className=" w-full p-2 h-full max-md:mx-3 border-l border-r">
        <div>
          <Suspense fallback={<SkeletonPost />}>
            <Post postData={postData as PostType} />
          </Suspense>

          {session && <CreateComment postId={postData.id} />}

          <CommentSection id={postData.id} comments={postData.comments} />
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
