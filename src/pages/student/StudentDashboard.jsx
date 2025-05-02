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
  LinearProgress,
  Rating
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Visibility as VisibilityIcon,
  LocalOffer as LocalOfferIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon
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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // التحقق من تسجيل الدخول
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/student-dashboard' } });
    } else if (currentUser.role !== 'student') {
      // التوجيه إلى لوحة التحكم المناسبة
      if (currentUser.role === 'teacher') {
        navigate('/teacher-dashboard');
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
  const [myRequests, setMyRequests] = useState([]);
  const [error, setError] = useState(null);
  
  // تغيير التاب النشط
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // محاكاة جلب بيانات الطالب من الخادم
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // بيانات وهمية للكورسات المسجل فيها
        const mockEnrolledCourses = [
          {
            id: 1,
            title: 'الرياضيات للصف الأول الثانوي - الترم الأول',
            description: 'شرح كامل لمنهج الرياضيات للصف الأول الثانوي - الترم الأول وفقاً للمنهج المصري',
            instructor: 'د. أحمد محمود',
            progress: 65, // نسبة التقدم في الكورس
            lastAccessed: '2023-11-20',
            image: '',
            country: 'egypt',
            level: 'secondary',
            subject: 'math',
            term: 'first'
          },
          {
            id: 3,
            title: 'اللغة العربية للصف التاسع - الترم الأول',
            description: 'شرح منهج اللغة العربية للصف التاسع - الترم الأول وفقاً للمنهج الإماراتي',
            instructor: 'أ. فاطمة الزهراء',
            progress: 30,
            lastAccessed: '2023-11-18',
            image: '',
            country: 'uae',
            level: 'middle',
            subject: 'arabic',
            term: 'first'
          }
        ];
        
        // بيانات وهمية للطلبات الخاصة
        const mockRequests = [
          {
            id: 1,
            title: 'شرح درس الاشتقاق في الرياضيات',
            description: 'أحتاج إلى شرح مفصل لدرس الاشتقاق في الرياضيات للصف الثاني الثانوي مع أمثلة وتمارين محلولة',
            subject: 'math',
            level: 'secondary',
            country: 'egypt',
            deadline: '2023-12-15',
            budget: 150,
            currency: 'جنيه',
            status: 'open', // open, assigned, completed, closed
            offersCount: 3,
            createdAt: '2023-11-20'
          },
          {
            id: 6,
            title: 'مساعدة في مشروع العلوم',
            description: 'أحتاج إلى مساعدة في إعداد مشروع علمي عن الطاقة المتجددة للصف السابع',
            subject: 'science',
            level: 'middle',
            country: 'egypt',
            deadline: '2023-12-20',
            budget: 180,
            currency: 'جنيه',
            status: 'assigned',
            offersCount: 4,
            createdAt: '2023-11-15',
            assignedTeacher: {
              id: 201,
              name: 'د. محمد علي'
            }
          }
        ];
        
        setMyCourses(mockEnrolledCourses);
        setMyRequests(mockRequests);
      } catch (err) {
        console.error('خطأ في جلب بيانات الطالب:', err);
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [currentUser]);
  
  // استخدام صورة افتراضية في حالة عدم وجود صورة للكورس
  const defaultImage = 'https://via.placeholder.com/400x200?text=كورس+تعليمي';
  
  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };
  
  // ترجمة حالة الطلب إلى نص عربي
  const getRequestStatusText = (status) => {
    const statusMap = {
      open: 'مفتوح',
      assigned: 'تم تعيين معلم',
      completed: 'مكتمل',
      closed: 'مغلق'
    };
    return statusMap[status] || status;
  };
  
  // لون حالة الطلب
  const getRequestStatusColor = (status) => {
    const colorMap = {
      open: 'warning',
      assigned: 'info',
      completed: 'success',
      closed: 'default'
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
                لوحة تحكم الطالب - إدارة الكورسات والطلبات الخاصة
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/requests/create')}
                sx={{ mr: 1 }}
              >
                طلب جديد
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/courses')}
              >
                تصفح الكورسات
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
              <Tab icon={<AssignmentIcon />} label="طلباتي" />
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
                        <Box sx={{ mb: 1 }}>
                          <Chip 
                            label={getFilterText('subject', course.subject)} 
                            size="small" 
                            color="primary" 
                            sx={{ mr: 0.5 }} 
                          />
                          <Chip 
                            label={getFilterText('term', course.term)} 
                            size="small" 
                            color="secondary" 
                          />
                        </Box>
                        
                        <Typography variant="h6" component="div" gutterBottom noWrap>
                          {course.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          المدرس: {course.instructor}
                        </Typography>
                        
                        <Box sx={{ mt: 2, mb: 1 }}>
                          <Typography variant="body2" gutterBottom>
                            التقدم في الكورس: {course.progress}%
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={course.progress} 
                            sx={{ height: 8, borderRadius: 5 }} 
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          آخر دخول: {formatDate(course.lastAccessed)}
                        </Typography>
                      </CardContent>
                      
                      <Divider />
                      
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<PlayCircleOutlineIcon />}
                          onClick={() => navigate(`/courses/${course.id}/learn`)}
                          color="primary"
                        >
                          متابعة التعلم
                        </Button>
                        <Button 
                          size="small" 
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          تفاصيل الكورس
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  لم تسجل في أي كورس حتى الآن
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/courses')}
                  sx={{ mt: 2 }}
                >
                  تصفح الكورسات المتاحة
                </Button>
              </Paper>
            )}
          </TabPanel>
          
          {/* تاب الطلبات */}
          <TabPanel value={activeTab} index={1}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : myRequests.length > 0 ? (
              <Grid container spacing={3}>
                {myRequests.map((request) => (
                  <Grid item xs={12} sm={6} key={request.id}>
                    <Card 
                      elevation={2}
                      sx={{
                        borderLeft: '4px solid',
                        borderColor: request.status === 'completed' ? 'success.main' : 
                                    request.status === 'assigned' ? 'info.main' : 
                                    request.status === 'closed' ? 'text.disabled' : 'warning.main'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '70%' }}>
                            {request.title}
                          </Typography>
                          <Chip 
                            label={getRequestStatusText(request.status)} 
                            size="small" 
                            color={getRequestStatusColor(request.status)} 
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph sx={{ height: '40px', overflow: 'hidden' }}>
                          {request.description}
                        </Typography>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              المادة والمرحلة:
                            </Typography>
                            <Typography variant="body1">
                              {getFilterText('subject', request.subject)} - {getFilterText('level', request.level)}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              الميزانية:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color="primary.main">
                              {request.budget} {request.currency}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              الموعد النهائي:
                            </Typography>
                            <Typography variant="body1">
                              {formatDate(request.deadline)}
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              {request.status === 'assigned' ? 'المعلم المعين:' : 'العروض المقدمة:'}
                            </Typography>
                            <Typography variant="body1">
                              {request.status === 'assigned' ? request.assignedTeacher.name : `${request.offersCount} عرض`}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/requests/${request.id}`)}
                        >
                          عرض التفاصيل
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  لم تقم بإنشاء أي طلبات خاصة حتى الآن
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/requests/create')}
                  sx={{ mt: 2 }}
                >
                  إنشاء طلب جديد
                </Button>
              </Paper>
            )}
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default StudentDashboard;