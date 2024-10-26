import { readdirSync, readFileSync } from 'node:fs';
import renderAsHtml from '@/lib/md';
import matter from 'gray-matter';

function slashLStripper(data) {
  return data.replace(/^\/+/g, '');
}

const lookup = {};

export async function getPosts({ directory, path }) {
  const dir = directory || '/Users/divi/git/blog-content/posts';
  if (!lookup[dir]) {
    lookup[dir] = getAllPostsAsPromises(dir);
  }
  const posts = await lookup[dir];
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

function getAllPostsAsPromises(dir) {
  console.log(`Getting Posts from Dir [${dir}]`);
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
  return Promise.all(allPostsAsPromises);
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
