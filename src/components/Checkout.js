import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, onCheckout }) {
  const navigate = useNavigate();
  const [checkoutMessage, setCheckoutMessage] = useState('');

  // Calculate the total
  const total = cart.reduce((sum, item) => sum + (item.product.ListPrice || item.product.Price) * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await onCheckout();
      setCheckoutMessage(`Checkout successful. Total: $${response.total}`);
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setCheckoutMessage(`Checkout failed: ${error.message}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      {cart.map((item) => (
        <Typography key={item.product.ProductID}>
          {item.product.Name} - ${item.product.ListPrice || item.product.Price} x {item.quantity}
        </Typography>
      ))}
      <Typography variant="h6" align="right" gutterBottom>
        Total: ${total.toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCheckout} fullWidth>
        Complete Purchase
      </Button>
      {checkoutMessage && (
        <Typography color={checkoutMessage.includes('successful') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {checkoutMessage}
        </Typography>
      )}
    </Box>
  );
}

export default Checkout;