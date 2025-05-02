import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// مكون القسم الترحيبي الرئيسي
const HeroSection = () => {
  const navigate = useNavigate();

  // ستايل مخصص للورقة الخلفية
  const HeroPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(rgba(21, 101, 192, 0.8), rgba(30, 136, 229, 0.9))',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4),
    },
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("/src/assets/hero-pattern.svg")',
      backgroundSize: 'cover',
      opacity: 0.1,
      zIndex: 0,
    }
  }));

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <HeroPaper elevation={3}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                كل دروسك وواجباتك في منصة واحدة!
              </Typography>
              <Typography
                variant="h6"
                color="inherit"
                paragraph
                sx={{ mb: 4, maxWidth: '90%' }}
              >
                <span style={{ fontWeight: 700 }}>محتوى المدارس:</span> استمتع بدروسك المدرسية، الشروحات، والملخصات التفاعلية لكل المواد والمراحل في مكان واحد.
                <br />
                <span style={{ fontWeight: 700 }}>محتوى الجامعات:</span> اطلب حل واجبك الجامعي أو شرح أي موضوع أكاديمي، واحصل على دعم فوري من نخبة من الخبراء.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/courses')}
                  sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
                >
                  محتوى المدارس
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/requests')}
                  sx={{ px: 4, py: 1.5, fontWeight: 'bold', borderWidth: 2 }}
                >
                  محتوى الجامعات
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    zIndex: -1,
                  }
                }}
              >
                {/* هنا يمكن إضافة صورة أو رسم توضيحي */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '120px',
                    fontWeight: 'bold',
                    color: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  جوميرا
                </Box>
              </Box>
            </Grid>
          </Grid>
        </HeroPaper>
      </Container>
    </Box>
  );
};

export default HeroSection;