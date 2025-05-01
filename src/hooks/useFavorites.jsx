import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

/**
 * Custom hook for accessing favorites data and functions
 * @returns {Object} Favorites context values and functions
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};