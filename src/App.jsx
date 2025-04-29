import React, { useState, useEffect } from 'react';
import { Container, Grid, CssBaseline, Box, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// importing all necessariy Components
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import PokemonCard from './components/PokemonCard';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2a75bb', 
    },
    error: {
      main: '#ff0000', 
    },
  },
});

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Failed to fetch Pokémon');
        
        const data = await response.json();
        
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );
        
        
        const allTypes = new Set();
        pokemonDetails.forEach(pokemon => {
          pokemon.types.forEach(typeInfo => {
            allTypes.add(typeInfo.type.name);
          });
        });
        
        setTypes(Array.from(allTypes).sort());
        setPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  
  useEffect(() => {
    let results = pokemon;
    
    if (searchTerm) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType) {
      results = results.filter(p => 
        p.types.some(typeInfo => typeInfo.type.name === selectedType)
      );
    }
    
    setFilteredPokemon(results);
  }, [searchTerm, selectedType, pokemon]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Header />
        
        <Container maxWidth="lg" sx={{ flex: '1', py: 2 }}>
          {error ? (
            <Alert 
              severity="error" 
              sx={{ mb: 4 }}
              action={
                <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              }
            >
              {error}
            </Alert>
          ) : (
            <>
              <SearchFilter 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                types={types}
              />
              
              {isLoading ? (
                <LoadingState />
              ) : filteredPokemon.length === 0 ? (
                <EmptyState searchTerm={searchTerm} selectedType={selectedType} />
              ) : (
                <Grid container spacing={3}>
                  {filteredPokemon.map(pokemon => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                      <PokemonCard pokemon={pokemon} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;