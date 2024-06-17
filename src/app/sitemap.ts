import { MetadataRoute } from 'next';
import { BASE_URL, PUBLIC_BASE_URL } from '@/lib/Constants';
import { ForumType, PostType } from '@/utils/types';

export default async function sitemap() {
  const postsResponse = await fetch(`${BASE_URL}/posts`);
  const posts: PostType[] = await postsResponse.json();

  const forumsResponse = await fetch(`${BASE_URL}/forums`);
  const forums: ForumType[] = await forumsResponse.json();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ id }) => ({
    url: `${PUBLIC_BASE_URL}/post/${id}`,
  }));

  const forumEntries: MetadataRoute.Sitemap = forums.map(({ id }) => ({
    url: `${PUBLIC_BASE_URL}/forums/${id}`,
  }));

  return [...postEntries, ...forumEntries];
}
