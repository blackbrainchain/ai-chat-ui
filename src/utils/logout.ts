import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVars } from "../constants/autenticated";

export const onLogout = () => {
    authenticatedVars( false );
    router.navigate( "/login" );
    client.resetStore();
}