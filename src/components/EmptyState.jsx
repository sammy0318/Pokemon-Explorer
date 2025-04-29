import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

function EmptyState({ searchTerm, selectedType }) {
  let message = 'No Pokémon found.';
  
  if (searchTerm && selectedType) {
    message = `No Pokémon match "${searchTerm}" with type "${selectedType}".`;
  } else if (searchTerm) {
    message = `No Pokémon match "${searchTerm}".`;
  } else if (selectedType) {
    message = `No Pokémon with type "${selectedType}" found.`;
  }
  
  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center' 
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" gutterBottom fontWeight="medium">
        No Pokémon Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {message}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Try adjusting your search or filter criteria.
      </Typography>
    </Paper>
  );
}

export default EmptyState;