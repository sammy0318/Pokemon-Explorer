// API utility functions for fetching Pokemon data

/**
 * Fetch list of Pokemon
 * @param {number} limit - Number of Pokemon to fetch
 * @param {number} offset - Offset for pagination
 * @returns {Promise<Object>} Pokemon list data
 */
export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

/**
 * Fetch detailed Pokemon data by URL or ID
 * @param {string|number} idOrUrl - Pokemon ID or URL
 * @returns {Promise<Object>} Detailed Pokemon data
 */
export const fetchPokemonDetail = async (idOrUrl) => {
  try {
    const url = typeof idOrUrl === 'string' && idOrUrl.startsWith('http') 
      ? idOrUrl 
      : `https://pokeapi.co/api/v2/pokemon/${idOrUrl}`;
      
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon details: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    throw error;
  }
};

/**
 * Fetch Pokemon species data
 * @param {string} url - Species URL
 * @returns {Promise<Object>} Species data
 */
export const fetchPokemonSpecies = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon species:', error);
    throw error;
  }
};

/**
 * Fetch evolution chain data
 * @param {string} url - Evolution chain URL
 * @returns {Promise<Object>} Evolution chain data
 */
export const fetchEvolutionChain = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch evolution chain: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    throw error;
  }
};