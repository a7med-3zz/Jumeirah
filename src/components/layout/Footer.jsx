import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // روابط مهمة للتذييل
  const footerLinks = [
    { title: 'من نحن', path: '/about' },
    { title: 'اتصل بنا', path: '/contact' },
    { title: 'الأسئلة الشائعة', path: '/faq' },
    { title: 'سياسة الخصوصية', path: '/privacy' },
    { title: 'شروط الاستخدام', path: '/terms' }
  ];

  // روابط الدول
  const countries = [
    { title: 'مصر', path: '/country/egypt' },
    { title: 'الإمارات', path: '/country/uae' },
    { title: 'الكويت', path: '/country/kuwait' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: 'primary.main',
        color: 'white',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* شعار وعن المنصة */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                منصة جوميرا التعليمية
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              منصة تعليمية عربية متكاملة تُقدم خدماتها لطلاب ومعلمين في مصر والإمارات والكويت، تجمع بين تقديم الكورسات التعليمية وخدمة الطلبات الخاصة.
            </Typography>
          </Grid>

          {/* روابط مهمة */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              روابط مهمة
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  color="inherit"
                  sx={{ mb: 1, '&:hover': { color: 'secondary.light' } }}
                >
                  {link.title}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* الدول المدعومة */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              الدول المدعومة
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {countries.map((country) => (
                <Link
                  key={country.path}
                  component={RouterLink}
                  to={country.path}
                  color="inherit"
                  sx={{ mb: 1, '&:hover': { color: 'secondary.light' } }}
                >
                  {country.title}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* حقوق النشر */}
        <Typography variant="body2" align="center">
          جميع الحقوق محفوظة © {currentYear} منصة جوميرا التعليمية
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;