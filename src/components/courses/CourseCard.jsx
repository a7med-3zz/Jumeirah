import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  CardActionArea,
  CardActions,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

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

  // التوجه إلى صفحة تفاصيل الكورس
  const handleViewCourse = () => {
    navigate(`/courses/${course.id}`);
  };

  // استخدام صورة افتراضية في حالة عدم وجود صورة للكورس
  const defaultImage = 'https://via.placeholder.com/400x200?text=كورس+تعليمي';

  return (
    <Card 
      elevation={3} 
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
      <CardActionArea onClick={handleViewCourse}>
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
              sx={{ mr: 0.5, mb: 0.5 }} 
            />
            <Chip 
              label={getFilterText('term', course.term)} 
              size="small" 
              color="secondary" 
              sx={{ mb: 0.5 }} 
            />
          </Box>
          
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {course.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, height: '40px', overflow: 'hidden' }}>
            {course.description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {course.instructor}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {course.studentsCount} طالب
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <Divider />
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={course.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            ({course.rating})
          </Typography>
        </Box>
        
        <Typography variant="h6" color="primary.main">
          {course.price} {course.currency}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CourseCard;