import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";

export const Signup = () => {
    return (
        <Auth submitLabel={"Signup"} onSubmit={async () => { }} >
            <Link to={"/login"} style={{alignSelf: "center"}}>
                <MuiLink>Login</MuiLink>
            </Link>
        </Auth>
    )
};
export default Signup;