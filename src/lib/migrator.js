import matter from 'gray-matter';
import fs from 'fs';
import slugify from 'slugify';

const dir = '/Users/divi/git/thefourtheye.in/source/_posts';
const targetDir = '/Users/divi/git/blog-content/posts';
fs.readdirSync(dir).forEach((file) => {
  const post = matter.read(dir + '/' + file);
  const postDate = new Date(post.data.date);
  const datePath = [
    postDate.getFullYear(),
    (postDate.getMonth() + 1).toString().padStart(2, '0'),
    postDate.getDate().toString().padStart(2, '0')
  ].join('/');
  console.log(postDate, postDate.getTime());
  fs.mkdirSync(targetDir + '/' + datePath, { recursive: true });
  const tags = Array.isArray(post.data.categories)
    ? post.data.categories
    : post.data.categories.split();
  const migratedData = {
    data: {
      title: post.data.title,
      tags: tags,
      createdAt: postDate.getTime(),
      modifiedAt: postDate.getTime()
    },
    content: post.content
  };
  fs.writeFileSync(
    targetDir + '/' + datePath + '/' + slugify(post.data.title) + '.post',
    matter.stringify(migratedData.content, migratedData.data)
  );
  // console.log(migratedData);
});
