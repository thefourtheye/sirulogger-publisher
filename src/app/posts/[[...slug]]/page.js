import Box from '@mui/material/Box';
import { getPosts } from '@/lib/fs';

export default async function Post({ params }) {
  const post = getPostBySlugs(params.slug);
  return (
    <main>
      <Box>Preview: [{post.preview}]</Box>
      <Box>Title: [{post.title}]</Box>
      <Box>
        Tags: [{post.tags.reduce((acc, current) => acc + ', ' + current, '')}]
      </Box>
      <Box>Content: [{post.post}]</Box>
      <Box>Created At: [{post.createdAt}]</Box>
      <Box>Modified At: [{post.modifiedAt}]</Box>
    </main>
  );
}

function getPostBySlugs(slugs) {
  const posts = getAllPosts();
  return posts[slugs.join('/')];
}

export async function generateStaticParams() {
  const posts = getPosts();
  return Object.keys(posts)
    .sort((a, b) => a.localeCompare(b))
    .map((value) => value.split('/').filter(Boolean))
    .map((value) => ({ slug: value }));
}

export function getAllPosts() {
  return getPosts();
}
