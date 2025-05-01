import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip,
  IconButton,
  CardActionArea,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Hooks
import { useFavorites } from '../hooks/useFavorites';

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
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
  
  const handleCardClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };
  
  return (
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
      <CardActionArea onClick={handleCardClick}>
        <Typography 
          variant="caption" 
          align="right" 
          sx={{ pt: 1, pr: 2, color: 'text.secondary' }}
        >
          #{pokemon.id.toString().padStart(3, '0')}
        </Typography>
        
        <CardMedia
          component="img"
          image={imageUrl}
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
          onClick={handleFavoriteClick}
          color={favorited ? 'error' : 'default'}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PokemonCard;