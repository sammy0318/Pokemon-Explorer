import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Autocomplete, 
  TextField, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  LinearProgress,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// Hooks
import { usePokemon } from '../hooks/usePokemon';

function ComparisonTool() {
  const { pokemon, isLoading } = usePokemon();
  
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  
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
  
  const handleRandomComparison = () => {
    // Get two random pokemon, ensuring they're different
    const randomIndexes = [];
    while (randomIndexes.length < 2) {
      const index = Math.floor(Math.random() * pokemon.length);
      if (!randomIndexes.includes(index)) {
        randomIndexes.push(index);
      }
    }
    
    setPokemon1(pokemon[randomIndexes[0]]);
    setPokemon2(pokemon[randomIndexes[1]]);
  };
  
  // Calculate the stat difference and which pokemon is stronger in each stat
  const getStatComparison = (stat1, stat2) => {
    const diff = stat1 - stat2;
    if (diff > 0) return { winner: 1, diff };
    if (diff < 0) return { winner: 2, diff: Math.abs(diff) };
    return { winner: 0, diff: 0 }; // Tie
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Pokémon Comparison Tool
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Autocomplete
              options={pokemon || []}
              getOptionLabel={(option) => `${option.name} (#${option.id})`}
              value={pokemon1}
              onChange={(event, newValue) => {
                setPokemon1(newValue);
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {option.name} (#{option.id})
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Select first Pokémon" 
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
            />
          </Grid>
          
          <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CompareArrowsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Autocomplete
              options={pokemon || []}
              getOptionLabel={(option) => `${option.name} (#${option.id})`}
              value={pokemon2}
              onChange={(event, newValue) => {
                setPokemon2(newValue);
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {option.name} (#{option.id})
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Select second Pokémon" 
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleRandomComparison}
            disabled={isLoading || !pokemon || pokemon.length < 2}
          >
            Random Comparison
          </Button>
        </Box>
      </Paper>
      
      {isLoading && (
        <Box sx={{ width: '100%', mb: 4 }}>
          <LinearProgress />
        </Box>
      )}
      
      {pokemon1 && pokemon2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Comparison Results
          </Typography>
          
          <Grid container spacing={4}>
            {/* Pokemon Cards */}
            <Grid item xs={12} md={6} lg={5}>
              <PokemonCard pokemon={pokemon1} typeColors={typeColors} />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <PokemonCard pokemon={pokemon2} typeColors={typeColors} />
            </Grid>
            
            {/* Stats Comparison */}
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Stats Difference
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <StatsComparison 
                  pokemon1={pokemon1} 
                  pokemon2={pokemon2} 
                  getStatComparison={getStatComparison} 
                />
              </Paper>
            </Grid>
          </Grid>
          
          {/* Type Effectiveness Comparison */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TypeEffectiveness pokemon={pokemon1} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypeEffectiveness pokemon={pokemon2} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

// Pokemon Card Component
function PokemonCard({ pokemon, typeColors }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={pokemon.name}
        sx={{ objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ textTransform: 'capitalize' }}>
          {pokemon.name} <Typography component="span" color="text.secondary">#{pokemon.id}</Typography>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {pokemon.types.map((type) => (
            <Chip 
              key={type}
              label={type} 
              sx={{ 
                bgcolor: typeColors[type] || typeColors.default,
                color: '#fff',
                textTransform: 'capitalize'
              }} 
            />
          ))}
        </Box>
        
        <Typography variant="subtitle1" gutterBottom>Base Stats</Typography>
        
        <Grid container spacing={1}>
          {Object.entries(pokemon.stats).map(([stat, value]) => (
            <Grid item xs={12} key={stat}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textTransform: 'capitalize', 
                    minWidth: 80 
                  }}
                >
                  {stat}:
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(value / 255) * 100}
                  sx={{ 
                    flexGrow: 1, 
                    height: 10, 
                    borderRadius: 5 
                  }}
                />
                <Typography variant="body2" sx={{ minWidth: 30 }}>
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

// Stats Comparison Component
function StatsComparison({ pokemon1, pokemon2, getStatComparison }) {
  const stats = Object.keys(pokemon1.stats);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {stats.map(stat => {
        const stat1 = pokemon1.stats[stat];
        const stat2 = pokemon2.stats[stat];
        const comparison = getStatComparison(stat1, stat2);
        
        let color = 'text.secondary';
        if (comparison.winner === 1) color = 'success.main';
        if (comparison.winner === 2) color = 'error.main';
        
        return (
          <Box key={stat} sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            >
              {stat}
            </Typography>
            
            <Typography variant="body1" color={color}>
              {comparison.winner === 0 && 'Tie!'}
              {comparison.winner === 1 && `+${comparison.diff} for ${pokemon1.name}`}
              {comparison.winner === 2 && `+${comparison.diff} for ${pokemon2.name}`}
            </Typography>
          </Box>
        );
      })}
      
      <Divider sx={{ my: 1 }} />
      
      <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Total Stats
      </Typography>
      
      {(() => {
        const total1 = Object.values(pokemon1.stats).reduce((a, b) => a + b, 0);
        const total2 = Object.values(pokemon2.stats).reduce((a, b) => a + b, 0);
        const comparison = getStatComparison(total1, total2);
        
        let color = 'text.secondary';
        if (comparison.winner === 1) color = 'success.main';
        if (comparison.winner === 2) color = 'error.main';
        
        return (
          <Typography variant="body1" color={color} sx={{ textAlign: 'center' }}>
            {comparison.winner === 0 && 'Tie!'}
            {comparison.winner === 1 && `${pokemon1.name} wins by ${comparison.diff}`}
            {comparison.winner === 2 && `${pokemon2.name} wins by ${comparison.diff}`}
          </Typography>
        );
      })()}
    </Box>
  );
}

// Type Effectiveness Component
function TypeEffectiveness({ pokemon }) {
  // This would require type effectiveness data
  // In a real app, you would fetch this from an API or import from a data file
  
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {pokemon.name}'s Type Effectiveness
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="body2" color="text.secondary">
        Type effectiveness data would be displayed here. This would show which types
        the Pokémon is strong against and which it is weak to based on its type(s).
      </Typography>
    </Paper>
  );
}

export default ComparisonTool;