import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Fade,
  Grow,
  Zoom,
  Stack,
} from '@mui/material';
import { School, Assignment, Chat, EmojiEvents, Star, TrendingUp } from '@mui/icons-material';
import Lottie from 'lottie-react';
import { Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
// يمكنك إضافة مكتبة Lottie أو استبدالها بـ SVG/CSS Animation حسب الحاجة

const motivationalQuotes = [
  'التعليم هو جواز سفرك إلى المستقبل!',
  'كل يوم تتعلم فيه شيء جديد هو يوم ناجح.',
  'مع جوميرا، طريقك للتميز يبدأ هنا!',
  'استثمر في نفسك، فالعلم هو رأس المال الحقيقي.',
  'تعلم اليوم، لتقود غداً.',
];

const achievements = [
  { icon: <EmojiEvents color="warning" sx={{ fontSize: 40 }} />, label: 'أكثر من', value: '10,000+', description: 'طالب مستفيد' },
  { icon: <Star color="primary" sx={{ fontSize: 40 }} />, label: 'تقييمات إيجابية', value: '4.9/5', description: 'رضا المستخدمين' },
  { icon: <TrendingUp color="success" sx={{ fontSize: 40 }} />, label: 'نمونا', value: '3 دول عربية', description: 'توسع مستمر' },
];

const features = [
  {
    icon: <School sx={{ fontSize: 40 }} />, title: 'محتوى المدارس',
    description: 'دروس وملخصات تفاعلية لكل المواد والمراحل المدرسية، مع أفضل المعلمين، في منصة واحدة.'
  },
  {
    icon: <Assignment sx={{ fontSize: 40 }} />, title: 'محتوى الجامعات',
    description: 'اطلب شرح أو حل واجب جامعي، أو دعم أكاديمي فوري من خبراء متخصصين في جميع التخصصات.'
  },
  {
    icon: <Chat sx={{ fontSize: 40 }} />, title: 'تواصل مباشر',
    description: 'تواصل مع المعلمين مباشرة عبر الشات لأي سؤال أو استفسار في أي وقت.'
  },
];

const sliderCards = [
  {
    image: '/images/Home Page 1.png',
    title: '✨ تعرف علينا أكثر',
    desc: 'جوميرا ليست مجرد منصة تعليمية، بل مجتمع نابض بالحياة يجمع بين الشغف والمعرفة والإبداع. اكتشف رؤيتنا، قيمنا، وإنجازاتنا، وانضم لعائلة النجاح والتطوير المستمر! 🚀',
    cta: 'نبذة عننا',
    link: '/about',
    color: 'primary.main',
    icon: <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'primary.light', display: 'inline-flex', boxShadow: 2 }}><EmojiEvents sx={{ fontSize: 48, color: 'primary.main' }} /></Box>,
    sub: 'مع جوميرا... أنت جزء من قصة نجاح عربية! 💙',
  },
  {
    image: '/images/Home Page 2.png',
    title: '🏫 محتوى المدارس بين يديك',
    desc: 'كل دروسك وملخصاتك المدرسية في مكان واحد! مكتبة ضخمة من الشروحات التفاعلية، فيديوهات، واختبارات تغطي كل المواد والمراحل. تعلّم بأسلوبك، في أي وقت ومن أي مكان، مع نخبة من أفضل المعلمين. 🏆',
    cta: 'استكشف محتوى المدارس',
    link: '/courses',
    color: 'success.main',
    icon: <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'success.light', display: 'inline-flex', boxShadow: 2 }}><School sx={{ fontSize: 48, color: 'success.main' }} /></Box>,
    sub: 'تعلّم، اختبر، وحقق أهدافك المدرسية مع جوميرا! 🌟',
  },
  {
    image: '/images/Home Page 3.png',
    title: '🎓 محتوى الجامعات ودعمك الأكاديمي',
    desc: 'واجهت صعوبة في واجب جامعي أو مشروع؟ لا تشيل هم! اطلب شرح أو حل لأي سؤال أو تمرين جامعي، وتواصل مع خبراء متخصصين بسرعة وسهولة. دعم متواصل 24/7. 💡',
    cta: 'اطلب دعمك الجامعي',
    link: '/requests',
    color: 'warning.main',
    icon: <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'warning.light', display: 'inline-flex', boxShadow: 2 }}><Assignment sx={{ fontSize: 48, color: 'warning.main' }} /></Box>,
    sub: 'لا يوجد مستحيل مع جوميرا... اسأل واطمئن! 🙌',
  },
];

