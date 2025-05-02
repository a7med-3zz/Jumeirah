import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ستايل مخصص لبطاقة الميزة
const StyledFeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

// مكون بطاقة الميزة
const FeatureCard = ({ feature }) => {
  return (
    <StyledFeatureCard elevation={2}>
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
        <Box sx={{ mb: 2 }}>
          {feature.icon}
        </Box>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {feature.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {feature.description}
        </Typography>
      </CardContent>
    </StyledFeatureCard>
  );
};

export default FeatureCard;