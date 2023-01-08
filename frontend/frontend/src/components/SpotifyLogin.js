import { useAuth0 } from "@auth0/auth0-react";
import SpotifyLoginButton from "./SpotifyLoginButton";

const SpotifyLogin = () => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <SpotifyLoginButton />;
  }
};
export default SpotifyLogin;
