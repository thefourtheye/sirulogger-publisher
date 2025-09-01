"use client";
import styled, { createGlobalStyle } from "styled-components";
import "./globals.css";
// Inject custom font faces for Latin Modern
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'LM Roman';
    src: url('/fonts/latin-roman/lmroman-normal.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'LM Roman';
    src: url('/fonts/latin-roman/lmroman-bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'LM Roman';
    src: url('/fonts/latin-roman/lmroman-italic.woff') format('woff');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'LM Roman';
    src: url('/fonts/latin-roman/lmroman-bolditalic.woff') format('woff');
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }
  body {
    font-family: 'LM Roman', serif;
  }
`;
import Box from "@mui/material/Box";

const borderSize = 0;

function getHeader() {
  return (
    <Box
      sx={{
        flex: 0,
        borderRadius: 1,
        border: borderSize,
        padding: 3,
        color: "#333333",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Box
        sx={{
          flex: 1,
          border: borderSize,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          rowGap: 1
        }}
      >
        <Box
          sx={{
            border: borderSize,
            fontSize: "2rem"
          }}
        >
          <b>thefourtheye.in</b>
        </Box>
        <Box
          sx={{
            border: borderSize,
            fontSize: "1rem",
            fontStyle: "bold",
            display: "flex",
            flexDirection: "row",
            columnGap: 12
          }}
        >
          <Box
            sx={{
              border: borderSize
            }}
          >
            Tags
          </Box>
          <Box
            sx={{
              border: borderSize
            }}
          >
            Categories
          </Box>
          <Box
            sx={{
              border: borderSize
            }}
          >
            SPAs
          </Box>
        </Box>
        <Box
          sx={{
            border: borderSize,
            width: "100%"
          }}
        >
          <hr style={{ color: "#888888" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      style={{ fontSize: "125%" }}
      lang="en"
    >
      <head>
        <link
          rel="stylesheet"
          href="https://esm.sh/@wooorm/starry-night@3/style/both"
        />
      </head>
      <body>
        <GlobalStyle />
        <Box
          sx={{
            border: borderSize,
            margin: 0,
            display: "flex",
            alignItems: "stretch",
            alignContents: "center",
            justifyContent: "center",
            justifyItems: "center"
          }}
        >
          <Box
            sx={{
              flex: 1,
              border: borderSize,
              display: "flex",
              maxWidth: "1024px",
              flexDirection: "column",
              marginTop: 0.5,
              marginBottom: 9
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: borderSize,
                padding: 0,
                rowGap: 1
              }}
            >
              {getHeader()}
              <Box
                sx={{
                  marginLeft: 3,
                  marginTop: 0,
                  marginRight: 3,
                  marginBottom: 3
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
