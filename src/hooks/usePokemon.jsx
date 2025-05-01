import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

/**
 * Custom hook for accessing Pokemon data and functions
 * @returns {Object} Pokemon context values and functions
 */
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  
  return context;
};