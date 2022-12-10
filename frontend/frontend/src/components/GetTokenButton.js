import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const GetTokenButton = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [message, setMessage] = useState("");
  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      setMessage(accessToken);
    };
    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);
  return (
    <div>
      <p> accessToken</p>
      <p> {message} </p>
      <p> {user.email}</p>
    </div>
  );
};

export default GetTokenButton;
