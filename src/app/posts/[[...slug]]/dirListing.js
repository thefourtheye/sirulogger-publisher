import Box from '@mui/material/Box';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const borderSize = 0;

function groupPosts(path, posts) {
  const root = {};
  Object.entries(posts).forEach(([key, post]) => {
    const allPaths = key.replace(path.join('/'), '').split('/').filter(Boolean);
    const paths = allPaths.slice(0, -1);
    const fileName = allPaths[allPaths.length - 1];
    let current = root;
    while (paths.length > 0) {
      current[paths[0]] = current[paths[0]] || {};
      current = current[paths[0]];
      paths.shift();
    }
    current[fileName] = post;
  });
  return root;
}

function getHeading(children, level) {
  switch (level) {
    case 1:
      return <h3>{children}</h3>;
    case 2:
      return <h3>{children}</h3>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    default:
      return <h6>{children}</h6>;
  }
}

function recursiveLink(posts, currentPath, level) {
  return Object.entries(posts).map(([key, post]) => {
    if (post.post) {
      return (
        <Box>
          <a
            href={`/posts/${currentPath}/${key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getHeading(post.metadata.title, level)}
          </a>
        </Box>
      );
    }
    return (
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <a
            href={`/posts/${currentPath}/${key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getHeading(key, level)}
          </a>
        </AccordionSummary>
        <AccordionDetails>
          {recursiveLink(post, currentPath + '/' + key, level + 1)}
        </AccordionDetails>
      </Accordion>
    );
  });
}

export default function DirListing({ posts, path }) {
  const groupedPosts = groupPosts(path, posts);
  return (
    <Box sx={{ margin: 1, height: '100%', border: borderSize }}>
      <Box sx={{ margin: 0, padding: 0 }}>
        <h1>Listing of Path: {path.join('/')}</h1>
      </Box>
      {recursiveLink(groupedPosts, path.join('/'), 1)}
    </Box>
  );
}
