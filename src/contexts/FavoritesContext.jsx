import React, { createContext, useState, useEffect, useCallback } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = localStorage.getItem('pokemonFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add pokemon to favorites
  const addFavorite = useCallback((pokemon) => {
    setFavorites(prev => {
      // Check if already in favorites
      if (prev.some(fav => fav.id === pokemon.id)) {
        return prev;
      }
      // Add to favorites
      return [...prev, {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
        types: pokemon.types
      }];
    });
  }, []);

  // Remove pokemon from favorites
  const removeFavorite = useCallback((pokemonId) => {
    setFavorites(prev => prev.filter(pokemon => pokemon.id !== pokemonId));
  }, []);

  // Check if pokemon is in favorites
  const isFavorite = useCallback((pokemonId) => {
    return favorites.some(pokemon => pokemon.id === pokemonId);
  }, [favorites]);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};