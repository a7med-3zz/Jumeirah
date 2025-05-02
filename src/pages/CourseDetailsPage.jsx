import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Avatar,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  PlayCircleOutline as PlayCircleOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Language as LanguageIcon,
  Assignment as AssignmentIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

// استيراد سياق المصادقة
import { useAuth } from '../context/AuthContext';

// مكون TabPanel لعرض محتوى التاب
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // حالة تحميل الكورس
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  
  // حالة التاب النشط
  const [activeTab, setActiveTab] = useState(0);
  
  // تغيير التاب النشط
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // محاكاة جلب بيانات الكورس من الخادم
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // بيانات وهمية للكورس
        const mockCourses = [
          {
            id: 1,
            title: 'الرياضيات للصف الأول الثانوي - الترم الأول',
            description: 'شرح كامل لمنهج الرياضيات للصف الأول الثانوي - الترم الأول وفقاً للمنهج المصري',
            longDescription: 'يقدم هذا الكورس شرحاً تفصيلياً لمنهج الرياضيات للصف الأول الثانوي - الترم الأول وفقاً للمنهج المصري. يغطي الكورس جميع الوحدات والدروس المقررة، مع تمارين وأمثلة محلولة لمساعدة الطلاب على فهم المفاهيم الرياضية وتطبيقها.',
            instructor: 'د. أحمد محمود',
            instructorTitle: 'دكتوراه في الرياضيات - جامعة القاهرة',
            instructorBio: 'مدرس رياضيات بخبرة 15 عاماً في تدريس المناهج المصرية. حاصل على دكتوراه في الرياضيات من جامعة القاهرة.',
            rating: 4.8,
            reviewsCount: 120,
            studentsCount: 1500,
            price: 250,
            currency: 'جنيه',
            image: '',
            country: 'egypt',
            level: 'secondary',
            subject: 'math',
            term: 'first',
            language: 'العربية',
            lastUpdate: '2023-08-15',
            duration: '10 ساعات',
            sections: [
              {
                title: 'مقدمة في الجبر',
                lessons: [
                  { title: 'المعادلات الخطية', duration: '45 دقيقة', isPreview: true },
                  { title: 'المتباينات', duration: '50 دقيقة', isPreview: false },
                  { title: 'أنظمة المعادلات', duration: '55 دقيقة', isPreview: false }
                ]
              },
              {
                title: 'الهندسة التحليلية',
                lessons: [
                  { title: 'الإحداثيات الديكارتية', duration: '40 دقيقة', isPreview: false },
                  { title: 'المسافة بين نقطتين', duration: '35 دقيقة', isPreview: false },
                  { title: 'معادلة الخط المستقيم', duration: '60 دقيقة', isPreview: false }
                ]
              },
              {
                title: 'الدوال',
                lessons: [
                  { title: 'مفهوم الدالة', duration: '50 دقيقة', isPreview: false },
                  { title: 'الدوال الخطية', duration: '45 دقيقة', isPreview: false },
                  { title: 'الدوال التربيعية', duration: '55 دقيقة', isPreview: false }
                ]
              }
            ],
            requirements: [
              'إتقان الرياضيات للمرحلة الإعدادية',
              'توفر حاسوب أو جهاز لوحي لمشاهدة الدروس',
              'دفتر ملاحظات لتدوين النقاط المهمة وحل التمارين'
            ],
            goals: [
              'فهم المفاهيم الأساسية في الجبر والهندسة التحليلية',
              'القدرة على حل المعادلات والمتباينات بأنواعها',
              'إتقان رسم وتحليل الدوال المختلفة',
              'التمكن من حل مسائل الامتحانات بسهولة'
            ],
            reviews: [
              {
                id: 1,
                user: 'محمد علي',
                rating: 5,
                date: '2023-09-10',
                comment: 'كورس ممتاز وشرح مفصل وواضح. ساعدني كثيراً في فهم المنهج.'
              },
              {
                id: 2,
                user: 'سارة أحمد',
                rating: 4,
                date: '2023-08-22',
                comment: 'شرح جيد وأمثلة كثيرة. أتمنى لو كان هناك المزيد من التمارين.'
              },
              {
                id: 3,
                user: 'خالد محمود',
                rating: 5,
                date: '2023-07-15',
                comment: 'الدكتور أحمد شرحه ممتاز وبسيط. استفدت كثيراً من الكورس.'
              }
            ]
          },
          // يمكن إضافة المزيد من الكورسات هنا
        ];
        
        const foundCourse = mockCourses.find(c => c.id === parseInt(courseId));
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('الكورس غير موجود');
        }
      } catch (err) {
        console.error('خطأ في جلب بيانات الكورس:', err);
        setError('حدث خطأ أثناء جلب بيانات الكورس');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [courseId]);
  
  // التسجيل في الكورس
  const handleEnrollCourse = () => {
    if (!currentUser) {
      // إذا لم يكن المستخدم مسجل دخول، توجيهه إلى صفحة تسجيل الدخول
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }
    
    // محاكاة عملية التسجيل في الكورس
    alert(`تم التسجيل في الكورس: ${course.title}`);
    // في التطبيق الحقيقي، سيتم إرسال طلب API لتسجيل المستخدم في الكورس
  };
  
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
        science: 'العلوم',
        social: 'الدراسات الاجتماعية'
      },
      term: {
        first: 'الترم الأول',
        second: 'الترم الثاني'
      }
    };
    
    return translations[filterType][value] || value;
  };
  
  // استخدام صورة افتراضية في حالة عدم وجود صورة للكورس
  const defaultImage = 'https://via.placeholder.com/800x400?text=كورس+تعليمي';
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2 }}>
          <Button component={RouterLink} to="/courses" variant="contained">
            العودة إلى الكورسات
          </Button>
        </Box>
      </Container>
    );
  }
  
  if (!course) {
    return null;
  }
  
  return (
    <Box className="fade-in" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* فتات الخبز */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            الرئيسية
          </Link>
          <Link underline="hover" color="inherit" component={RouterLink} to="/courses">
            الكورسات
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            component={RouterLink} 
            to={`/courses?country=${course.country}`}
          >
            {getFilterText('country', course.country)}
          </Link>
          <Link 
            underline="hover" 
            color="inherit" 
            component={RouterLink} 
            to={`/courses?country=${course.country}&level=${course.level}`}
          >
            {getFilterText('level', course.level)}
          </Link>
          <Typography color="text.primary">
            {course.title}
          </Typography>
        </Breadcrumbs>
        
        {/* معلومات الكورس الرئيسية */}
        <Grid container spacing={4}>
          {/* الجانب الأيسر - صورة الكورس وزر التسجيل */}
          <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 2 } }}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <img 
                  src={course.image || defaultImage} 
                  alt={course.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {course.price} {course.currency}
                </Typography>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  size="large"
                  onClick={handleEnrollCourse}
                  sx={{ mb: 2 }}
                >
                  التسجيل في الكورس
                </Button>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="مدة الكورس" 
                      secondary={course.duration} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="لغة الكورس" 
                      secondary={course.language} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="عدد الطلاب" 
                      secondary={`${course.studentsCount} طالب`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="آخر تحديث" 
                      secondary={course.lastUpdate} 
                    />
                  </ListItem>
                </List>
                
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={getFilterText('subject', course.subject)} 
                    color="primary" 
                    sx={{ m: 0.5 }} 
                  />
                  <Chip 
                    label={getFilterText('term', course.term)} 
                    color="secondary" 
                    sx={{ m: 0.5 }} 
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          {/* الجانب الأيمن - تفاصيل الكورس */}
          <Grid item xs={12} md={8} sx={{ order: { xs: 1, md: 1 } }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {course.title}
            </Typography>
            
            <Typography variant="subtitle1" paragraph>
              {course.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ mr: 2 }}>{course.instructor.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle1">
                  {course.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.instructorTitle}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating value={course.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({course.rating}) - {course.reviewsCount} تقييم
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            {/* تابات محتوى الكورس */}
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  aria-label="course tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="نظرة عامة" />
                  <Tab label="محتوى الكورس" />
                  <Tab label="المدرس" />
                  <Tab label="التقييمات" />
                </Tabs>
              </Box>
              
              {/* تاب نظرة عامة */}
              <TabPanel value={activeTab} index={0}>
                <Typography variant="h6" gutterBottom>
                  وصف الكورس
                </Typography>
                <Typography paragraph>
                  {course.longDescription}
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  ماذا ستتعلم
                </Typography>
                <Grid container spacing={2}>
                  {course.goals.map((goal, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircleOutlineIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                        <Typography variant="body1">{goal}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  متطلبات الكورس
                </Typography>
                <List>
                  {course.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
              
              {/* تاب محتوى الكورس */}
              <TabPanel value={activeTab} index={1}>
                <Typography variant="h6" gutterBottom>
                  محتوى الكورس
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" paragraph>
                  {course.sections.reduce((total, section) => total + section.lessons.length, 0)} درس • {course.duration} إجمالي
                </Typography>
                
                {course.sections.map((section, sectionIndex) => (
                  <Box key={sectionIndex} sx={{ mb: 3 }}>
                    <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        القسم {sectionIndex + 1}: {section.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {section.lessons.length} درس
                      </Typography>
                    </Paper>
                    
                    <List sx={{ mt: 1 }}>
                      {section.lessons.map((lesson, lessonIndex) => (
                        <ListItem 
                          key={lessonIndex}
                          sx={{ 
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            py: 1
                          }}
                        >
                          <ListItemIcon>
                            <PlayCircleOutlineIcon color={lesson.isPreview ? 'primary' : 'disabled'} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={lesson.title}
                            secondary={lesson.duration}
                          />
                          {lesson.isPreview && (
                            <Chip 
                              label="معاينة مجانية" 
                              size="small" 
                              color="primary" 
                              variant="outlined" 
                            />
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </TabPanel>
              
              {/* تاب المدرس */}
              <TabPanel value={activeTab} index={2}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Avatar sx={{ width: 80, height: 80, mr: 3 }}>{course.instructor.charAt(0)}</Avatar>
                  <Box>
                    <Typography variant="h6">
                      {course.instructor}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {course.instructorTitle}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {course.instructorBio}
                    </Typography>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* تاب التقييمات */}
              <TabPanel value={activeTab} index={3}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    تقييمات الطلاب
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h3" sx={{ mr: 2 }}>
                      {course.rating}
                    </Typography>
                    <Box>
                      <Rating value={course.rating} precision={0.1} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        {course.reviewsCount} تقييم
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* قائمة التقييمات */}
                {course.reviews.map((review) => (
                  <Card key={review.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2 }}>{review.user.charAt(0)}</Avatar>
                          <Typography variant="subtitle1">
                            {review.user}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  ); // End of CourseDetailsPage component
}; // End of CourseDetailsPage declaration

export default CourseDetailsPage;
