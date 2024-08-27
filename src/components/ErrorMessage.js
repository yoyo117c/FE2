import React from 'react';
import { Alert, Snackbar } from '@mui/material';

function ErrorMessage({ message, onClose }) {
  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ErrorMessage;