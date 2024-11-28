import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';
import Branding from './Branding';
import MobileNavigation from './mobile/mobile.navigation';
import MobileBranding from './mobile/mobile.branding';
import Navigation from './Navigation';
import Settings from './Settings';
import { useReactiveVar } from '@apollo/client';
import { authenticatedVars } from '../../constants/autenticated';
import { Page } from '../../interfaces/page.interface';

const pages: Page[] = [
  { name: 'Home', path: '/' },
];

const unauthenticatedPages: Page[] = [
  { name: 'Login', path: '/login' },
  { name: 'Signup', path: '/signup' }
];

const Header = () => {
    
  const authenticated = useReactiveVar( authenticatedVars );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Branding />
        <MobileNavigation pages={authenticated ? pages : unauthenticatedPages} />        
        <MobileBranding />
        <Navigation pages={authenticated ? pages : unauthenticatedPages} />
        {authenticated && <Settings />}    
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
