import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';
import rehypeHighlight from 'rehype-starry-night';
import rehypeRaw from 'rehype-raw';
import rehypeFormat from 'rehype-format';
import rehypeHighlightCodeLines from 'rehype-highlight-code-lines';

export default async function renderAsHtml(md) {
  return await unified()
    .use(remarkParse) // Parse markdown.
    .use(remarkToc)
    .use(remarkGfm) // Support GFM (tables, autolinks, tasklists, strikethrough).
    .use(remarkRehype, { allowDangerousHtml: true }) // Turn it into HTML.
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeHighlightCodeLines)
    .use(rehypeStringify) // Serialize HTML.
    .process(md);
}
