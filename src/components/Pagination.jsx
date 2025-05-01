import React from 'react';
import { 
  Box, 
  Pagination as MuiPagination, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

function Pagination({ 
  currentPage, 
  setCurrentPage, 
  totalPages, 
  itemsPerPage, 
  setItemsPerPage 
}) {
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
      mb: 2 
    }}>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="items-per-page-label">Items per page</InputLabel>
        <Select
          labelId="items-per-page-label"
          id="items-per-page"
          value={itemsPerPage}
          label="Items per page"
          onChange={handleItemsPerPageChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      
      <MuiPagination 
        count={totalPages} 
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
}

export default Pagination;