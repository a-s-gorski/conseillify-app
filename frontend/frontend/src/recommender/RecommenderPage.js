import { TextField, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getRecommendations, savePlaylist } from "../services/Message-Service";
import RecommendedPage from "./RecommendedPage";
import FeedbackPage from "./FeedbackPage";

const RecommenderPage = (props) => {
  const [playlistName, setPlaylistName] = useState("");
  const [recommendedUris, setRecommendedUris] = useState([]);
  const [recommendedNames, setRecommendedNames] = useState([]);
  const [coldstart, setColdstart] = useState([]);
  const [endpoint, setEndpoint] = useState([]);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();

  const handleTextChange = (e) => setPlaylistName(e.target.value);
  const handleButtonClicked = async () => {
    setIsLoading(true);
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getRecommendations(
      accessToken,
      user.email,
      props.userHistory,
      playlistName
    );
    setRecommendedUris(data["uris"]);
    setRecommendedNames(data["names"]);
    setColdstart(data["coldstart"]);
    setEndpoint(data["endpoint"]);
    setSubmittedFeedback(false);
    setIsLoading(false);

  };

  const handleDisplayFeedback = () => {
    setSubmittedFeedback(!submittedFeedback);
  };

  const renderRecommended = (
    recommendedNames,
    coldstart,
    endpoint,
    handleDisplayFeedback
  ) => {
    if (recommendedNames?.length > 1) {
      return (
        <RecommendedPage
          recommendedNames={recommendedNames}
          coldstart={coldstart}
          endpoint={endpoint}
          playlistName={playlistName}
          recommendedUris={recommendedUris}
          handleDisplayFeedback={handleDisplayFeedback}
        />
      );
    }
  };

  const renderFeedback = () => {
    if (recommendedNames?.length > 1 && !submittedFeedback) {
      return (
        <FeedbackPage
          endpoint={endpoint}
          coldstart={coldstart}
          handleDisplayFeedback={handleDisplayFeedback}
        />
      );
    }
  };
  const renderLoadingButton = () => {
    return isLoading ? (
      <Typography>Loading</Typography>
    ) : (
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleButtonClicked}
      >
        Recommend Me!
      </Button>
    );
  };

  return (
    <Grid item xs={6} justifyItems="center" alignItems="center">
      <TextField
        id="outlined-basic"
        label="Your playlist name"
        variant="outlined"
        onChange={handleTextChange}
      />
      {renderLoadingButton()}
      {renderRecommended(recommendedNames, coldstart, endpoint)}
      {renderFeedback()}
    </Grid>
  );
};

export default RecommenderPage;
