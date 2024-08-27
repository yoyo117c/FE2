import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';

const supplyChainSteps = [
  { step: 1, description: 'Raw material sourcing' },
  { step: 2, description: 'Manufacturing' },
  { step: 3, description: 'Quality control' },
  { step: 4, description: 'Packaging' },
  { step: 5, description: 'Distribution' },
];

function SupplyChain() {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Supply Chain Tracking</Typography>
      {supplyChainSteps.map((step) => (
        <Card key={step.step} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Step {step.step}</Typography>
            <Typography variant="body1">{step.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default SupplyChain;