const API_BASE_URL = '/api';

export const updateCartItem = async (productId, quantity) => {
  try {
    console.log(`Updating cart item: productId=${productId}, quantity=${quantity}`);
    const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    console.log('Update cart item response:', response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update cart item. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    throw error;
  }
};

export const removeCartItem = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to remove cart item');
  }
  return response.json();
};

export const getCartCount = async () => {
  const response = await fetch(`${API_BASE_URL}/cart/count`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get cart count');
  }
  return response.json();
};

export const checkout = async () => {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: 'POST',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Checkout failed');
  }
  return response.json();
};