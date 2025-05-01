import React from 'react';
import { 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Chip, 
  IconButton, 
  CardActions,
  CardActionArea,
  Alert,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

// Hooks
import { useFavorites } from '../hooks/useFavorites';

function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  
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
  
  const handleCardClick = (id) => {
    navigate(`/pokemon/${id}`);
  };
  
  const handleRemoveFavorite = (e, id) => {
    e.stopPropagation();
    removeFavorite(id);
  };
  
  if (favorites.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Favorites
        </Typography>
        
        <Paper sx={{ p: 4, mt: 4, maxWidth: 500, mx: 'auto' }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            You haven't added any Pokémon to your favorites yet.
          </Alert>
          
          <Typography variant="body1" gutterBottom>
            Explore the Pokémon list and click the heart icon to add Pokémon to your favorites.
          </Typography>
        </Paper>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Pokémon
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {favorites.map((pokemon) => {
          const mainType = pokemon.types[0].type.name;
          const cardColor = typeColors[mainType] || typeColors.default;
          
          return (
            <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  },
                  borderTop: `4px solid ${cardColor}`
                }}
              >
                <CardActionArea onClick={() => handleCardClick(pokemon.id)}>
                  <Typography 
                    variant="caption" 
                    align="right" 
                    sx={{ pt: 1, pr: 2, color: 'text.secondary' }}
                  >
                    #{pokemon.id.toString().padStart(3, '0')}
                  </Typography>
                  
                  <CardMedia
                    component="img"
                    image={pokemon.image}
                    alt={pokemon.name}
                    sx={{
                      width: 'auto',
                      height: 130,
                      margin: '0 auto',
                      objectFit: 'contain'
                    }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h2" 
                      align="center"
                      sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}
                    >
                      {pokemon.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                      {pokemon.types.map((typeInfo) => (
                        <Chip
                          key={typeInfo.type.name}
                          label={typeInfo.type.name.toUpperCase()}
                          size="small"
                          sx={{ 
                            backgroundColor: typeColors[typeInfo.type.name] || typeColors.default,
                            color: 'black',
                            fontWeight: 'bold'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
                
                <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                  <IconButton 
                    onClick={(e) => handleRemoveFavorite(e, pokemon.id)}
                    color="error"
                    aria-label="Remove from favorites"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default FavoritesList;