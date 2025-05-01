import React from 'react';
import { 
  Paper, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  Box, 
  Chip,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  selectedTypes, 
  setSelectedTypes, 
  types,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection
}) {
  const handleSortDirectionToggle = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="search"
            label="Search Pokémon"
            variant="outlined"
            placeholder="Enter Pokémon name or ID..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            id="type-filter"
            options={types}
            getOptionLabel={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
            value={selectedTypes}
            onChange={(event, newValue) => {
              setSelectedTypes(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Types"
                placeholder="Select types..."
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort By</FormLabel>
              <RadioGroup
                row
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <FormControlLabel value="id" control={<Radio />} label="ID" />
                <FormControlLabel value="name" control={<Radio />} label="Name" />
              </RadioGroup>
            </FormControl>
            
            <IconButton 
              aria-label="Toggle sort direction"
              onClick={handleSortDirectionToggle}
              color="primary"
            >
              {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SearchFilter;