import callExternalApi from "./External-Api-Service";

// const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const apiServerUrl = "http://localhost:8000"

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
        }
    };
    const {data, error} = (await callExternalApi({config}));
    return {
        data, error
    }
}

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
        }
    };
    const {data, error} = (await callExternalApi({config}));
    return {
        data, error
    }
}



export const getIsSpotifyAuthenticated = async (accessToken, email) => {
    const config = {
        url: `${apiServerUrl}/api/is_spotify_authenticated`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            email: email
        }
    };
    const {data, error} = (await callExternalApi({config}));
    return {
        data, error,
    }
}