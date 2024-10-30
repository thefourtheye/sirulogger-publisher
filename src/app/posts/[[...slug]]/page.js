import Box from '@mui/material/Box';
import { getPosts } from '@/lib/fs';
import Post from '@/app/posts/[[...slug]]/post';
import { notFound } from 'next/navigation';
import DirListing from '@/app/posts/[[...slug]]/dirListing';

const borderSize = 0;

function PostsHomePage({ toBeDisplayedPosts }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 9,
        border: borderSize
      }}
    >
      {toBeDisplayedPosts.map((post) => (
        <Box sx={{ borderBottom: 1, padding: 3 }}>
          <Post post={post} />
        </Box>
      ))}
    </Box>
  );
}

export default async function PostsHome({ params }) {
  const allPosts = await getPosts({});
  if (!params.slug) {
    const posts = Object.entries(allPosts)
      .flatMap(([key, value]) => value)
      .sort((a, b) => b.metadata.createdAt - a.metadata.createdAt)
      .slice(0, 5);
    return <PostsHomePage toBeDisplayedPosts={posts} />;
  }
  const post = allPosts[(params.slug || []).join('/')];
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
