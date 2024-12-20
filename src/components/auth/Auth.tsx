import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetCurrentUser } from "../../hooks/use-get-current.user";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    submitLabel: string;
    onSubmit: ( credentials: { email: string, password: string; } ) => Promise<void>;
    children?: React.ReactNode;
    error?: string;
}

const Auth = ({submitLabel, onSubmit, children, error}: AuthProps) => {

    const [email, setEmail] = useState<string>( "" );
    const [password, setPassword] = useState<string>( "" );

    const { data } = useGetCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            navigate("/");
        }
    }, [data, navigate])
    
    return (
        <Stack
            spacing={3}
            sx={{
                height: "100vh",
                maxWidth: 360,
                margin: "0 auto",
                justifyContent: "center"
            }}
        >
            <TextField
                type="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={( e ) => setEmail( e.target.value )}
                error={!!error}
                helperText={error}
            />
            <TextField
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={( e ) => setPassword( e.target.value )}
                error={!!error}
                helperText={error}
            />
            <Button variant="contained" onClick={() => onSubmit( { email, password } )}>{submitLabel}</Button>
            {children}
        </Stack>
    )
};
export default Auth;