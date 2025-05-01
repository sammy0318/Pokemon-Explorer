import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPokemonList, fetchPokemonDetail, fetchPokemonSpecies, fetchEvolutionChain } from '../utils/api';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  // Sorting
  const [sortBy, setSortBy] = useState('id'); // 'id', 'name', 'type'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc', 'desc'

  // Fetch all pokemon
  const fetchAllPokemon = useCallback(async () => {
    try {
      setIsLoading(true);
      const pokemonList = await fetchPokemonList(150);
      
      const pokemonDetails = await Promise.all(
        pokemonList.results.map(async (pokemon) => {
          return await fetchPokemonDetail(pokemon.url);
        })
      );
      
      // Extract all unique types
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
  }, []);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  // Filter, sort, and paginate pokemon
  useEffect(() => {
    let results = [...pokemon];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
      );
    }
    
    // Apply type filter
    if (selectedTypes.length > 0) {
      results = results.filter(p => 
        p.types.some(typeInfo => selectedTypes.includes(typeInfo.type.name))
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'id':
        default:
          comparison = a.id - b.id;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredPokemon(results);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, selectedTypes, pokemon, sortBy, sortDirection]);

  // Get current page items
  const getCurrentPageItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredPokemon]);

  // Get total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredPokemon.length / itemsPerPage);
  }, [filteredPokemon, itemsPerPage]);

  // Fetch pokemon details for detailed view
  const getPokemonDetails = useCallback(async (id) => {
    try {
      setIsLoading(true);
      
      // Get basic pokemon data
      const pokemonData = await fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`);
      
      // Get species data which includes evolution chain URL
      const speciesData = await fetchPokemonSpecies(pokemonData.species.url);
      
      // Get evolution chain
      const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);
      
      setIsLoading(false);
      return {
        ...pokemonData,
        species: speciesData,
        evolution: evolutionData
      };
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return null;
    }
  }, []);

  // Get random pokemon
  const getRandomPokemon = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * pokemon.length);
    return pokemon[randomIndex];
  }, [pokemon]);

  const value = {
    pokemon,
    filteredPokemon,
    currentPageItems: getCurrentPageItems,
    types,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    getPokemonDetails,
    getRandomPokemon
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};