import Box from '@mui/material/Box';

const borderSize = 0;
export default function Home() {
  return (
    <Box
      sx={{
        margin: 3,
        rowGap: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Box>My name is Sakthipriyan Vairamani (in internet, thefourtheye).</Box>
      <table>
        <tbody>
          <tr>
            <td>Linked In</td>
            <td>
              <a href={'https://in.linkedin.com/in/sakthipriyan'}>
                https://in.linkedin.com/in/sakthipriyan
              </a>
            </td>
          </tr>
          <tr sx={{ border: borderSize }}>
            <td>Github</td>
            <td>
              <a href={'https://github.com/thefourtheye/'}>
                https://github.com/thefourtheye/
              </a>
            </td>
          </tr>
          <tr sx={{ border: borderSize }}>
            <td>Stack Exchange</td>
            <td>
              <a href={'https://stackexchange.com/users/1219964?tab=accounts'}>
                <img
                  src={'https://stackexchange.com/users/flair/1219964.png'}
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
}
