import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

function Header() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold', 
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            Pokémon Explorer
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/favorites"
              startIcon={<FavoriteIcon />}
            >
              Favorites
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/compare"
              startIcon={<CompareArrowsIcon />}
            >
              Compare
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;