import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded.routes";
import { useGetCurrentUser } from "../../hooks/use-get-current.user";
import { authenticatedVars } from "../../constants/autenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/use-patth";

interface GuardProps {
    children: JSX.Element
}

export const Guard = ({children}: GuardProps) => {
    const { data: user, error } = useGetCurrentUser();

    const { path } = usePath();
    
    useEffect( () => {
        if ( user ) {
            authenticatedVars( true );
        }
    }, [user] );

    useEffect( () => {
        if ( error?.networkError ) {
            snackVar( UNKNOWN_ERROR_SNACK_MESSAGE );
        }
    }, [error] );
    
    return (
        <>
            {
                excludedRoutes.includes( path ) ? children : user && children
            }
        </>
    );
}