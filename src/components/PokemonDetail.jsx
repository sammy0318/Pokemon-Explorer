import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Chip, 
  LinearProgress, 
  IconButton, 
  Button, 
  Container, 
  Tabs, 
  Tab, 
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Hooks
import { usePokemon } from '../hooks/usePokemon';
import { useFavorites } from '../hooks/useFavorites';

// Components
import LoadingState from './LoadingState';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPokemonDetails, isLoading, error } = usePokemon();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const [pokemon, setPokemon] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getPokemonDetails(id);
      setPokemon(details);
    };
    
    fetchDetails();
  }, [id, getPokemonDetails]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleFavoriteClick = () => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };
  
  if (isLoading || !pokemon) {
    return <LoadingState />;
  }
  
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Error loading Pokémon details
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />} 
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </Box>
    );
  }
  
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.front_default;
  
  const mainType = pokemon.types[0].type.name;
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    default: '#68A090'
  };
  
  const cardColor = typeColors[mainType] || typeColors.default;
  const favorited = isFavorite(pokemon.id);
  
  // Get English flavor text
  let flavorText = '';
  if (pokemon.species && pokemon.species.flavor_text_entries) {
    const englishEntry = pokemon.species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    flavorText = englishEntry ? englishEntry.flavor_text : '';
  }
  
  // Process evolution chain
  const processEvolutionChain = (chain) => {
    const evolutions = [];
    
    const extractEvolutionData = (evolutionData) => {
      const speciesName = evolutionData.species.name;
      const speciesUrl = evolutionData.species.url;
      const id = speciesUrl.split('/').filter(Boolean).pop();
      
      evolutions.push({
        name: speciesName,
        id
      });
      
      if (evolutionData.evolves_to.length) {
        evolutionData.evolves_to.forEach(evolution => {
          extractEvolutionData(evolution);
        });
      }
    };
    
    if (chain) {
      extractEvolutionData(chain);
    }
    
    return evolutions;
  };
  
  const evolutions = pokemon.evolution ? processEvolutionChain(pokemon.evolution.chain) : [];
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Back to List
        </Button>
        
        <Card sx={{ 
          borderTop: `6px solid ${cardColor}`,
          boxShadow: 3
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            p: 2
          }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            >
              {pokemon.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6">
                #{pokemon.id.toString().padStart(3, '0')}
              </Typography>
              
              <IconButton 
                onClick={handleFavoriteClick}
                color={favorited ? 'error' : 'default'}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Box>
          
          <Grid container spacing={0}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3 }}>
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt={pokemon.name}
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'contain'
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                  {pokemon.types.map((typeInfo) => (
                    <Chip
                      key={typeInfo.type.name}
                      label={typeInfo.type.name.toUpperCase()}
                      sx={{ 
                        backgroundColor: typeColors[typeInfo.type.name] || typeColors.default,
                        color: 'black',
                        fontWeight: 'bold',
                        px: 1
                      }}
                    />
                  ))}
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                    {flavorText}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Height</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {pokemon.height / 10} m
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Weight</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {pokemon.weight / 10} kg
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box sx={{ width: '100%' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Stats" />
                  <Tab label="Abilities" />
                  <Tab label="Moves" />
                  <Tab label="Evolution" />
                </Tabs>
                
                <Box sx={{ p: 3 }}>
                  {tabValue === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>Base Stats</Typography>
                      
                      {pokemon.stats.map((stat) => {
                        const statName = stat.stat.name
                          .replace('-', ' ')
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ');
                          
                        const statValue = stat.base_stat;
                        const statColor = statValue > 80 ? '#78C850' : statValue > 50 ? '#6890F0' : '#F08030';
                            
                        return (
                          <Box key={stat.stat.name} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>{statName}</Typography>
                              <Typography sx={{ fontWeight: 'bold' }}>{statValue}</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min(100, (statValue / 255) * 100)} 
                              sx={{ 
                                height: 10, 
                                borderRadius: 1,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: statColor
                                }
                              }}
                            />
                          </Box>
                        );
                      })}
                      
                      <Box sx={{ textAlign: 'right', mt: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Total: {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  
                  {tabValue === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>Abilities</Typography>
                      
                      <List>
                        {pokemon.abilities.map((ability) => (
                          <ListItem key={ability.ability.name} disablePadding sx={{ py: 1 }}>
                            <ListItemText 
                              primary={ability.ability.name.replace('-', ' ').split(' ').map(
                                word => word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                              secondary={ability.is_hidden ? 'Hidden Ability' : null}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  {tabValue === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>Moves</Typography>
                      
                      <Grid container spacing={1}>
                        {pokemon.moves.slice(0, 30).map((move) => (
                          <Grid item key={move.move.name} xs={6} sm={4} md={3}>
                            <Chip 
                              label={move.move.name.replace('-', ' ').split(' ').map(
                                word => word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                              sx={{ mb: 1 }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                      
                      {pokemon.moves.length > 30 && (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                          + {pokemon.moves.length - 30} more moves
                        </Typography>
                      )}
                    </Box>
                  )}
                  
                  {tabValue === 3 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>Evolution Chain</Typography>
                      
                      {evolutions.length > 0 ? (
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          flexWrap: 'wrap',
                          gap: 2 
                        }}>
                          {evolutions.map((evolution, index) => (
                            <React.Fragment key={evolution.id}>
                              <Paper 
                                elevation={3} 
                                sx={{ 
                                  p: 2, 
                                  textAlign: 'center',
                                  backgroundColor: evolution.id === id ? '#e3f2fd' : 'white',
                                  cursor: 'pointer'
                                }}
                                onClick={() => navigate(`/pokemon/${evolution.id}`)}
                              >
                                <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                                  {evolution.name}
                                </Typography>
                                <Typography variant="caption">
                                  #{evolution.id.padStart(3, '0')}
                                </Typography>
                              </Paper>
                              
                              {index < evolutions.length - 1 && (
                                <Typography variant="h5" color="text.secondary">→</Typography>
                              )}
                            </React.Fragment>
                          ))}
                        </Box>
                      ) : (
                        <Typography>No evolution data available</Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
}

export default PokemonDetail;