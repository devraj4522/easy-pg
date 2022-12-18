import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export const Bottom = () => {
  return (
    <CardContent
      sx={{
        background: '#171026',
        color: '#fff',
        textAlign: 'center',
        bottom: 0,
      }}
    >
      <Typography varient="body1">
        Built with ❤️ for Envisage Hackathon
      </Typography>
    </CardContent>
  );
};
