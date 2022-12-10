import { useAuth0 } from "@auth0/auth0-react";
import IsSpotifyAuthenticated from "./IsSpotifyAuthenticated";

const SpotifyAuthenticatedLabel = () => {
    const {isAuthenticated} = useAuth0();
    if(isAuthenticated){
        return <IsSpotifyAuthenticated/>
    }
}

export default SpotifyAuthenticatedLabel;