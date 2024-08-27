import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Header({ cartItemCount }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Adventure World
        </Typography>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton color="inherit" component={Link} to="/profile">
          <Person />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;