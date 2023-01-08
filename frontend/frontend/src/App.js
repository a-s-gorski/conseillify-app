import AuthenticationButton from "./components/AuthenticationButton";
import SpotifyLogin from "./components/SpotifyLogin";
import {CssBaseline, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import TitleLabel from "./material-ui/TitleLabel";
import DarkTheme from "./material-ui/DarkTheme";

function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline/>
      <Grid
        container
        spacing={0}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{ minHeight: "100vh" }}
        display="flex"
        width={'100%'}
      >
        <TitleLabel />
        <Grid item xs={6}>
          <AuthenticationButton />
        </Grid>
        <Grid item xs={3}>
          <SpotifyLogin />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
