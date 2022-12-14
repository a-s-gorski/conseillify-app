import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getIsSpotifyAuthenticated,
  postSaveToken,
} from "../services/Message-Service";

import UserHistory from "./UserHistory";

const SpotifyLoginButton = () => {
  const [spotifyToken, setSpotifyToken] = useState(
    Cookies.get("spotifyAuthToken")
  );
  const [isSpotifyAuth, setIsSpotifyAuth] = useState("");
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const clientId = "69a5bef19a7349f09227a6fee2d923c1";
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  console.log("envars", clientId, redirectUri)
  useEffect(() => {
    let isMounted = true;
    const getIsSpotifyAuth = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getIsSpotifyAuthenticated(
        accessToken,
        user.email
      );
      setIsSpotifyAuth(data["is_spotify_authenticated"]);
    };
    const saveSpotifyToken = async (spotifyToken) => {
      const accessToken = await getAccessTokenSilently();
      console.log("saveSpotifyToken token: ", spotifyToken)
      const { data, error } = await postSaveToken(accessToken, user.email, spotifyToken);
      console.log("data", data, "error", error);
    }
    getIsSpotifyAuth();
    if(spotifyToken){
      console.log("saving spotifyToken", window.location.href, spotifyToken)
      saveSpotifyToken(spotifyToken);
    }
    return () => {
      isMounted = false;
    }
  }, [getAccessTokenSilently, user]);

  return (
    <div>
      {isSpotifyAuth ? (
        <div>
        <UserHistory/>
        </div>
        ) : (
        <SpotifyAuth
          redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECT_URI}
          clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
          scopes={["user-read-recently-played", "playlist-modify-public", "playlist-modify-private"]}
          onAccessToken={console.log(window.location.pathname, spotifyToken)}
        />
      )}
    </div>
  );
};

export default SpotifyLoginButton;
