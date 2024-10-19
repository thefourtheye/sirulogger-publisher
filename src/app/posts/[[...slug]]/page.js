import Box from '@mui/material/Box';
import { getPosts } from '@/lib/fs';
import Post from '@/app/posts/[[...slug]]/post';
import { notFound } from 'next/navigation';
import DirListing from '@/app/posts/[[...slug]]/dirListing';

const borderSize = 0;
export default async function Home({ params }) {
  console.log(`Slug is ${JSON.stringify(params.slug)}`);
  const post = (await getPosts({}))[(params.slug || []).join('/')];
  if (!post) {
    const posts = await getPosts({ path: params.slug || [] });
    if (!posts) {
      return notFound();
    }
    return (
      <DirListing
        path={params.slug}
        posts={posts}
      ></DirListing>
    );
  }
  return (
    <Box
      sx={{
        border: borderSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Post post={post} />
    </Box>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts({});
  const allPostPaths = Object.keys(posts)
    .sort((a, b) => a.localeCompare(b))
    .map((value) => value.split('/').filter(Boolean))
    .flatMap((value) => getAllPaths(value))
    .map((value) => ({ slug: value }));
  console.log(allPostPaths);
  return allPostPaths;
}

function getAllPaths(paths) {
  return paths.map((current, idx, array) => {
    return array.slice(0, idx + 1);
  });
}
