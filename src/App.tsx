import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routes';
import { ApolloProvider } from '@apollo/client';
import client from './constants/apollo-client';
import { Guard } from './components/auth/Guard';
import Header from './components/header/Header';
import Snackbar from './components/snackbar/Snackbar';
import ChatList from './components/chat-list/ChatList';
import { usePath } from './hooks/use-patth';

const darkMode = createTheme( {
  palette: {
    mode: 'dark',
  },
} );

const App = () => {

  const { path } = usePath();
  console.log( path );
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkMode}>
        <CssBaseline />
        <Header />
        <Guard>
          { path === '/' ? (
            <Grid container spacing={2}>
            <Grid item md={3}>
              <ChatList />
            </Grid>
            <Grid item md={9}>
              <Routes />
            </Grid>            
          </Grid>
           ) : (
            <Routes />  
          )}          
        </Guard>          
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return (
    <Container>              
      <RouterProvider router={router} />              
    </Container>
  );
};

export default App;
