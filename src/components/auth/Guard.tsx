import excludedRoutes from "../../constants/excluded.routes";
import { useGetCurrentUser } from "../../hooks/use-get-current.user";

interface GuardProps {
    children: JSX.Element
}

export const Guard = ({children}: GuardProps) => {
    const { data: user } = useGetCurrentUser();
    console.log(user);
    
    return (
        <>
            {
                excludedRoutes.includes( window.location.pathname ) ? children : user && children
            }
        </>
    );
}