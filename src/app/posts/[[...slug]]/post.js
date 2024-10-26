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
        borderRadius: 3,
        border: borderSize,
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'space-between',
        alignItems: 'center',
        margin: 0
      }}
    >
      <Box sx={{ flex: '0 0 auto', margin: 1, fontSize: 'small' }}>
        {formatEpochAsDate(post.data.createdAt)}
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
        {post.data.tags.map((tag) => {
          return (
            <Chip
              key={tag}
              sx={{
                backgroundColor: 'black',
                color: 'white'
              }}
              variant="filled"
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
        {formatEpochAsDate(post.data.modifiedAt)}
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
          minWidth: '100%'
        }}
      >
        {getDivider(post)}
        <Box sx={{ backgroundColor: '#c9c9c9' }}>
          <Box
            sx={{
              fontWeight: 'bold',
              fontSize: '3em',
              lineHeight: '1em',
              border: borderSize,
              margin: 1,
              padding: 0,
              paddingTop: 1
            }}
          >
            {post.data.title}
            <Divider
              sx={{
                margin: 3,
                padding: 0,
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
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
