import Box from '@mui/material/Box';
import { getPosts } from '@/lib/fs';
import Post from '@/app/posts/[[...slug]]/post';
import { notFound } from 'next/navigation';
import DirListing from '@/app/posts/[[...slug]]/dirListing';

const borderSize = 0;
export default async function Home({ params }) {
  const post = (await getPosts({}))[(params.slug || []).join('/')];
  if (!post) {
    const posts = await getPosts({ path: params.slug || [] });
    if (!posts) {
      return notFound();
    }
    return (
      <DirListing
        path={params.slug || []}
        posts={posts}
      ></DirListing>
    );
  }
  return <Post post={post} />;
}

export async function generateStaticParams() {
  const posts = await getPosts({ forceRefresh: true });
  const allPostPaths = Object.keys(posts)
    .sort((a, b) => a.localeCompare(b))
    .map((value) => value.split('/').filter(Boolean))
    .flatMap((value) => getAllPaths(value))
    .map((value) => ({ slug: value }));
  return [...allPostPaths, { slug: [] }];
}

function getAllPaths(paths) {
  return paths.map((current, idx, array) => {
    return array.slice(0, idx + 1);
  });
}
