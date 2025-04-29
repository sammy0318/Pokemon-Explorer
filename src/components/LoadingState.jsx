import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingState() {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <CircularProgress size={60} sx={{ mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Loading Pokémon data...
      </Typography>
    </Box>
  );
}

export default LoadingState;