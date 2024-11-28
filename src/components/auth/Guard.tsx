import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded.routes";
import { useGetCurrentUser } from "../../hooks/use-get-current.user";
import { authenticatedVars } from "../../constants/autenticated";

interface GuardProps {
    children: JSX.Element
}

export const Guard = ({children}: GuardProps) => {
    const { data: user } = useGetCurrentUser();
    
    useEffect(() => {
        if ( user) {
            authenticatedVars(true);
        }
    }, [user])
    
    return (
        <>
            {
                excludedRoutes.includes( window.location.pathname ) ? children : user && children
            }
        </>
    );
}