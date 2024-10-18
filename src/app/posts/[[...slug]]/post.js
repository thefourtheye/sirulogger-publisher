'use client';
import { Chip, Divider, Box } from '@mui/material';
import { useState } from 'react';

const borderSize = 0;

function formatEpochAsDate(epoch) {
  return new Date(epoch).toString().slice(0, 24) + ' IST';
}

function getDivider(post) {
  return (
    <Box
      sx={{
        border: borderSize,
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'space-between',
        alignItems: 'center',
        margin: 0,
        backgroundColor: '#9a9a9a'
      }}
    >
      <Box sx={{ flex: '0 0 auto', margin: 1, fontSize: 'small' }}>
        {formatEpochAsDate(post.createdAt)}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Divider
          sx={{
            border: borderSize,
            borderStyle: 'dashed'
          }}
          orientation="horizontal"
        />
      </Box>
      <Box
        sx={{
          border: borderSize,
          flex: 0,
          margin: 1,
          display: 'flex',
          flexDirection: 'row',
          columnGap: 1
        }}
      >
        {post.tags.map((tag) => {
          return (
            <Chip
              key={tag}
              variant="outlined"
              label={
                <Box
                  sx={{
                    fontFamily: 'monospace'
                  }}
                >
                  {tag}
                </Box>
              }
            >
              {tag}
            </Chip>
          );
        })}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Divider
          sx={{
            border: borderSize,
            borderStyle: 'dashed'
          }}
          orientation="horizontal"
        />
      </Box>
      <Box sx={{ flex: '0 0 auto', margin: 1, fontSize: 'small' }}>
        {formatEpochAsDate(post.modifiedAt)}
      </Box>
    </Box>
  );
}

export default function Post({ post }) {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <Box
      sx={{
        border: borderSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          flex: 0,
          margin: 0,
          padding: 1,
          border: borderSize,
          minWidth: '50vw'
        }}
      >
        {getDivider(post)}
        <Box sx={{ backgroundColor: '#e9e9e9' }}>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: '3em',
              lineHeight: '1em',
              border: borderSize,
              margin: 1,
              padding: 0,
              paddingTop: 3
            }}
          >
            {post.title}
            <Divider
              sx={{
                border: '1',
                borderStyle: 'dashed'
              }}
              orientation="horizontal"
            />
          </Box>
          <Box
            sx={{
              marginTop: 3,
              marginLeft: 3,
              padding: 0,
              boxShadow: 0,
              border: borderSize
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post.post }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
