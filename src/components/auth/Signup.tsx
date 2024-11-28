import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/use-create.user";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/use.login";

export const Signup = () => {
    const [createUser] = useCreateUser();

    const [error, setError] = useState<string>();
    const { login } = useLogin();
    
    return (
        <Auth submitLabel={"Signup"} error={error} onSubmit={async ({email, password}) => { 
            try {
                await createUser({
                variables: {
                    createUserInput: {
                        email,
                        password
                    }
                }
                } );
                await login( { email, password } );
                setError( "" );
            } catch ( err ) {
                const errorMessage = extractErrorMessage( err );
                if ( errorMessage ) {
                    setError( errorMessage );
                    return;
                }
                setError( "An unknown error occurred. Please try again later." );
            }
        }} >
            <Link to={"/login"} style={{alignSelf: "center"}}>
                <MuiLink>Login</MuiLink>
            </Link>
        </Auth>
    )
};
export default Signup;