const Home = () => {
  const theme = useTheme();
  const ctaRef = useRef(null);
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(/images/Home Page 4.png)',
          height: { xs: 'auto', md: '60vh' },
          minHeight: { xs: 320, sm: 380, md: 420 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, sm: 6, md: 0 },
          px: { xs: 1, sm: 2, md: 0 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, p: { xs: 0.5, sm: 2, md: 0 } }}>
          <Fade in timeout={1200}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: { xs: 'center', md: 'flex-start' }, 
              gap: { xs: 1, sm: 2 }, 
              mb: 1, 
              flexDirection: { xs: 'column', md: 'row' },
              transform: 'translateY(0)',
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' }
              }
            }}>
              <Box
                component="img"
                src="/images/logonotext.png"
                alt="شعار جوميرا"
                sx={{ 
                  width: { xs: 120, sm: 180, md: 220, lg: 300 }, 
                  height: 'auto', 
                  mr: { md: 3 }, 
                  mb: { xs: 2, md: '-10px' },
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                  maxWidth: '100%',
                }}
              />
              <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="inherit"
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold', 
                    textShadow: '0 2px 8px #0008', 
                    fontSize: { xs: 22, sm: 32, md: 40, lg: 56 },
                    display: 'inline',
                    background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  منصة جوميرا التعليمية
                </Typography>
              </Box>
            </Box>
          </Fade>
          <Grow in timeout={1800}>
            <Typography 
              variant="h5" 
              color="inherit" 
              paragraph 
              sx={{ 
                fontSize: { xs: 13, sm: 16, md: 20, lg: 28 },
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                mx: 'auto',
                textAlign: { xs: 'center', md: 'right' },
                lineHeight: 1.7,
              }}
            >
              مع جوميرا، التعليم أصبح أسهل، أمتع، وأكثر تفاعلاً في الوطن العربي
            </Typography>
          </Grow>
          <Zoom in timeout={2000}>
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button
                variant="contained"
                size="large"
                sx={{ 
                  mt: 2, 
                  fontWeight: 700, 
                  fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                  }
                }}
                onClick={() => {
                  if (ctaRef.current) {
                    ctaRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                ابدأ التعلم الآن
              </Button>
            </Box>
          </Zoom>
        </Container>
      </Paper>

      {/* Swiper Cards Section */}
      <Container maxWidth="lg" sx={{ my: 6 }} ref={ctaRef}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          dir="rtl"
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          style={{ borderRadius: 24, boxShadow: '0 8px 32px #0002', background: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f7fbff' }}
        >
          {sliderCards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <Grow in timeout={800 + idx * 400}>
                <Grid container alignItems="center" spacing={4} sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.title}
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        borderRadius: 6,
                        boxShadow: 6,
                        mx: 'auto',
                        display: 'block',
                        background: theme.palette.background.paper,
                        transition: 'transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.4s',
                        '&:hover': {
                          transform: 'scale(1.04) rotate(-2deg)',
                          boxShadow: '0 12px 32px 0 #0003',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                      {card.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        mb: 1.5,
                        color: card.color,
                        fontSize: { xs: 22, sm: 26, md: 32 },
                        letterSpacing: 0.5,
                        textShadow: '0 2px 8px #e3f2fd',
                        lineHeight: 1.3,
                        display: 'inline-block',
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.5,
                        bgcolor: { xs: '#f7fbff', md: 'transparent' },
                        boxShadow: { xs: '0 2px 8px #e3f2fd', md: 'none' },
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: { xs: 15, sm: 17, md: 20 },
                        lineHeight: 1.7,
                        letterSpacing: 0.2,
                      }}
                    >
                      {card.desc}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        color: card.color,
                        fontWeight: 700,
                        fontSize: { xs: 13, sm: 15 },
                        letterSpacing: 0.5,
                        textShadow: '0 1px 4px #e3f2fd',
                      }}
                    >
                      {card.sub}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to={card.link}
                      sx={{
                        fontWeight: 800,
                        borderRadius: 8,
                        px: 4,
                        py: 1.5,
                        fontSize: { xs: 15, sm: 17, md: 18 },
                        boxShadow: 3,
                        transition: 'box-shadow 0.3s',
                        '&:hover': { boxShadow: '0 8px 24px #1976d244' },
                        mt: 1,
                      }}
                    >
                      {card.cta}
                    </Button>
                  </Grid>
                </Grid>
              </Grow>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Motivational Quotes Section */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Stack spacing={2} alignItems="center">
          {motivationalQuotes.map((quote, idx) => (
            <Fade in timeout={800 + idx * 400} key={idx}>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600, textAlign: 'center', fontSize: { xs: 15, sm: 18, md: 22 } }}>
                {quote}
              </Typography>
            </Fade>
          ))}
        </Stack>
      </Container>

      {/* --- New Section: Courses Call To Action --- */}
      <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component="img" src="/images/Home Page 1.png" alt="محتوى المدارس جوميرا" sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              اكتشف محتوى المدارس مع جوميرا
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              كل دروسك وملخصاتك المدرسية، شروحات تفاعلية وتحديثات مستمرة لكل المواد والمراحل، مع أفضل المعلمين.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={RouterLink}
              to="/courses"
              sx={{ fontWeight: 700, fontSize: 18 }}
            >
              استكشف محتوى المدارس
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* --- New Section: Requests Call To Action --- */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center" direction="row-reverse">
          <Grid item xs={12} md={6}>
            <Box component="img" src="/images/Home Page 3.png" alt="محتوى الجامعات جوميرا" sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              محتوى الجامعات ودعمك الأكاديمي
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              اطلب شرح أو حل لأي واجب جامعي أو مشروع أكاديمي، وتواصل مع خبراء متخصصين لدعمك 24/7 في كل المواد والتخصصات.
            </Typography>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              component={RouterLink}
              to="/requests"
              sx={{ fontWeight: 700, fontSize: 18 }}
            >
              اطلب دعمك الجامعي الآن
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Achievements Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700 }}>
          إنجازات المنصة
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {achievements.map((ach, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Zoom in style={{ transitionDelay: `${idx * 200 + 500}ms` }}>
                <Card sx={{ textAlign: 'center', py: 4, boxShadow: 6, borderRadius: 4, minHeight: 220 }}>
                  <Box sx={{ mb: 2 }}>{ach.icon}</Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 800 }}>
                    {ach.value}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {ach.label}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {ach.description}
                  </Typography>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          مميزات المنصة
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Grow in timeout={1000 + index * 400}>
                <Card sx={{ height: '100%', textAlign: 'center', borderRadius: 4, boxShadow: 4, position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ color: 'primary.main', mb: 2, mt: 4, fontSize: 48, animation: 'spin 3s linear infinite' }}>
                    {feature.icon}
                  </Box>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fun Animated Section */}
      <Box sx={{ bgcolor: 'primary.light', py: 8, mt: 6, borderRadius: 6, boxShadow: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" color="white" sx={{ mb: 3, fontWeight: 700, textShadow: '0 2px 8px #0006' }}>
            مع جوميرا... أنت البطل الحقيقي!
          </Typography>
          <Typography variant="h6" align="center" color="white" sx={{ mb: 4, fontWeight: 500 }}>
            انضم إلى آلاف الطلاب والمعلمين وحقق أهدافك التعليمية بأسلوب عصري وشيق.
          </Typography>
          {/* مثال على أنميشن SVG أو Lottie (يمكنك استبداله أو إضافة المزيد) */}
          {/* <Lottie animationData={...} style={{ height: 200 }} /> */}
        </Container>
      </Box>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Home; 