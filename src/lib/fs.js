import { readdirSync, readFileSync } from 'node:fs';
import renderAsHtml from '@/lib/md';
import matter from 'gray-matter';

function slashLStripper(data) {
  return data.replace(/^\/+/g, '');
}

export async function getPosts({ directory, path }) {
  const dir = directory || '/Users/divi/git/blog-content/posts';
  const allPostsAsPromises = readdirSync(dir, {
    recursive: true,
    withFileTypes: true
  })
    .map((file) => {
      return {
        post: readFileAsPost(file),
        file
      };
    })
    .filter(({ post, file }) => Boolean(post))
    .map(async ({ post, file }) => {
      return {
        path: slashLStripper(file.path.replace(dir, '') + '/') + file.name,
        name: file.name,
        post: {
          ...post,
          post: (await renderAsHtml(post.post)).value
        }
      };
    });
  const posts = await Promise.all(allPostsAsPromises);
  const pathToBeMatched = (path || []).join('/');
  return posts
    .filter((post) => {
      if (pathToBeMatched.length <= 0) {
        return true;
      }
      return post.path.startsWith(pathToBeMatched);
    })
    .reduce((posts, { path, post } = post) => {
      posts[path] = post;
      return posts;
    }, {});
}

function readFileAsPost(file) {
  if (!file.isFile() || file.name.startsWith('.')) {
    return null;
  }
  try {
    const data = readFileSync(file.path + '/' + file.name, {
      encoding: 'utf8'
    });
    return matter(data);
  } catch (error) {
    console.error(`Reading [${file.path + '/' + file.name}] Failed`, {
      cause: error
    });
    return null;
  }
}
