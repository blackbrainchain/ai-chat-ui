import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routes';

const darkMode = createTheme( {
  palette: {
    mode: 'dark',
  },
} );

const App = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
