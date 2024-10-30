import { readdirSync, readFileSync } from 'node:fs';
import renderAsHtml from '@/lib/md';
import matter from 'gray-matter';

function slashLStripper(data) {
  return data.replace(/^\/+/g, '');
}

const lookup = {};

export async function getPosts({ directory, path, forceRefresh }) {
  const dir = directory || '/Users/divi/git/blog-content/posts';
  if (forceRefresh || !lookup[dir]) {
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
    .reduce((posts, post) => {
      posts[post.path] = post;
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
        matter: readFileAsPost(file),
        file
      };
    })
    .filter(({ matter, file }) => Boolean(matter))
    .map(async ({ matter, file }) => {
      return {
        path: slashLStripper(file.path.replace(dir, '') + '/') + file.name,
        name: file.name,
        metadata: matter.metadata,
        post: (await renderAsHtml(matter.content)).value
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
    const result = matter(data);
    return {
      metadata: result.data,
      content: result.content
    };
  } catch (error) {
    console.error(`Reading [${file.path + '/' + file.name}] Failed`, {
      cause: error
    });
    return null;
  }
}
