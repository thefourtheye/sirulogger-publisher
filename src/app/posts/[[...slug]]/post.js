'use client';
import { Chip, Divider, Box, Typography } from '@mui/material';
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
        {formatEpochAsDate(post.metadata.createdAt)}
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
        {post.metadata.tags.map((tag) => {
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
                    fontFamily: 'monospace',
                    fontWeight: 'bold'
                  }}
                >
                  {tag}
                </Box>
              }
            />
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
        {formatEpochAsDate(post.metadata.modifiedAt)}
      </Box>
    </Box>
  );
}

export default function Post({ post }) {
  return (
    <Box
      sx={{
        border: borderSize,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        minWidth: '99%',
        maxWidth: '99%'
      }}
    >
      <Box
        sx={{
          fontWeight: 'bold',
          fontSize: '3em',
          lineHeight: '1.5em',
          border: borderSize,
          minWidth: '100%',
          letterSpacing: '0.02em'
        }}
      >
        <center>
          <b>{post.metadata.title}</b>
        </center>
      </Box>
      <Box
        sx={{
          height: '100%',
          flex: '1 1 auto',
          margin: 0,
          padding: 1,
          boxShadow: 0,
          border: borderSize,
          overflow: 'auto',
          letterSpacing: '.03em',
          fontSize: 'large',
          textAlign: 'justify',
          lineHeight: '2rem'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: post.post }} />
      </Box>
      <Box
        sx={{
          border: borderSize,
          minWidth: '100%',
          marginTop: 'auto'
        }}
      >
        {getDivider(post)}
      </Box>
    </Box>
  );
}
