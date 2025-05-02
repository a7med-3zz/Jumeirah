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
  Card,
  CardContent,
  CardActions,
  Chip,
  TextField,
  CircularProgress,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Send as SendIcon,
  Check as CheckIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material';

// استيراد سياق المصادقة
// import { useAuth } from '../context/AuthContext';

const RequestDetailsPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  // متغيرات وهمية بدلاً من المصادقة
  const currentUser = { id: 999, name: 'مستخدم تجريبي', avatar: '', role: 'student' };
  const hasRole = (role) => role === 'student' || role === 'admin';
  
  // حالة تحميل الطلب
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  
  // حالة تقديم عرض جديد
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    price: '',
    description: '',
    duration: ''
  });
  const [offerSubmitting, setOfferSubmitting] = useState(false);
  const [offerError, setOfferError] = useState(null);
  
  // محاكاة جلب بيانات الطلب والعروض من الخادم
  useEffect(() => {
    const fetchRequestDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // بيانات وهمية للطلب
        const mockRequests = [
          {
            id: 1,
            title: 'شرح درس الاشتقاق في الرياضيات',
            description: 'أحتاج إلى شرح مفصل لدرس الاشتقاق في الرياضيات للصف الثاني الثانوي مع أمثلة وتمارين محلولة. أواجه صعوبة في فهم قواعد الاشتقاق وتطبيقاتها، وأحتاج إلى شرح واضح مع الكثير من الأمثلة التوضيحية.',
            subject: 'math',
            level: 'secondary',
            country: 'egypt',
            deadline: '2023-12-15',
            budget: 150,
            currency: 'جنيه',
            status: 'open',
            createdAt: '2023-11-20',
            student: {
              id: 101,
              name: 'أحمد محمد',
              avatar: '',
              rating: 4.5,
              completedRequests: 8
            },
            requirements: [
              'شرح مفصل لقواعد الاشتقاق',
              'أمثلة متنوعة على كل قاعدة',
              'تمارين محلولة للتدريب',
              'شرح تطبيقات الاشتقاق في الفيزياء والهندسة'
            ]
          },
          // يمكن إضافة المزيد من الطلبات هنا
        ];
        
        // بيانات وهمية للعروض
        const mockOffers = [
          {
            id: 101,
            requestId: 1,
            price: 120,
            currency: 'جنيه',
            description: 'يمكنني تقديم شرح مفصل لدرس الاشتقاق مع أمثلة متنوعة وتمارين محلولة. لدي خبرة 5 سنوات في تدريس الرياضيات للمرحلة الثانوية.',
            duration: '3 أيام',
            status: 'pending', // pending, accepted, rejected
            createdAt: '2023-11-21',
            teacher: {
              id: 201,
              name: 'د. محمد علي',
              avatar: '',
              rating: 4.8,
              completedRequests: 25,
              specialization: 'دكتوراه في الرياضيات'
            }
          },
          {
            id: 102,
            requestId: 1,
            price: 150,
            currency: 'جنيه',
            description: 'سأقدم لك شرحاً تفصيلياً لدرس الاشتقاق مع التركيز على الفهم العميق للمفاهيم وليس الحفظ. سأقدم أيضاً ملخصاً شاملاً وأوراق عمل للتدريب.',
            duration: '2 أيام',
            status: 'pending',
            createdAt: '2023-11-22',
            teacher: {
              id: 202,
              name: 'أ. سارة أحمد',
              avatar: '',
              rating: 4.9,
              completedRequests: 32,
              specialization: 'ماجستير في تعليم الرياضيات'
            }
          }
        ];
        
        const foundRequest = mockRequests.find(r => r.id === parseInt(requestId));
        
        if (foundRequest) {
          setRequest(foundRequest);
          // جلب العروض المرتبطة بالطلب
          const requestOffers = mockOffers.filter(o => o.requestId === parseInt(requestId));
          setOffers(requestOffers);
        } else {
          setError('الطلب غير موجود');
        }
      } catch (err) {
        console.error('خطأ في جلب بيانات الطلب:', err);
        setError('حدث خطأ أثناء جلب بيانات الطلب');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequestDetails();
  }, [requestId]);
  
  // فتح نافذة تقديم عرض جديد
  const handleOpenOfferDialog = () => {
    if (!currentUser) {
      // إذا لم يكن المستخدم مسجل دخول، توجيهه إلى صفحة تسجيل الدخول
      navigate('/login', { state: { from: `/requests/${requestId}` } });
      return;
    }
    
    // التحقق من أن المستخدم معلم
    if (!hasRole('teacher')) {
      alert('يجب أن تكون معلماً لتقديم عرض');
      return;
    }
    
    setOfferDialogOpen(true);
  };
  
  // إغلاق نافذة تقديم عرض جديد
  const handleCloseOfferDialog = () => {
    setOfferDialogOpen(false);
    // إعادة تعيين بيانات العرض الجديد
    setNewOffer({
      price: '',
      description: '',
      duration: ''
    });
    setOfferError(null);
  };
  
  // تغيير بيانات العرض الجديد
  const handleOfferChange = (event) => {
    const { name, value } = event.target;
    setNewOffer({
      ...newOffer,
      [name]: value
    });
  };
  
  // تقديم عرض جديد
  const handleSubmitOffer = async () => {
    // التحقق من صحة البيانات
    if (!newOffer.price || !newOffer.description || !newOffer.duration) {
      setOfferError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    setOfferSubmitting(true);
    setOfferError(null);
    
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // محاكاة إضافة عرض جديد
      const newOfferData = {
        id: Math.floor(Math.random() * 1000) + 200,
        requestId: parseInt(requestId),
        price: parseFloat(newOffer.price),
        currency: request.currency,
        description: newOffer.description,
        duration: newOffer.duration,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        teacher: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar || '',
          rating: 4.7, // قيمة افتراضية للمحاكاة
          completedRequests: 15, // قيمة افتراضية للمحاكاة
          specialization: 'معلم متخصص'
        }
      };
      
      // إضافة العرض الجديد إلى قائمة العروض
      setOffers([...offers, newOfferData]);
      
      // إغلاق نافذة تقديم العرض
      handleCloseOfferDialog();
      
      // عرض رسالة نجاح
      alert('تم تقديم العرض بنجاح');
    } catch (err) {
      console.error('خطأ في تقديم العرض:', err);
      setOfferError('حدث خطأ أثناء تقديم العرض');
    } finally {
      setOfferSubmitting(false);
    }
  };
  
  // قبول عرض
  const handleAcceptOffer = (offerId) => {
    // التحقق من أن المستخدم هو صاحب الطلب أو أدمن
    if (!currentUser || (currentUser.id !== request.student.id && !hasRole('admin'))) {
      alert('ليس لديك صلاحية لقبول العرض');
      return;
    }
    
    // محاكاة قبول العرض
    const updatedOffers = offers.map(offer => {
      if (offer.id === offerId) {
        return { ...offer, status: 'accepted' };
      } else {
        return { ...offer, status: 'rejected' };
      }
    });
    
    setOffers(updatedOffers);
    setRequest({ ...request, status: 'assigned' });
    
    // عرض رسالة نجاح
    alert('تم قبول العرض بنجاح');
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
  
  // استخدام صورة افتراضية للمستخدم
  const getAvatarUrl = (user) => {
    return user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=128`;
  };
  
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
          <Button component={RouterLink} to="/requests" variant="contained">
            العودة إلى الطلبات
          </Button>
        </Box>
      </Container>
    );
  }
  
  if (!request) {
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
          <Link underline="hover" color="inherit" component={RouterLink} to="/requests">
            الطلبات الخاصة
          </Link>
          <Typography color="text.primary">
            {request.title}
          </Typography>
        </Breadcrumbs>
        
        {/* معلومات الطلب */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {request.title}
            </Typography>
            <Chip 
              label={getFilterText('status', request.status)} 
              color={request.status === 'open' ? 'success' : 'primary'} 
              sx={{ fontWeight: 'bold' }} 
            />
          </Box>
          
          <Typography variant="body1" paragraph>
            {request.description}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                متطلبات الطلب
              </Typography>
              <List>
                {request.requirements.map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  معلومات الطلب
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="المادة والمرحلة" 
                      secondary={`${getFilterText('subject', request.subject)} - ${getFilterText('level', request.level)}`} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="الموعد النهائي" 
                      secondary={formatDate(request.deadline)} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="الميزانية" 
                      secondary={`${request.budget} ${request.currency}`} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="الطالب" 
                      secondary={request.student.name} 
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        
        {/* قسم العروض */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" component="h2">
              العروض المقدمة ({offers.length})
            </Typography>
            
            {request.status === 'open' && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<LocalOfferIcon />}
                onClick={handleOpenOfferDialog}
                disabled={currentUser && currentUser.id === request.student.id}
              >
                تقديم عرض
              </Button>
            )}
          </Box>
          
          {offers.length > 0 ? (
            <Grid container spacing={3}>
              {offers.map((offer) => (
                <Grid item xs={12} key={offer.id}>
                  <Card 
                    elevation={2}
                    sx={{
                      borderLeft: '4px solid',
                      borderColor: offer.status === 'accepted' ? 'success.main' : 
                                  offer.status === 'rejected' ? 'error.main' : 'primary.main'
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <Avatar 
                              src={getAvatarUrl(offer.teacher)} 
                              alt={offer.teacher.name}
                              sx={{ width: 56, height: 56, mr: 2 }}
                            />
                            <Box>
                              <Typography variant="h6">
                                {offer.teacher.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {offer.teacher.specialization}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip 
                                  label={`${offer.teacher.rating} ★`} 
                                  size="small" 
                                  color="primary" 
                                  variant="outlined" 
                                  sx={{ mr: 1 }} 
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {offer.teacher.completedRequests} طلب مكتمل
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Typography variant="body1" paragraph>
                            {offer.description}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                              {offer.price} {offer.currency}
                            </Typography>
                            
                            <Typography variant="body2" gutterBottom>
                              مدة التنفيذ: {offer.duration}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              تاريخ التقديم: {formatDate(offer.createdAt)}
                            </Typography>
                            
                            {offer.status === 'accepted' && (
                              <Chip 
                                label="تم قبول العرض" 
                                color="success" 
                                sx={{ mt: 1 }} 
                              />
                            )}
                            
                            {offer.status === 'rejected' && (
                              <Chip 
                                label="تم رفض العرض" 
                                color="error" 
                                sx={{ mt: 1 }} 
                              />
                            )}
                          </Paper>
                        </Grid>
                      </Grid>
                    </CardContent>
                    
                    {request.status === 'open' && offer.status === 'pending' && 
                     currentUser && (currentUser.id === request.student.id || hasRole('admin')) && (
                      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleAcceptOffer(offer.id)}
                        >
                          قبول العرض
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                لا توجد عروض مقدمة حتى الآن
              </Typography>
              {request.status === 'open' && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LocalOfferIcon />}
                  onClick={handleOpenOfferDialog}
                  sx={{ mt: 2 }}
                  disabled={currentUser && currentUser.id === request.student.id}
                >
                  كن أول من يقدم عرضاً
                </Button>
              )}
            </Paper>
          )}
        </Box>
        
        {/* نافذة تقديم عرض جديد */}
        <Dialog open={offerDialogOpen} onClose={handleCloseOfferDialog} maxWidth="md" fullWidth>
          <DialogTitle>تقديم عرض جديد</DialogTitle>
          <DialogContent>
            {offerError && (
              <Alert severity="error" sx={{ mb: 2 }}>{offerError}</Alert>
            )}
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="السعر المقترح"
                  name="price"
                  type="number"
                  value={newOffer.price}
                  onChange={handleOfferChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{request.currency}</InputAdornment>,
                  }}
                  helperText={`الميزانية المقترحة: ${request.budget} ${request.currency}`}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="مدة التنفيذ"
                  name="duration"
                  value={newOffer.duration}
                  onChange={handleOfferChange}
                  placeholder="مثال: 3 أيام"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="تفاصيل العرض"
                  name="description"
                  value={newOffer.description}
                  onChange={handleOfferChange}
                  multiline
                  rows={4}
                  placeholder="اشرح كيف ستنفذ الطلب وما الذي يميز عرضك"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOfferDialog}>إلغاء</Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmitOffer}
              disabled={offerSubmitting}
              startIcon={offerSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
            >
              {offerSubmitting ? 'جاري التقديم...' : 'تقديم العرض'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default RequestDetailsPage;