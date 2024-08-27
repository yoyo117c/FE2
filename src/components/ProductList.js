import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Box, CircularProgress, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';

const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Under_a_roof.jpg/800px-Under_a_roof.jpg';

function ProductList({ addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching products...');
    fetch('/api/products')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Parsed data:', data);
        const productsArray = Array.isArray(data) ? data : data.products || [];
        console.log('Products array:', productsArray);
        setProducts(productsArray.map(product => {
          console.log('Processing product:', product);
          return {
            ...product,
            quantity: 0
          };
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(`Failed to load products. Error: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (index, change) => {
    setProducts(prevProducts => prevProducts.map((product, i) => 
      i === index ? { ...product, quantity: Math.max(0, product.quantity + change) } : product
    ));
  };

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      console.log('Attempting to add product to cart:', JSON.stringify(product, null, 2));
      addToCart(product, product.quantity)
        .then(() => {
          console.log('Product added to cart successfully');
          setProducts(prevProducts => prevProducts.map(p => 
            p.ProductID === product.ProductID ? { ...p, quantity: 0 } : p
          ));
        })
        .catch(error => {
          console.error('Error adding product to cart:', error);
        });
    }
  };

  console.log('Rendering ProductList. Products:', products, 'Loading:', loading, 'Error:', error);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error Loading Products
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          No Products Available
        </Typography>
        <Typography>There are currently no products to display.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', maxWidth: '100%', overflowX: 'hidden' }}>
      <TextField
        fullWidth
        label="Search products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.ProductID || product.id || index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.ThumbNailPhoto || placeholderImage}
                alt={product.Name || 'Product'}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Name || product.name || 'Unnamed Product'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.ListPrice !== undefined ? `$${product.ListPrice.toFixed(2)}` :
                   product.Price !== undefined ? `$${product.Price.toFixed(2)}` :
                   product.price !== undefined ? `$${product.price.toFixed(2)}` :
                   'Price not available'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <IconButton onClick={() => handleQuantityChange(index, -1)}>
                    <Remove />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{product.quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange(index, 1)}>
                    <Add />
                  </IconButton>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ ml: 2 }}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                    startIcon={<ShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                </Box>
                <Button 
                  component={Link} 
                  to={`/product/${product.ProductID || product.id || product.productId}`} 
                  variant="outlined" 
                  color="primary" 
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;