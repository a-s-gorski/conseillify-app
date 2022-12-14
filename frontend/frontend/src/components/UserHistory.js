import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getUserHistory, getIsSpotifyAuthenticated } from "../services/Message-Service";
import CollapsedList from "../material-ui/ColllapsedList";

const UserHistory = () => {
    const [isSpotifyAuth, setIsSpotifyAuth] = useState("");
    const [userHistory, setUserHistory] = useState([]);
    const {getAccessTokenSilently, user, isAuthenticated} = useAuth0();
    useEffect(() => {
        let isMounted = true;
        const getIsSpotifyAuth = async () => {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getIsSpotifyAuthenticated(
              accessToken,
              user.email
            );
            setIsSpotifyAuth(data["is_spotify_authenticated"]);
            console.log("setup authorization", data)
        };
        const getUserHist = async () => {
            const accessToken = await getAccessTokenSilently();
            const {data, error} = await getUserHistory(accessToken, user.email)
            const listening_history = data["names"]
            console.log(listening_history);
            setUserHistory(listening_history);
        }
        getIsSpotifyAuth();
        console.log("getIsSpotifyAuth", isSpotifyAuth)
        if(isSpotifyAuth){
            getUserHist();
        }
        return () => {
            isMounted = false;
        }

    }, [getAccessTokenSilently, user, isSpotifyAuth])

    return <div>
        <CollapsedList elements={userHistory} title={"your listening history"} />
    </div>

}

export default UserHistory;