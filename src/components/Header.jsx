import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" color="error" sx={{ mb: 4 }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 'bold', py: 2 }}
          >
            Pokémon Explorer
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;