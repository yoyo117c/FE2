import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart, updateQuantity, clearCart }) {
  const total = cart.reduce((sum, item) => sum + (item.product.ListPrice || item.product.Price) * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.product.ProductID} sx={{ border: '1px solid #ddd', mb: 2, borderRadius: 2 }}>
                <ListItemText
                  primary={item.product.Name}
                  secondary={`$${item.product.ListPrice || item.product.Price} x ${item.quantity}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => updateQuantity(item.product.ProductID, Math.max(1, item.quantity - 1))}>
                    <Remove />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item.product.ProductID, item.quantity + 1)}>
                    <Add />
                  </IconButton>
                  <IconButton onClick={() => removeFromCart(item.product.ProductID)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" align="right" gutterBottom>
            Total: ${total.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={clearCart} variant="outlined" color="error">
              Clear Cart
            </Button>
            <Button component={Link} to="/checkout" variant="contained" color="primary" startIcon={<ShoppingCart />}>
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Cart;