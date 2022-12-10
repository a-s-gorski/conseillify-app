import { useAuth0 } from "@auth0/auth0-react";
import React, {useState, useEffect} from "react";
import { getIsSpotifyAuthenticated } from "../services/Message-Service";

const IsSpotifyAuthenticated = () => {
    const {getAccessTokenSilently, user} = useAuth0();
    const [isSpotifyAuth, setIsSpotifyAuth] = useState("");
    useEffect(() => {
        let isMounted = true;
        const getIsSpotifyAuth = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getIsSpotifyAuthenticated(accessToken, user.email);
            console.log("data", data);
            console.log("error", error);
            setIsSpotifyAuth(data["is_spotify_authenticated"]);
        };
        getIsSpotifyAuth();
        return () => {
            isMounted = false;
        };


    }, [getAccessTokenSilently]);
    return (
        <div>
            <p>is_spotify_authenticated</p>
            <p>{JSON.stringify(isSpotifyAuth)}</p>
        </div>

    )

}

export default IsSpotifyAuthenticated;