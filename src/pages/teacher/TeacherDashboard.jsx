import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
  Rating
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  LocalOffer as LocalOfferIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon
} from '@mui/icons-material';

// استيراد سياق المصادقة
import { useAuth } from '../../context/AuthContext';

// مكون TabPanel لعرض محتوى التاب
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
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

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // التحقق من تسجيل الدخول
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/teacher-dashboard' } });
    } else if (currentUser.role !== 'teacher') {
      // التوجيه إلى لوحة التحكم المناسبة
      if (currentUser.role === 'student') {
        navigate('/student-dashboard');
      } else if (currentUser.role === 'admin') {
        navigate('/admin-dashboard');
      }
    }
  }, [currentUser, navigate]);
  
  // حالة التاب النشط
  const [activeTab, setActiveTab] = useState(0);
  
  // حالة تحميل البيانات
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [error, setError] = useState(null);
  
  // تغيير التاب النشط
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // محاكاة جلب بيانات المعلم من الخادم
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // بيانات وهمية للكورسات
        const mockCourses = [
          {
            id: 1,
            title: 'الرياضيات للصف الأول الثانوي - الترم الأول',
            description: 'شرح كامل لمنهج الرياضيات للصف الأول الثانوي - الترم الأول وفقاً للمنهج المصري',
            studentsCount: 1500,
            rating: 4.8,
            reviewsCount: 120,
            price: 250,
            currency: 'جنيه',
            image: '',
            status: 'published', // draft, pending, published, rejected
            country: 'egypt',
            level: 'secondary',
            subject: 'math',
            term: 'first',
            createdAt: '2023-08-10',
            lastUpdated: '2023-08-15'
          },
          {
            id: 2,
            title: 'الفيزياء للصف الثاني الثانوي - الترم الثاني',
            description: 'شرح تفصيلي لمنهج الفيزياء للصف الثاني الثانوي - الترم الثاني وفقاً للمنهج المصري',
            studentsCount: 1200,
            rating: 4.6,
            reviewsCount: 95,
            price: 280,
            currency: 'جنيه',
            image: '',
            status: 'published',
            country: 'egypt',
            level: 'secondary',
            subject: 'physics',
            term: 'second',
            createdAt: '2023-07-20',
            lastUpdated: '2023-07-25'
          },
          {
            id: 7,
            title: 'الأحياء للصف الثالث الثانوي - الترم الأول',
            description: 'شرح منهج الأحياء للصف الثالث الثانوي - الترم الأول وفقاً للمنهج المصري',
            studentsCount: 0,
            rating: 0,
            reviewsCount: 0,
            price: 300,
            currency: 'جنيه',
            image: '',
            status: 'draft',
            country: 'egypt',
            level: 'secondary',
            subject: 'biology',
            term: 'first',
            createdAt: '2023-11-15',
            lastUpdated: '2023-11-15'
          }
        ];
        
        // بيانات وهمية للعروض
        const mockOffers = [
          {
            id: 101,
            requestId: 1,
            requestTitle: 'شرح درس الاشتقاق في الرياضيات',
            price: 120,
            currency: 'جنيه',
            duration: '3 أيام',
            status: 'pending', // pending, accepted, rejected, completed
            createdAt: '2023-11-21',
            student: {
              id: 101,
              name: 'أحمد محمد'
            }
          },
          {
            id: 103,
            requestId: 3,
            requestTitle: 'شرح قواعد اللغة العربية',
            price: 20,
            currency: 'دينار',
            duration: '4 أيام',
            status: 'accepted',
            createdAt: '2023-11-23',
            student: {
              id: 103,
              name: 'خالد العنزي'
            }
          },
          {
            id: 105,
            requestId: 5,
            requestTitle: 'تدريب على حل مسائل الرياضيات',
            price: 150,
            currency: 'درهم',
            duration: '5 أيام',
            status: 'rejected',
            createdAt: '2023-11-22',
            student: {
              id: 105,
              name: 'محمد الشامسي'
            }
          }
        ];
        
        setMyCourses(mockCourses);
        setMyOffers(mockOffers);
      } catch (err) {
        console.error('خطأ في جلب بيانات المعلم:', err);
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeacherData();
  }, [currentUser]);
  
  // استخدام صورة افتراضية في حالة عدم وجود صورة للكورس
  const defaultImage = 'https://via.placeholder.com/400x200?text=كورس+تعليمي';
  
  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };
  
  // ترجمة حالة الكورس إلى نص عربي
  const getCourseStatusText = (status) => {
    const statusMap = {
      draft: 'مسودة',
      pending: 'قيد المراجعة',
      published: 'منشور',
      rejected: 'مرفوض'
    };
    return statusMap[status] || status;
  };
  
  // لون حالة الكورس
  const getCourseStatusColor = (status) => {
    const colorMap = {
      draft: 'default',
      pending: 'warning',
      published: 'success',
      rejected: 'error'
    };
    return colorMap[status] || 'default';
  };
  
  // ترجمة حالة العرض إلى نص عربي
  const getOfferStatusText = (status) => {
    const statusMap = {
      pending: 'قيد الانتظار',
      accepted: 'مقبول',
      rejected: 'مرفوض',
      completed: 'مكتمل'
    };
    return statusMap[status] || status;
  };
  
  // لون حالة العرض
  const getOfferStatusColor = (status) => {
    const colorMap = {
      pending: 'warning',
      accepted: 'success',
      rejected: 'error',
      completed: 'info'
    };
    return colorMap[status] || 'default';
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
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <Box className="fade-in" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* ترويسة لوحة التحكم */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" gutterBottom>
                مرحباً، {currentUser.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                لوحة تحكم المعلم - إدارة الكورسات والعروض
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/courses/create')}
                sx={{ mr: 1 }}
              >
                كورس جديد
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/requests')}
              >
                تصفح الطلبات
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* تابات لوحة التحكم */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="dashboard tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<SchoolIcon />} label="كورساتي" />
              <Tab icon={<LocalOfferIcon />} label="عروضي" />
            </Tabs>
          </Box>
          
          {/* تاب الكورسات */}
          <TabPanel value={activeTab} index={0}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : myCourses.length > 0 ? (
              <Grid container spacing={3}>
                {myCourses.map((course) => (
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={course.image || defaultImage}
                        alt={course.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Chip 
                            label={getFilterText('subject', course.subject)} 
                            size="small" 
                            color="primary" 
                            sx={{ mr: 0.5 }} 
                          />
                          <Chip 
                            label={getCourseStatusText(course.status)} 
                            size="small" 
                            color={getCourseStatusColor(course.status)} 
                          />
                        </Box>
                        
                        <Typography variant="h6" component="div" gutterBottom noWrap>
                          {course.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, height: '40px', overflow: 'hidden' }}>
                          {course.description}
                        </Typography>
                        
                        <List dense>
                          <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <PeopleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`${course.studentsCount} طالب`} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          
                          <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <AttachMoneyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`${course.price} ${course.currency}`} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          
                          <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <AccessTimeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`آخر تحديث: ${formatDate(course.lastUpdated)}`} 
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                      
                      <Divider />
                      
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          عرض
                        </Button>
                        <Button 
                          size="small" 
                          startIcon={<EditIcon />}
                          onClick={() => navigate(`/courses/${course.id}/edit`)}
                        >
                          تعديل
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  ليس لديك أي كورسات حتى الآن
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/courses/create')}
                  sx={{ mt: 2 }}
                >
                  إنشاء كورس جديد
                </Button>
              </Paper>
            )}
          </TabPanel>
          
          {/* تاب العروض */}
          <TabPanel value={activeTab} index={1}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : myOffers.length > 0 ? (
              <Grid container spacing={3}>
                {myOffers.map((offer) => (
                  <Grid item xs={12} sm={6} key={offer.id}>
                    <Card 
                      elevation={2}
                      sx={{
                        borderLeft: '4px solid',
                        borderColor: offer.status === 'accepted' ? 'success.main' : 
                                    offer.status === 'rejected' ? 'error.main' : 
                                    offer.status === 'completed' ? 'info.main' : 'warning.main'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '70%' }}>
                            {offer.requestTitle}
                          </Typography>
                          <Chip 
                            label={getOfferStatusText(offer.status)} 
                            size="small" 
                            color={getOfferStatusColor(offer.status)} 
                          />
                        </Box>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              السعر المقترح:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color="primary.main">
                              {offer.price} {offer.currency}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              مدة التنفيذ:
                            </Typography>
                            <Typography variant="body1">
                              {offer.duration}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              تاريخ التقديم:
                            </Typography>
                            <Typography variant="body1">
                              {formatDate(offer.createdAt)}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              الطالب:
                            </Typography>
                            <Typography variant="body1">
                              {offer.student.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/requests/${offer.requestId}`)}
                        >
                          عرض الطلب
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  لم تقدم أي عروض حتى الآن
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/requests')}
                  sx={{ mt: 2 }}
                >
                  تصفح الطلبات المتاحة
                </Button>
              </Paper>
            )}
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherDashboard;