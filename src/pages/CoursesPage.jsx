import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Breadcrumbs,
  Link,
  Paper,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// استيراد المكونات
import CourseCard from '../components/courses/CourseCard';
import CourseFilters from '../components/courses/CourseFilters';

const CoursesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // استخراج معلمات البحث من الرابط
  const initialCountry = queryParams.get('country') || '';
  
  // حالة الفلاتر
  const [filters, setFilters] = useState({
    country: initialCountry,
    level: '',
    subject: '',
    term: ''
  });
  
  // حالة تحميل الكورسات
  const [loading, setLoading] = useState(true);
  
  // بيانات وهمية للكورسات
  const [courses, setCourses] = useState([]);
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // تحديث الفلاتر
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
    
    // إعادة تعيين الفلاتر التابعة عند تغيير الدولة
    if (name === 'country') {
      setFilters({
        ...filters,
        country: value,
        level: '',
        subject: '',
        term: ''
      });
    }
    
    // إعادة تعيين المادة والترم عند تغيير المرحلة
    if (name === 'level') {
      setFilters({
        ...filters,
        level: value,
        subject: '',
        term: ''
      });
    }
    
    // إعادة تعيين الترم عند تغيير المادة
    if (name === 'subject') {
      setFilters({
        ...filters,
        subject: value,
        term: ''
      });
    }
  };
  
  // محاكاة جلب الكورسات من الخادم
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // بيانات وهمية للكورسات
      const mockCourses = [
        {
          id: 1,
          title: 'الرياضيات للصف الأول الثانوي - الترم الأول',
          description: 'شرح كامل لمنهج الرياضيات للصف الأول الثانوي - الترم الأول وفقاً للمنهج المصري',
          instructor: 'د. أحمد محمود',
          rating: 4.8,
          reviewsCount: 120,
          studentsCount: 1500,
          price: 250,
          currency: 'جنيه',
          image: '',
          country: 'egypt',
          level: 'secondary',
          subject: 'math',
          term: 'first'
        },
        {
          id: 2,
          title: 'الفيزياء للصف الثاني الثانوي - الترم الثاني',
          description: 'شرح تفصيلي لمنهج الفيزياء للصف الثاني الثانوي - الترم الثاني وفقاً للمنهج المصري',
          instructor: 'د. محمد علي',
          rating: 4.6,
          reviewsCount: 95,
          studentsCount: 1200,
          price: 280,
          currency: 'جنيه',
          image: '',
          country: 'egypt',
          level: 'secondary',
          subject: 'physics',
          term: 'second'
        },
        {
          id: 3,
          title: 'اللغة العربية للصف التاسع - الترم الأول',
          description: 'شرح منهج اللغة العربية للصف التاسع - الترم الأول وفقاً للمنهج الإماراتي',
          instructor: 'أ. فاطمة الزهراء',
          rating: 4.9,
          reviewsCount: 150,
          studentsCount: 1800,
          price: 300,
          currency: 'درهم',
          image: '',
          country: 'uae',
          level: 'middle',
          subject: 'arabic',
          term: 'first'
        },
        {
          id: 4,
          title: 'العلوم للصف السادس - الترم الثاني',
          description: 'شرح منهج العلوم للصف السادس - الترم الثاني وفقاً للمنهج الكويتي',
          instructor: 'د. عبدالله الكويتي',
          rating: 4.7,
          reviewsCount: 85,
          studentsCount: 950,
          price: 35,
          currency: 'دينار',
          image: '',
          country: 'kuwait',
          level: 'primary',
          subject: 'science',
          term: 'second'
        },
        {
          id: 5,
          title: 'الكيمياء للصف الثالث الثانوي - الترم الأول',
          description: 'مراجعة شاملة لمنهج الكيمياء للصف الثالث الثانوي - الترم الأول وفقاً للمنهج المصري',
          instructor: 'د. سمير حسن',
          rating: 4.9,
          reviewsCount: 210,
          studentsCount: 2200,
          price: 320,
          currency: 'جنيه',
          image: '',
          country: 'egypt',
          level: 'secondary',
          subject: 'chemistry',
          term: 'first'
        },
        {
          id: 6,
          title: 'الرياضيات للصف الثامن - الترم الثاني',
          description: 'شرح منهج الرياضيات للصف الثامن - الترم الثاني وفقاً للمنهج الإماراتي',
          instructor: 'أ. خالد الشامسي',
          rating: 4.5,
          reviewsCount: 78,
          studentsCount: 850,
          price: 280,
          currency: 'درهم',
          image: '',
          country: 'uae',
          level: 'middle',
          subject: 'math',
          term: 'second'
        }
      ];
      
      // تطبيق الفلاتر على الكورسات
      let filteredCourses = [...mockCourses];
      
      if (filters.country) {
        filteredCourses = filteredCourses.filter(course => course.country === filters.country);
      }
      
      if (filters.level) {
        filteredCourses = filteredCourses.filter(course => course.level === filters.level);
      }
      
      if (filters.subject) {
        filteredCourses = filteredCourses.filter(course => course.subject === filters.subject);
      }
      
      if (filters.term) {
        filteredCourses = filteredCourses.filter(course => course.term === filters.term);
      }
      
      setCourses(filteredCourses);
      setLoading(false);
    };
    
    fetchCourses();
  }, [filters]);
  
  // ترجمة قيم الفلاتر إلى نصوص عربية
  const getFilterText = (filterType, value) => {
    if (!value) return '';
    
    const translations = {
      country: {
        egypt: 'مصر',
        uae: 'الإمارات',
        kuwait: 'الكويت'
      },
      level: {
        primary: 'المرحلة الابتدائية',
        middle: 'المرحلة الإعدادية',
        secondary: 'المرحلة الثانوية'
      },
      subject: {
        math: 'الرياضيات',
        physics: 'الفيزياء',
        chemistry: 'الكيمياء',
        biology: 'الأحياء',
        arabic: 'اللغة العربية',
        english: 'اللغة الإنجليزية',
        science: 'العلوم'
      },
      term: {
        first: 'الترم الأول',
        second: 'الترم الثاني'
      }
    };
    
    return translations[filterType][value] || value;
  };
  
  // إنشاء عناصر فتات الخبز (Breadcrumbs) بناءً على الفلاتر المحددة
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      <Link underline="hover" key="1" color="inherit" href="/">
        الرئيسية
      </Link>,
      <Typography key="2" color="text.primary">
        الكورسات
      </Typography>
    ];
    
    if (filters.country) {
      breadcrumbs.push(
        <Typography key="3" color="text.primary">
          {getFilterText('country', filters.country)}
        </Typography>
      );
    }
    
    if (filters.level) {
      breadcrumbs.push(
        <Typography key="4" color="text.primary">
          {getFilterText('level', filters.level)}
        </Typography>
      );
    }
    
    if (filters.subject) {
      breadcrumbs.push(
        <Typography key="5" color="text.primary">
          {getFilterText('subject', filters.subject)}
        </Typography>
      );
    }
    
    if (filters.term) {
      breadcrumbs.push(
        <Typography key="6" color="text.primary">
          {getFilterText('term', filters.term)}
        </Typography>
      );
    }
    
    return breadcrumbs;
  };
  
  return (
    <Box className="fade-in" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            الكورسات التعليمية
          </Typography>
          <IconButton 
            onClick={toggleDrawer} 
            sx={{ 
              zIndex: 1200,
              backgroundColor: theme.palette.background.paper,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
          variant="temporary"
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              mt: 8,
              p: 2,
            },
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              الفلاتر
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <CourseFilters filters={filters} onFilterChange={handleFilterChange} />
          </Box>
        </Drawer>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <CourseCard course={course} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CoursesPage;