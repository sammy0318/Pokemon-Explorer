import React from 'react';
import { 
  Paper, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  Box 
} from '@mui/material';

function SearchFilter({ searchTerm, setSearchTerm, selectedType, setSelectedType, types }) {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="search"
            label="Search Pokémon"
            variant="outlined"
            placeholder="Enter Pokémon name..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="type-select-label">Filter by Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={selectedType}
              label="Filter by Type"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="">
                <em>All Types</em>
              </MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SearchFilter;