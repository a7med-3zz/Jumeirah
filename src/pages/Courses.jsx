import { useState } from 'react';
import { useCountry } from '../context/CountryContext';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Rating,
  Chip,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Courses = () => {
  const [filters, setFilters] = useState({
    grade: '',
    subject: '',
    term: '',
    search: '',
  });
  const { country } = useCountry();

  // Mock data for demonstration
  const grades = ['ابتدائي', 'إعدادي', 'ثانوي'];
  const subjects = ['رياضيات', 'علوم', 'لغة عربية', 'لغة إنجليزية'];
  const terms = ['الترم الأول', 'الترم الثاني'];

  const courses = [
    {
      id: 1,
      title: 'الرياضيات للصف الأول الثانوي',
      description: 'شرح شامل لمنهج الرياضيات للصف الأول الثانوي',
      rating: 4.5,
      teacher: 'أ. أحمد محمد',
      country: 'مصر',
      grade: 'ثانوي',
      subject: 'رياضيات',
      term: 'الترم الأول',
    },
    {
      id: 2,
      title: 'العلوم للصف الثاني الإعدادي',
      description: 'شرح مبسط لمادة العلوم للصف الثاني الإعدادي',
      rating: 4.7,
      teacher: 'د. سارة علي',
      country: 'الإمارات',
      grade: 'إعدادي',
      subject: 'علوم',
      term: 'الترم الثاني',
    },
    {
      id: 3,
      title: 'اللغة العربية للصف الثالث الابتدائي',
      description: 'أساسيات وقواعد اللغة العربية للصف الثالث الابتدائي',
      rating: 4.8,
      teacher: 'أ. محمود حسن',
      country: 'الكويت',
      grade: 'ابتدائي',
      subject: 'لغة عربية',
      term: 'الترم الأول',
    },
    {
      id: 4,
      title: 'اللغة الإنجليزية للصف الأول الثانوي',
      description: 'تطوير مهارات اللغة الإنجليزية للصف الأول الثانوي',
      rating: 4.6,
      teacher: 'أ. ليلى يوسف',
      country: 'مصر',
      grade: 'ثانوي',
      subject: 'لغة إنجليزية',
      term: 'الترم الثاني',
    },
    // Add more mock courses here
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Helper to get image based on subject
  function getCourseImage(subject) {
    if (subject === 'رياضيات') return '/images/math.jpg';
    if (subject === 'علوم') return '/images/science.jpg';
    if (subject === 'لغة عربية') return '/images/arabic.jpg';
    if (subject === 'لغة إنجليزية') return '/images/english.jpg';
    return '/images/course-default.jpg';
  }

  // Filter courses by selected country and other filters
  const filteredCourses = courses.filter((course) => {
    if (!country) return false;
    if (course.country !== countryName(country)) return false;
    if (filters.grade && course.grade !== filters.grade) return false;
    if (filters.subject && course.subject !== filters.subject) return false;
    if (filters.term && course.term !== filters.term) return false;
    if (filters.search && !course.title.includes(filters.search)) return false;
    return true;
  });

  function countryName(code) {
    if (code === 'egypt') return 'مصر';
    if (code === 'uae') return 'الإمارات';
    if (code === 'kuwait') return 'الكويت';
    return '';
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4 }}>
        الكورسات التعليمية
      </Typography>

      {!country && (
        <Box sx={{ textAlign: 'center', my: 6 }}>
          <Typography variant="h6" color="error">
            يرجى اختيار الدولة أولاً من الأعلى لعرض الكورسات المتاحة.
          </Typography>
        </Box>
      )}

      {country && (
        <>
          {/* Filters Section (without country) */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>المرحلة</InputLabel>
                  <Select
                    name="grade"
                    value={filters.grade}
                    onChange={handleFilterChange}
                    label="المرحلة"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {grades.map((grade) => (
                      <MenuItem key={grade} value={grade}>
                        {grade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>المادة</InputLabel>
                  <Select
                    name="subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    label="المادة"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>الترم</InputLabel>
                  <Select
                    name="term"
                    value={filters.term}
                    onChange={handleFilterChange}
                    label="الترم"
                  >
                    <MenuItem value="">الكل</MenuItem>
                    {terms.map((term) => (
                      <MenuItem key={term} value={term}>
                        {term}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Courses Grid */}
          <Grid container spacing={4}>
            {filteredCourses.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" align="center">
                  لا توجد كورسات متاحة لهذه الدولة أو الفلاتر المختارة.
                </Typography>
              </Grid>
            )}
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={getCourseImage(course.subject)}
                    alt={course.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {course.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Rating value={course.rating} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary">
                        ({course.rating})
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Chip label={course.country} size="small" sx={{ mr: 1 }} />
                      <Chip label={course.grade} size="small" sx={{ mr: 1 }} />
                      <Chip label={course.subject} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      المعلم: {course.teacher}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to={`/courses/${course.id}`}
                      sx={{ mt: 2 }}
                    >
                      عرض التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Courses; 