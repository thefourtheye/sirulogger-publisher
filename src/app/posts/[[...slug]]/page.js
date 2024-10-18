import Box from '@mui/material/Box';
import { getPosts } from '@/lib/fs';
import Post from '@/app/posts/[[...slug]]/post';

const borderSize = 0;
export default async function Home({ params }) {
  const post = (await getPosts())[(params.slug || []).join('/')];
  console.log(post);
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
  const posts = await getPosts();
  return Object.keys(posts)
    .sort((a, b) => a.localeCompare(b))
    .map((value) => value.split('/').filter(Boolean))
    .map((value) => ({ slug: value }));
}
