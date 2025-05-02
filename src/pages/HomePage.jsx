import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  Paper,
  Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PublicIcon from '@mui/icons-material/Public';

// مكونات الصفحة الرئيسية
import CountrySelector from '../components/home/CountrySelector';
import FeatureCard from '../components/home/FeatureCard';
import HeroSection from '../components/home/HeroSection';

const HomePage = () => {
  const navigate = useNavigate();

  // ميزات المنصة الرئيسية
  const features = [
    {
      title: 'محتوى المدارس',
      description: 'استكشف مكتبة ضخمة من الدروس والشروحات التفاعلية لجميع المراحل المدرسية، مصممة خصيصًا لتناسب مناهج مصر والإمارات والكويت. تعلّم بذكاء، وتفوّق في دراستك مع أفضل المعلمين.',
      icon: <SchoolIcon fontSize="large" color="primary" />
    },
    {
      title: 'محتوى الجامعات',
      description: 'احصل على دعم فوري في مشاريعك الجامعية وحل الواجبات، واطلب شرحًا مخصصًا لأي موضوع جامعي من نخبة من الخبراء والمعلمين المتخصصين.',
      icon: <AssignmentIcon fontSize="large" color="primary" />
    },
    {
      title: 'دعم مباشر وفعّال',
      description: 'تواصل مع المعلمين مباشرة عبر الشات، اسأل، استفسر، واطلب المساعدة في أي وقت لتحصل على تجربة تعليمية شخصية لا مثيل لها.',
      icon: <SupportAgentIcon fontSize="large" color="primary" />
    }
  ];

  // الدول المدعومة
  const countries = [
    {
      name: 'مصر',
      code: 'egypt',
      flag: '/src/assets/flags/egypt.svg',
      description: 'المناهج المصرية لجميع المراحل الدراسية'
    },
    {
      name: 'الإمارات',
      code: 'uae',
      flag: '/src/assets/flags/uae.svg',
      description: 'المناهج الإماراتية لجميع المراحل الدراسية'
    },
    {
      name: 'الكويت',
      code: 'kuwait',
      flag: '/src/assets/flags/kuwait.svg',
      description: 'المناهج الكويتية لجميع المراحل الدراسية'
    }
  ];

  return (
    <Box className="fade-in">
      {/* قسم الترحيب الرئيسي */}
      <HeroSection />

      {/* قسم اختيار الدولة */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            ابدأ رحلتك التعليمية حسب بلدك
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            اختر دولتك لتستمتع بتجربة تعليمية مصممة خصيصًا لك ولمناهجك الدراسية
          </Typography>
          
          <CountrySelector countries={countries} />
        </Container>
      </Box>

      {/* قسم الميزات */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            لماذا جوميرا؟
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            منصتك الشاملة للتفوق المدرسي والجامعي والدعم المباشر من أفضل المعلمين والخبراء
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard feature={feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* قسم الإحصائيات */}
      <Box sx={{ py: 6, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                  +500
                </Typography>
                <Typography variant="h6">درس وشرح مدرسي مميز</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                  +200
                </Typography>
                <Typography variant="h6">معلم وخبير معتمد</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                  +10,000
                </Typography>
                <Typography variant="h6">طالب وطالبة يحققون النجاح</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* قسم الدعوة للعمل */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            مستقبلك يبدأ من هنا!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            انضم إلى مجتمع جوميرا وكن جزءًا من رحلة تعليمية ملهمة، حيث التفوق أصبح أسهل وأمتع.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mx: 1, px: 4, py: 1.5 }}
            >
              سجّل مجانًا الآن
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/courses')}
              sx={{ mx: 1, px: 4, py: 1.5 }}
            >
              تصفح محتوى المدارس
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;