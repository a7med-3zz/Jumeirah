import { Box, Container, Typography, Grid, Card, CardContent, Button, Stack, Fade, Grow, Zoom, Divider } from '@mui/material';
import { EmojiEvents, Favorite, Visibility, Group, Star, TrendingUp, VolunteerActivism, School } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const values = [
  { icon: <Favorite color="error" sx={{ fontSize: 40 }} />, title: 'الشغف بالتعليم', desc: 'نؤمن أن التعليم رسالة سامية وننشرها بحب.' },
  { icon: <VolunteerActivism color="success" sx={{ fontSize: 40 }} />, title: 'دعم المجتمع', desc: 'نقف بجانب كل متعلم ومعلم ونبني مجتمعًا متعاونًا.' },
  { icon: <Star color="warning" sx={{ fontSize: 40 }} />, title: 'الجودة والتميز', desc: 'نقدم محتوى عالي الجودة ونطمح دائمًا للأفضل.' },
];

const achievements = [
  { icon: <EmojiEvents color="primary" sx={{ fontSize: 40 }} />, label: 'أكثر من', value: '10,000+', desc: 'طالب مستفيد' },
  { icon: <School color="secondary" sx={{ fontSize: 40 }} />, label: 'كورسات', value: '120+', desc: 'دورة تعليمية' },
  { icon: <Group color="success" sx={{ fontSize: 40 }} />, label: 'مجتمع نشط', value: '3 دول', desc: 'توسع مستمر' },
];

const About = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Fade in timeout={1200}>
          <Typography variant="h3" align="center" sx={{ fontWeight: 800, mb: 2, color: 'primary.main', letterSpacing: 1 }}>
            من نحن
          </Typography>
        </Fade>
        <Grow in timeout={1800}>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
            منصة جوميرا التعليمية... حيث نصنع الفارق في مستقبل التعليم العربي
          </Typography>
        </Grow>
        <Zoom in timeout={2000}>
          <Card sx={{ mb: 6, p: 3, borderRadius: 4, boxShadow: 4, textAlign: 'center', background: 'linear-gradient(135deg, #e3f2fd 60%, #fff 100%)' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'primary.dark' }}>
              رؤيتنا
            </Typography>
            <Typography variant="h6" color="text.secondary">
              أن نكون المنصة الرائدة في تمكين كل متعلم عربي من تحقيق طموحه بأسلوب عصري وملهم.
            </Typography>
          </Card>
        </Zoom>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
          قيمنا
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {values.map((val, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Grow in timeout={1000 + idx * 400}>
                <Card sx={{ textAlign: 'center', py: 4, px: 2, borderRadius: 4, boxShadow: 3, minHeight: 220 }}>
                  <Box sx={{ mb: 2 }}>{val.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{val.title}</Typography>
                  <Typography variant="body1" color="text.secondary">{val.desc}</Typography>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
          إنجازاتنا
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {achievements.map((ach, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Zoom in style={{ transitionDelay: `${idx * 200 + 500}ms` }}>
                <Card sx={{ textAlign: 'center', py: 4, borderRadius: 4, boxShadow: 6, minHeight: 200 }}>
                  <Box sx={{ mb: 2 }}>{ach.icon}</Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>{ach.value}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{ach.label}</Typography>
                  <Typography variant="body1" color="text.secondary">{ach.desc}</Typography>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="contained" color="primary" size="large" component={RouterLink} to="/" sx={{ fontWeight: 700, borderRadius: 8, px: 4, py: 1.5, fontSize: 18 }}>
            العودة للرئيسية
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 