import Box from "@mui/material/Box";

const borderSize = 0;

function getIntro() {
  return (
    <Box
      sx={{
        border: borderSize,
        padding: 3,
        color: "#333333",
        display: "flex",
        flexDirection: "column",
        rowGap: 2
      }}
    >
      <div style={{ fontSize: "30px" }}>
        <b>About Me</b>
      </div>
      <span style={{ textAlign: "justify" }}>
        My name is Sakthipriyan Vairamani (in internet, thefourtheye). I am{" "}
        <a
          href="https://github.com/nodejs/node?tab=readme-ov-file#tsc-emeriti-members"
          target="_blank"
        >
          one of the Node.js Technical Steering Committee Emeriti
        </a>
        . A{" "}
        <a
          href="https://stackexchange.com/users/1219964/thefourtheye?tab=accounts"
          target="_blank"
        >
          stackoverflow answerer, with 240k+ reputation
        </a>
        . My languages of choice are Python and JavaScript.
      </span>
      <br />
      <br />
      <table
        width={"100%"}
        border={0}
        cellPadding={5}
        cellSpacing={0}
        style={{ borderCollapse: "collapse", borderColor: "#888888" }}
      >
        <thead>
          <tr>
            <th>Platform</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Linked In</td>
            <td>
              <a href={"https://in.linkedin.com/in/sakthipriyan"}>
                https://in.linkedin.com/in/sakthipriyan
              </a>
            </td>
          </tr>
          <tr>
            <td>Github</td>
            <td>
              <a href={"https://github.com/thefourtheye/"}>
                https://github.com/thefourtheye/
              </a>
            </td>
          </tr>
          <tr>
            <td>Stack Exchange</td>
            <td>
              <a href={"https://stackexchange.com/users/1219964?tab=accounts"}>
                <img
                  src={"https://stackexchange.com/users/flair/1219964.png"}
                  alt="Stack Exchange user flair"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
}

export default function Home() {
  return (
    <Box
      sx={{
        margin: 1,
        columnGap: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <Box sx={{ border: borderSize }}>{getIntro()}</Box>
      <Box
        sx={{
          border: borderSize,
          padding: 3,
          flexDirection: "column",
          rowGap: 3
        }}
      >
        <div style={{ fontSize: "30px" }}>
          <b>Categories</b>
        </div>
        <hr></hr>
        <div style={{ fontSize: "30px" }}>
          <b>Tags</b>
        </div>
      </Box>
    </Box>
  );
}
