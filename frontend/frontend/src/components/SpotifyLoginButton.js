import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SpotifyAuth } from "react-spotify-auth";
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
  const { getAccessTokenSilently, user} = useAuth0();
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
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
      const { data, error } = await postSaveToken(
        accessToken,
        user.email,
        spotifyToken
      );
    };
    getIsSpotifyAuth();
    if (spotifyToken) {
      saveSpotifyToken(spotifyToken);
    }
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, user]);

  return (
    <div>
      {isSpotifyAuth ? (
        <div>
          <UserHistory />
        </div>
      ) : (
        <SpotifyAuth
          redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECT_URI}
          clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
          scopes={[
            "user-read-recently-played",
            "playlist-modify-public",
            "playlist-modify-private",
          ]}
        />
      )}
    </div>
  );
};

export default SpotifyLoginButton;
