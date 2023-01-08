import { useAuth0 } from "@auth0/auth0-react";
import {
  TextField,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { submitFeedback } from "../services/Message-Service";

const FeedbackPage = (props) => {
  const [reviewAccuracy, setReviewAccuracy] = useState(0);
  const [reviewNovelty, setReviewNovelty] = useState(0);
  const [reviewCoherence, setReviewCoherence] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();

  const handleSliderAccuracy = (e) => setReviewAccuracy(e.target.value);
  const handleSliderNovelty = (e) => setReviewNovelty(e.target.value);
  const handleSliderCoherence = (e) => setReviewCoherence(e.target.value);
  const handleUserFeedback = (e) => setUserFeedback(e.target.value);
  const handleSubmitFeedback = async () => {
    const review = reviewAccuracy + reviewNovelty + reviewCoherence;
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await submitFeedback(
      accessToken,
      user.email,
      props.endpoint,
      props.coldstart,
      review,
      userFeedback
    );
    props.handleDisplayFeedback();
  };

  return (
    <div>
      <Typography>Please submit your feedback</Typography>
      <Typography>Accuracy</Typography>
      <Slider
        step={1}
        min={-10}
        max={10}
        valueLabelDisplay="auto"
        onChange={handleSliderAccuracy}
      ></Slider>
      <Typography>Novelty</Typography>
      <Slider
        step={1}
        min={-10}
        max={10}
        valueLabelDisplay="auto"
        onChange={handleSliderNovelty}
      ></Slider>
      <Typography>Coherence</Typography>
      <Slider
        step={1}
        min={-10}
        max={10}
        valueLabelDisplay="auto"
        onChange={handleSliderCoherence}
      >
        Coherence
      </Slider>
      <Typography>Your feedback</Typography>
      <TextField onChange={handleUserFeedback}></TextField>
      <Button variant="outlined" onClick={handleSubmitFeedback}>
        Submit
      </Button>
    </div>
  );
};

export default FeedbackPage;
