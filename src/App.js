import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import ErrorMessage from './components/ErrorMessage'; // Add this import
import { updateCartItem, removeCartItem, getCartCount, checkout } from './services/api';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981',
    },
    secondary: {
      main: '#6366f1',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
});

function App() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const { cart_count } = await getCartCount();
      setCartCount(cart_count);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
      setErrorMessage(error.message);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      console.log('Adding to cart:', product, quantity);
      const productId = product.ProductID || product.id || product.productId;
      console.log('Extracted productId:', productId);
      if (!productId) {
        console.error('Product object:', JSON.stringify(product, null, 2));
        throw new Error('Invalid product ID');
      }
      const response = await updateCartItem(productId, quantity);
      console.log('Update cart response:', response);
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product.ProductID === productId);
        if (existingItem) {
          return prevCart.map(item =>
            item.product.ProductID === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { product, quantity }];
        }
      });
      setCartCount(response.cart_count);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setErrorMessage(`Failed to add item to cart: ${error.message}`);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await removeCartItem(productId);
      setCart(prevCart => prevCart.filter(item => item.product.ProductID !== productId));
      setCartCount(response.cart_count);
    } catch (error) {
      console.error('Failed to remove item from cart:', error.message);
      // You might want to show an error message to the user here
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await updateCartItem(productId, newQuantity);
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.ProductID === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      setCartCount(response.cart_count);
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      // Assuming the API doesn't have a clear cart endpoint, we'll remove each item
      await Promise.all(cart.map(item => removeCartItem(item.product.ProductID)));
      setCart([]);
      fetchCartCount();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await checkout();
      setCart([]);
      setCartCount(0);
      // You might want to show a success message with the total
      console.log(`Checkout successful. Total: $${response.total}`);
    } catch (error) {
      console.error('Checkout failed:', error.message);
      // You might want to show an error message to the user here
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header cartItemCount={cartCount} />
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} onCheckout={handleCheckout} />} />
        </Routes>
      </Router>
      <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
    </ThemeProvider>
  );
}

export default App;