import { useAuth0 } from "@auth0/auth0-react";
import { savePlaylist } from "../services/Message-Service";
import { Typography, Button } from "@mui/material";
import CollapsedList from "../material-ui/ColllapsedList";
import React from "react";

const RecommendedPage = (props) => {
    const {getAccessTokenSilently, user} = useAuth0();
    const handleSavePlaylist = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await savePlaylist(
          accessToken,
          user.email,
          props.playlistName,
          props.recommendedUris
        );
        console.log("saved playlist");
      };


    return (
        <div alignItems="center">
          <CollapsedList
            elements={props.recommendedNames}
            title={"Your recommendations."}
          />
          <Button onClick={handleSavePlaylist}>save playlist</Button>
          <Typography color={"secondary"}>Coldstart: {JSON.stringify(props.coldstart)}</Typography>
        </div>
    )
}


export default RecommendedPage;