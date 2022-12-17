import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getUserHistory, getIsSpotifyAuthenticated } from "../services/Message-Service";
import CollapsedList from "../material-ui/ColllapsedList";
import RecommenderPage from "../recommender/RecommenderPage";

const UserHistory = () => {
    const [isSpotifyAuth, setIsSpotifyAuth] = useState("");
    const [userHistoryNames, setUserHistoryNames] = useState([]);
    const [userHistoryUris, setuserHistoryUris] = useState([]);
    const {getAccessTokenSilently, user, isAuthenticated} = useAuth0();
    const renderRecommender = (userHistory) => {
        if(userHistory?.length > 1){
            return <RecommenderPage userHistory={userHistory}/>
        }
    }
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
            const listening_history = data["names"];
            const listnening_uris = data["uris"];
            console.log(listening_history);
            setUserHistoryNames(listening_history);
            setuserHistoryUris(listnening_uris);
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

    return (
    <div align="center">
        <CollapsedList elements={userHistoryNames} title={"Your listening history"} />
        {
            renderRecommender(userHistoryUris)
        }

        
    </div>)

}

export default UserHistory;