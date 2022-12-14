import AuthenticationButton from "./components/AuthenticationButton";
import Token from "./components/Token";
import SpotifyAuthenticatedLabel from "./components/SpotifyAuthenticatedLabel";
import SpotifyLogin from "./components/SpotifyLogin";
import { Button, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Theme from "./material-ui/Theme";
import TitleLabel from "./material-ui/TitleLabel";
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Grid
        container
        spacing={0}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{ minHeight: "100vh" }}
        display="flex"
      >
          
        <Grid item xs={3}>
          <TitleLabel/>
        </Grid>
        <Grid item xs={3}>
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
