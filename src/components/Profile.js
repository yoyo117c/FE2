import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Typography variant="body1" paragraph>
        Welcome to your profile page. Here you can view and manage your account information.
      </Typography>
      <Button component={Link} to="/order-history" variant="contained" color="primary" sx={{ mr: 2 }}>
        View Order History
      </Button>
      <Button component={Link} to="/" variant="outlined" color="primary">
        Continue Shopping
      </Button>
    </Box>
  );
}

export default Profile;