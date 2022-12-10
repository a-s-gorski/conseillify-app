import AuthenticationButton from "./components/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import Token from "./components/Token";
import SpotifyAuthenticatedLabel from "./components/SpotifyAuthenticatedLabel";
import SpotifyLogin from "./components/SpotifyLogin";

function App() {
    return (
    <div>
        <AuthenticationButton/>
        <Token/>
        <SpotifyAuthenticatedLabel/>
        <SpotifyLogin/>


        {/* <AuthenticationButton/>
        <ProtectedPage/>
        <Profile/> */}
    </div>
    );
}

export default App;
