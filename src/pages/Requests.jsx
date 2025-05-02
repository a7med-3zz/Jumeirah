import { useState } from 'react';
import { useCountry } from '../context/CountryContext';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Rating,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const Requests = () => {
  const { country } = useCountry();
  const [openDialog, setOpenDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    grade: '',
    subject: '',
    deadline: '',
    budget: '',
  });

  // Mock data for demonstration
  const grades = ['ابتدائي', 'إعدادي', 'ثانوي'];
  const subjects = ['رياضيات', 'علوم', 'لغة عربية', 'لغة إنجليزية'];

  const requests = [
    {
      id: 1,
      title: 'شرح درس التفاضل والتكامل',
      description: 'أحتاج شرح مفصل لدرس التفاضل والتكامل للصف الثالث الثانوي',
      country: 'مصر',
      grade: 'ثانوي',
      subject: 'رياضيات',
      deadline: '2024-04-01',
      budget: '200',
      status: 'مفتوح',
      student: {
        name: 'محمد أحمد',
        avatar: '/images/avatar.jpg',
        rating: 4.5,
      },
      offers: 3,
    },
    // Add more mock requests here
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitRequest = () => {
    // Handle request submission
    // The country is set automatically
    console.log('New request:', { ...newRequest, country: countryName(country) });
    handleCloseDialog();
  };

  function countryName(code) {
    if (code === 'egypt') return 'مصر';
    if (code === 'uae') return 'الإمارات';
    if (code === 'kuwait') return 'الكويت';
    return '';
  }

  // Filter requests by selected country
  const filteredRequests = requests.filter((request) => {
    if (!country) return false;
    return request.country === countryName(country);
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1">
          الطلبات الخاصة
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          disabled={!country}
        >
          طلب جديد
        </Button>
      </Box>

      {!country && (
        <Box sx={{ textAlign: 'center', my: 6 }}>
          <Typography variant="h6" color="error">
            يرجى اختيار الدولة أولاً من الأعلى لعرض الطلبات أو إضافة طلب جديد.
          </Typography>
        </Box>
      )}

      {country && (
        <>
          {/* Requests Grid */}
          <Grid container spacing={4}>
            {filteredRequests.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" align="center">
                  لا توجد طلبات متاحة لهذه الدولة.
                </Typography>
              </Grid>
            )}
            {filteredRequests.map((request) => (
              <Grid item xs={12} key={request.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h5" gutterBottom>
                          {request.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          {request.description}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Chip label={request.country} size="small" sx={{ mr: 1 }} />
                          <Chip label={request.grade} size="small" sx={{ mr: 1 }} />
                          <Chip label={request.subject} size="small" sx={{ mr: 1 }} />
                          <Chip
                            label={`${request.offers} عروض`}
                            color="primary"
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          الموعد النهائي: {request.deadline}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          الميزانية: {request.budget} ريال
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={request.student.avatar}
                            alt={request.student.name}
                            sx={{ mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1">
                              {request.student.name}
                            </Typography>
                            <Rating
                              value={request.student.rating}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          fullWidth
                          href={`/requests/${request.id}`}
                        >
                          عرض التفاصيل
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* New Request Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>طلب جديد</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="عنوان الطلب"
                    name="title"
                    value={newRequest.title}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="وصف الطلب"
                    name="description"
                    value={newRequest.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>المرحلة</InputLabel>
                    <Select
                      name="grade"
                      value={newRequest.grade}
                      onChange={handleInputChange}
                      label="المرحلة"
                    >
                      {grades.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>المادة</InputLabel>
                    <Select
                      name="subject"
                      value={newRequest.subject}
                      onChange={handleInputChange}
                      label="المادة"
                    >
                      {subjects.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="الموعد النهائي"
                    name="deadline"
                    type="date"
                    value={newRequest.deadline}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="الميزانية (ريال)"
                    name="budget"
                    type="number"
                    value={newRequest.budget}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>إلغاء</Button>
              <Button onClick={handleSubmitRequest} variant="contained">
                إرسال الطلب
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default Requests; 