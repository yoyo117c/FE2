import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Button, IconButton, CircularProgress, Rating } from '@mui/material';
import { Add, Remove, ArrowBack, ShoppingCart } from '@mui/icons-material';

const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Under_a_roof.jpg/800px-Under_a_roof.jpg';

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const foundProduct = data.find(p => p.ProductID?.toString() === id || p.id?.toString() === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Set dummy product if not found
          setProduct({
            ProductID: id,
            Name: 'Dummy Product',
            ListPrice: 99.99,
            Description: 'This is a dummy product description.',
            Rating: 4,
            ThumbNailPhoto: placeholderImage
          });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError(`Failed to load product. Error: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    console.log('Adding to cart from ProductDetails:', JSON.stringify(product, null, 2), quantity);
    addToCart(product, quantity);
    setQuantity(1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '20px auto' }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to Products
      </Button>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.ThumbNailPhoto || placeholderImage}
          alt={product.Name || 'Product'}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.Name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ${product.ListPrice?.toFixed(2) || 'N/A'}
          </Typography>
          <Rating name="read-only" value={product.Rating || 0} readOnly />
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {product.Description || 'No description available.'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Remove />
            </IconButton>
            <Typography sx={{ margin: '0 10px' }}>{quantity}</Typography>
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <Add />
            </IconButton>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginLeft: 2 }} 
              onClick={handleAddToCart}
              startIcon={<ShoppingCart />}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductDetails;