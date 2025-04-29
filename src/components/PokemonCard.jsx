import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip
} from '@mui/material';

function PokemonCard({ pokemon }) {
 
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
    </Card>
  );
}

export default PokemonCard;