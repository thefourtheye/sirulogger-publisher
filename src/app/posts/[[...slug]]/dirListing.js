import Box from '@mui/material/Box';

function groupPosts(path, posts) {
  const root = {};
  Object.keys(posts).forEach((key) => {
    const allPaths = key.replace(path.join('/'), '').split('/').filter(Boolean);
    const paths = allPaths.slice(0, -1);
    const fileName = allPaths[allPaths.length - 1];
    let current = root;
    while (paths.length > 0) {
      current[paths[0]] = current[paths[0]] || {};
      current = current[paths[0]];
      paths.shift();
    }
    current[fileName] = true;
  });
  console.log(root);
}

export default function DirListing({ posts, path }) {
  groupPosts(path, posts);
  return (
    <Box sx={{ backgroundColor: '#c9c9c9', margin: 3, height: '50%' }}>
      Hello
    </Box>
  );
}
