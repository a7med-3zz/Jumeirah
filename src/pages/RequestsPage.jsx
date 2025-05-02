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
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardActions,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  School as SchoolIcon
} from '@mui/icons-material';

// استيراد سياق المصادقة
// import { useAuth } from '../context/AuthContext';

const RequestsPage = () => {
  const navigate = useNavigate();
  // متغير وهمي بدلاً من المصادقة
  const currentUser = { id: 999, name: 'مستخدم تجريبي', avatar: '', role: 'student' };
  
  // حالة تحميل الطلبات
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  
  // حالة البحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    subject: '',
    level: ''
  });
  
  // تغيير قيمة البحث
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // تغيير الفلاتر
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  // محاكاة جلب الطلبات من الخادم
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // بيانات وهمية للطلبات
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
            status: 'open',
            offersCount: 3,
            createdAt: '2023-11-20',
            student: {
              id: 101,
              name: 'أحمد محمد'
            }
          },
          {
            id: 2,
            title: 'مساعدة في مشروع الفيزياء',
            description: 'أحتاج إلى مساعدة في إعداد مشروع عملي في الفيزياء عن الدوائر الكهربائية للصف التاسع',
            subject: 'physics',
            level: 'middle',
            country: 'uae',
            deadline: '2023-12-10',
            budget: 200,
            currency: 'درهم',
            status: 'open',
            offersCount: 2,
            createdAt: '2023-11-18',
            student: {
              id: 102,
              name: 'فاطمة علي'
            }
          },
          {
            id: 3,
            title: 'شرح قواعد اللغة العربية',
            description: 'أبحث عن معلم للمساعدة في فهم قواعد النحو والصرف في اللغة العربية للصف السادس الابتدائي',
            subject: 'arabic',
            level: 'primary',
            country: 'kuwait',
            deadline: '2023-12-20',
            budget: 25,
            currency: 'دينار',
            status: 'open',
            offersCount: 5,
            createdAt: '2023-11-22',
            student: {
              id: 103,
              name: 'خالد العنزي'
            }
          },
          {
            id: 4,
            title: 'مراجعة شاملة للكيمياء العضوية',
            description: 'أحتاج إلى مراجعة شاملة لمنهج الكيمياء العضوية للصف الثالث الثانوي استعداداً للامتحان النهائي',
            subject: 'chemistry',
            level: 'secondary',
            country: 'egypt',
            deadline: '2023-12-25',
            budget: 200,
            currency: 'جنيه',
            status: 'open',
            offersCount: 4,
            createdAt: '2023-11-19',
            student: {
              id: 104,
              name: 'سارة أحمد'
            }
          },
          {
            id: 5,
            title: 'تدريب على حل مسائل الرياضيات',
            description: 'أبحث عن معلم للتدريب على حل مسائل الرياضيات للصف الثامن وشرح الطرق المختلفة للحل',
            subject: 'math',
            level: 'middle',
            country: 'uae',
            deadline: '2023-12-18',
            budget: 180,
            currency: 'درهم',
            status: 'open',
            offersCount: 1,
            createdAt: '2023-11-21',
            student: {
              id: 105,
              name: 'محمد الشامسي'
            }
          }
        ];
        
        // تطبيق البحث والفلاتر
        let filteredRequests = [...mockRequests];
        
        // تطبيق البحث
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredRequests = filteredRequests.filter(request => 
            request.title.toLowerCase().includes(query) || 
            request.description.toLowerCase().includes(query)
          );
        }
        
        // تطبيق الفلاتر
        if (filters.country) {
          filteredRequests = filteredRequests.filter(request => 
            request.country === filters.country
          );
        }
        
        if (filters.subject) {
          filteredRequests = filteredRequests.filter(request => 
            request.subject === filters.subject
          );
        }
        
        if (filters.level) {
          filteredRequests = filteredRequests.filter(request => 
            request.level === filters.level
          );
        }
        
        setRequests(filteredRequests);
      } catch (err) {
        console.error('خطأ في جلب الطلبات:', err);
        setError('حدث خطأ أثناء جلب الطلبات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, [searchQuery, filters]);
  
  // التوجه إلى صفحة إنشاء طلب جديد
  const handleCreateRequest = () => {
    if (!currentUser) {
      // إذا لم يكن المستخدم مسجل دخول، توجيهه إلى صفحة تسجيل الدخول
      navigate('/login', { state: { from: '/requests/create' } });
      return;
    }
    
    navigate('/requests/create');
  };
  
  // التوجه إلى صفحة تفاصيل الطلب
  const handleViewRequest = (requestId) => {
    navigate(`/requests/${requestId}`);
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
      status: {
        open: 'مفتوح',
        assigned: 'تم تعيين معلم',
        completed: 'مكتمل',
        closed: 'مغلق'
      }
    };
    
    return translations[filterType][value] || value;
  };
  
  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };
  
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
          <Typography color="text.primary">
            الطلبات الخاصة
          </Typography>
        </Breadcrumbs>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              الطلبات الخاصة
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              اطلب مساعدة خاصة من معلمين متخصصين أو تصفح الطلبات المتاحة
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateRequest}
            size="large"
          >
            طلب جديد
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* قسم البحث والفلترة */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ابحث عن طلب"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterListIcon sx={{ mr: 1 }} color="action" />
                <Typography variant="subtitle2" sx={{ mr: 2 }}>
                  تصفية:
                </Typography>
                
                <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                  <InputLabel id="country-filter-label">الدولة</InputLabel>
                  <Select
                    labelId="country-filter-label"
                    id="country-filter"
                    name="country"
                    value={filters.country}
                    label="الدولة"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="egypt">مصر</MenuItem>
                    <MenuItem value="uae">الإمارات</MenuItem>
                    <MenuItem value="kuwait">الكويت</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                  <InputLabel id="subject-filter-label">المادة</InputLabel>
                  <Select
                    labelId="subject-filter-label"
                    id="subject-filter"
                    name="subject"
                    value={filters.subject}
                    label="المادة"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="math">الرياضيات</MenuItem>
                    <MenuItem value="physics">الفيزياء</MenuItem>
                    <MenuItem value="chemistry">الكيمياء</MenuItem>
                    <MenuItem value="biology">الأحياء</MenuItem>
                    <MenuItem value="arabic">اللغة العربية</MenuItem>
                    <MenuItem value="english">اللغة الإنجليزية</MenuItem>
                    <MenuItem value="science">العلوم</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="level-filter-label">المرحلة</InputLabel>
                  <Select
                    labelId="level-filter-label"
                    id="level-filter"
                    name="level"
                    value={filters.level}
                    label="المرحلة"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="">الكل</MenuItem>
                    <MenuItem value="primary">ابتدائي</MenuItem>
                    <MenuItem value="middle">إعدادي</MenuItem>
                    <MenuItem value="secondary">ثانوي</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        {/* عرض الطلبات */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        ) : requests.length > 0 ? (
          <Grid container spacing={3}>
            {requests.map((request) => (
              <Grid item xs={12} key={request.id}>
                <Card 
                  elevation={2}
                  sx={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {request.title}
                      </Typography>
                      <Chip 
                        label={getFilterText('status', request.status)} 
                        color="primary" 
                        size="small" 
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {request.description}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SchoolIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            {getFilterText('subject', request.subject)} - {getFilterText('level', request.level)}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            الموعد النهائي: {formatDate(request.deadline)}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AttachMoneyIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            الميزانية: {request.budget} {request.currency}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Chip 
                            label={`${request.offersCount} عرض`} 
                            size="small" 
                            color="secondary" 
                            variant="outlined" 
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                  
                  <Divider />
                  
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        تم النشر: {formatDate(request.createdAt)}
                      </Typography>
                      <Chip 
                        label={getFilterText('country', request.country)} 
                        size="small" 
                        sx={{ ml: 1 }} 
                      />
                    </Box>
                    
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => handleViewRequest(request.id)}
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
            <Typography variant="h6" color="text.secondary">
              لا توجد طلبات متاحة تطابق معايير البحث
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default RequestsPage;