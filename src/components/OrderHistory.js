import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const mockOrders = [
  { id: 1, date: '2023-05-01', total: 199.99, status: 'Delivered' },
  { id: 2, date: '2023-05-15', total: 299.99, status: 'Processing' },
];

function OrderHistory() {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Order History</Typography>
      <List>
        {mockOrders.map((order) => (
          <ListItem key={order.id} divider>
            <ListItemText
              primary={`Order #${order.id}`}
              secondary={`Date: ${order.date} | Total: $${order.total} | Status: ${order.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default OrderHistory;