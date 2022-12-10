import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import GetTokenButton from "./GetTokenButton";
const Token = () => {
    const {isAuthenticated, user} = useAuth0();
    if(isAuthenticated){
        return <GetTokenButton/>
    }
}
export default Token;