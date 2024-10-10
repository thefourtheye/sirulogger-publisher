import { readdirSync, readFileSync } from 'node:fs';
import Yaml from 'yaml';

function slashLStripper(data) {
  return data.replace(/^\/+/g, '');
}

export function getPosts(directory) {
  const dir = directory || '/Users/divi/git/blog-content/posts';
  return readdirSync(dir, {
    recursive: true,
    withFileTypes: true
  })
    .map((file) => {
      const post = readFileAsPost(file);
      return {
        path: slashLStripper(file.path.replace(dir, '') + '/') + file.name,
        name: file.name,
        post
      };
    })
    .filter((post) => post.post)
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
    return Yaml.parse(data);
  } catch (error) {
    console.error(`Reading [${file.path + '/' + file.name}] Failed`, {
      cause: error
    });
    return null;
  }
}
