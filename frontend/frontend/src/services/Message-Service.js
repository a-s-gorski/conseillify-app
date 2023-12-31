import callExternalApi from "./External-Api-Service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
// const apiServerUrl = "http://api:8000"

export const postSaveToken = async (accessToken, email, token) => {
  const config = {
    url: `${apiServerUrl}/api/save_token`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      email: email,
      token: token,
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data,
    error,
  };
};

export const getUserHistory = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/api/get_user_history`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      email: email,
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data,
    error,
  };
};

export const getIsSpotifyAuthenticated = async (accessToken, email) => {
  const config = {
    url: `${apiServerUrl}/api/is_spotify_authenticated`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      email: email,
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data,
    error,
  };
};

export const getRecommendations = async (
  accessToken,
  email,
  userHistory,
  playlistName
) => {
  const config = {
    url: `${apiServerUrl}/api/get_recommendations`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      userHistory: JSON.stringify(userHistory),
      playlistName: playlistName,
      email: email,
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data,
    error,
  };
};

export const savePlaylist = async (accessToken, email, playlistName, uris) => {
  const config = {
    url: `${apiServerUrl}/api/save_playlist`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      uris: JSON.stringify(uris),
      playlistName: playlistName,
      email: email,
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data, 
    error,
  };
};

export const submitFeedback = async (
  accessToken,
  email,
  endpoint,
  coldstart,
  review,
  feedback
) => {
  const config = {
    url: `${apiServerUrl}/api/submit_feedback`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      email: email,
      endpoint: endpoint,
      coldstart: coldstart,
      review: review,
      feedback: feedback,
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data,
    error,
  };
};
