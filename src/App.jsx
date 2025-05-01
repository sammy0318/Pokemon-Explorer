import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import FavoritesList from './components/FavoritesList';
import ComparisonTool from './components/ComparisonTool';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2a75bb',
    },
    secondary: {
      main: '#ffcb05',
    },
    error: {
      main: '#ff0000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
          <Header />
          <Container maxWidth="lg" sx={{ flex: '1', py: 2 }}>
            <Routes>
              <Route path="/" element={<PokemonList />} />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
              <Route path="/favorites" element={<FavoritesList />} />
              <Route path="/compare" element={<ComparisonTool />} />
            </Routes>
          </Container>
        </Box>
    </ThemeProvider>
  );
}

export default App;
