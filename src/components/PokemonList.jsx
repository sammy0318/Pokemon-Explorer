import React, { useState } from 'react';
import { 
  Grid, 
  Box, 
  Alert, 
  Button, 
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CasinoIcon from '@mui/icons-material/Casino';

// Components
import SearchFilter from './SearchFilter';
import PokemonCard from './PokemonCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

// Hooks
import { usePokemon } from '../hooks/usePokemon';

function PokemonList() {
  const navigate = useNavigate();
  const { 
    currentPageItems,
    isLoading, 
    error,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    types,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    getRandomPokemon
  } = usePokemon();

  const handleRandomPokemon = () => {
    const randomPokemon = getRandomPokemon();
    if (randomPokemon) {
      navigate(`/pokemon/${randomPokemon.id}`);
    }
  };

  return (
    <>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <h1>Pokémon Explorer</h1>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<CasinoIcon />}
              onClick={handleRandomPokemon}
            >
              Random Pokémon
            </Button>
          </Box>

          <SearchFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            types={types}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
          
          <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          
          {isLoading ? (
            <LoadingState />
          ) : currentPageItems.length === 0 ? (
            <EmptyState searchTerm={searchTerm} selectedTypes={selectedTypes} />
          ) : (
            <Grid container spacing={3}>
              {currentPageItems.map(pokemon => (
                <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ mt: 3 }}>
            <Pagination 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </Box>
        </>
      )}
    </>
  );
}

export default PokemonList;