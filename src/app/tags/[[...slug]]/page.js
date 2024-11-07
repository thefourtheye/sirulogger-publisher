import { getPosts } from '@/lib/fs';
import Box from '@mui/material/Box';
import { Chip } from '@mui/material';

const borderSize = 0;

function formatEpochAsDate(epoch) {
  return new Date(epoch).toString().slice(0, 24) + ' IST';
}

function getTagFrequencies(posts) {
  const tagFrequencies = Object.entries(posts)
    .flatMap(([key, value]) => value)
    .flatMap((post) => post.metadata.tags)
    .map((tag) => tag.toLowerCase())
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
  const rankedTags = Object.entries(tagFrequencies).sort((a, b) => b[1] - a[1]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: 3,
        rowGap: 2,
        margin: 2,
        border: borderSize,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        justifyItems: 'space-between'
      }}
    >
      {rankedTags.map((tag) => (
        <Box>
          <Chip
            key={tag[0]}
            sx={{
              flex: '0'
            }}
            variant="filled"
            label={
              <Box
                sx={{
                  fontFamily: 'monospace'
                }}
              >
                <a href={`/tags/${tag[0].toLowerCase()}`}>{tag[0]}</a> &nbsp;
                <b style={{ fontSize: 'large' }}>{tag[1]}</b>
              </Box>
            }
          />
        </Box>
      ))}
    </Box>
  );
}

function getHeader({ params }) {
  return params.slug ? (
    <Box sx={{ margin: 1, padding: 3 }}>
      <h3>
        Posts tagged with "<i>{decodeURI(params.slug)}</i>"
      </h3>
      <hr />
    </Box>
  ) : (
    <Box sx={{ margin: 1, padding: 3 }}>
      <h2>All Tags</h2>
      <hr />
    </Box>
  );
}

export default async function TagsHome({ params }) {
  console.log(`Tags Home Slug: ${JSON.stringify(params)}`);
  const posts = await getPosts({});
  if (!params.slug) {
    return (
      <>
        {getHeader({ params })}
        {getTagFrequencies(posts)}
      </>
    );
  }
  const tag = decodeURI(params.slug[0]);
  const matchingPosts = Object.entries(posts)
    .filter(([key, value]) =>
      value.metadata.tags.map((tag) => tag.toLowerCase()).includes(tag)
    )
    .toSorted((a, b) => b[1].metadata.createdAt - a[1].metadata.createdAt);
  return (
    <>
      {getHeader({ params })}
      {matchingPosts.map(([key, value]) => {
        return (
          <Box>
            <Box>{key}</Box>
            <Box>{value.metadata.title}</Box>
            <Box>{formatEpochAsDate(value.metadata.createdAt)}</Box>
            <Box>{formatEpochAsDate(value.metadata.modifiedAt)}</Box>
            <Box>{value.metadata.tags.join(',')}</Box>
            <hr />
          </Box>
        );
      })}
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts({});
  const allTags = Object.entries(posts).flatMap(([key, value]) =>
    value.metadata.tags.map((tag) => tag.toLowerCase())
  );
  const allTagsAsSlugs = [...new Set(allTags)].map((tag) => ({
    slug: [encodeURI(tag)]
  }));
  const result = [...allTagsAsSlugs, { slug: [] }];
  // console.log(`Tags generateStaticParams: ${JSON.stringify(result)}`);
  return result;
}
