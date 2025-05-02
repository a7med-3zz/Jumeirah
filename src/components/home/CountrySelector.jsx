import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ستايل مخصص لبطاقة الدولة
const CountryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

// مكون اختيار الدولة
const CountrySelector = ({ countries }) => {
  const navigate = useNavigate();

  // التوجه إلى صفحة الكورسات مع تحديد الدولة
  const handleCountrySelect = (countryCode) => {
    navigate(`/courses?country=${countryCode}`);
  };

  // استخدام صور أعلام وهمية في حالة عدم وجود الصور الحقيقية
  const getFlagPlaceholder = (countryCode) => {
    const colors = {
      egypt: '#E41C1C',
      uae: '#00732F',
      kuwait: '#00732F'
    };
    
    return (
      <Box
        sx={{
          height: 140,
          backgroundColor: colors[countryCode] || 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" color="white">
          {countryCode === 'egypt' ? 'مصر' : countryCode === 'uae' ? 'الإمارات' : 'الكويت'}
        </Typography>
      </Box>
    );
  };

  return (
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {countries.map((country) => (
        <Grid item key={country.code} xs={12} sm={6} md={4}>
          <CountryCard elevation={3}>
            <CardActionArea onClick={() => handleCountrySelect(country.code)}>
              {/* صورة العلم */}
              {getFlagPlaceholder(country.code)}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {country.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {country.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button 
                size="small" 
                color="primary" 
                onClick={() => handleCountrySelect(country.code)}
                sx={{ mr: 'auto' }}
              >
                تصفح المناهج
              </Button>
            </CardActions>
          </CountryCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CountrySelector;