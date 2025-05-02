import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, List, ListItemButton, ListItemText, Divider, Button, Chip, Stack, Card, CardContent, Link } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

// بيانات وهمية للكورس
const course = {
  title: 'أساسيات البرمجة بلغة جافاسكريبت',
  instructor: 'م. أحمد علي',
  rating: 4.8,
  students: 1200,
  description: 'تعلم أساسيات البرمجة بلغة جافاسكريبت من الصفر حتى الاحتراف مع تطبيقات عملية وأمثلة واقعية.',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  files: [
    { name: 'ملخص الدرس الأول.pdf', url: '#' },
    { name: 'تمارين إضافية.docx', url: '#' },
  ],
  lessons: [
    { id: 1, title: 'مقدمة عن البرمجة', video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '5:12' },
    { id: 2, title: 'المتغيرات وأنواع البيانات', video: 'https://www.w3schools.com/html/movie.mp4', duration: '8:30' },
    { id: 3, title: 'الجمل الشرطية', video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '7:45' },
    { id: 4, title: 'الحلقات التكرارية', video: 'https://www.w3schools.com/html/movie.mp4', duration: '6:20' },
    { id: 5, title: 'الدوال', video: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '9:10' },
  ],
};

const CourseDetails = () => {
  const theme = useTheme();
  const [selectedLesson, setSelectedLesson] = useState(course.lessons[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // for large screens

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <Grid container spacing={4} sx={{ mt: 2, mb: 4 }}>
      {/* Side Menu for large screens, Drawer for small screens */}
      {/* Sidebar for md+ screens */}
      <Grid item xs={12} md={sidebarOpen ? 4 : 1} lg={sidebarOpen ? 3 : 1} sx={{ display: { xs: 'none', md: 'block' }, transition: 'width 0.3s' }}>
        <Box sx={{ position: 'sticky', top: 90, zIndex: 1100 }}>
          {sidebarOpen && (
            <Paper elevation={4} sx={{ p: 2, borderRadius: 3, boxShadow: 6, animation: 'fadeInSidebar 0.3s' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                <PlayCircleOutlineIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> قائمة الدروس
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <List>
                {course.lessons.map((lesson) => (
                  <ListItemButton
                    key={lesson.id}
                    selected={selectedLesson.id === lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    sx={{ borderRadius: 2, mb: 1 }}
                  >
                    <ListItemText
                      primary={lesson.title}
                      secondary={`المدة: ${lesson.duration}`}
                      primaryTypographyProps={{ fontWeight: selectedLesson.id === lesson.id ? 700 : 500 }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Grid>
      {/* Drawer for xs/sm screens */}
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button onClick={handleDrawerToggle} variant="outlined" startIcon={<MenuIcon />}>
            قائمة الدروس
          </Button>
        </Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { width: 300, p: 2 },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Button onClick={handleDrawerToggle} startIcon={<CloseIcon />} fullWidth variant="outlined" sx={{ mb: 2 }}>
              إغلاق
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              <PlayCircleOutlineIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> قائمة الدروس
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
              {course.lessons.map((lesson) => (
                <ListItemButton
                  key={lesson.id}
                  selected={selectedLesson.id === lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    handleDrawerToggle();
                  }}
                  sx={{ borderRadius: 2, mb: 1 }}
                >
                  <ListItemText
                    primary={lesson.title}
                    secondary={`المدة: ${lesson.duration}`}
                    primaryTypographyProps={{ fontWeight: selectedLesson.id === lesson.id ? 700 : 500 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </Grid>
      {/* Main Content */}
      <Grid item xs={12} md={sidebarOpen ? 8 : 11} lg={sidebarOpen ? 9 : 11} sx={{ transition: 'width 0.3s', position: 'relative' }}>
        {/* Floating IconButton for sidebar toggle (large screens only) */}
        <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1201, display: { xs: 'none', md: 'block' } }}>
          <IconButton
            onClick={handleSidebarToggle}
            color="primary"
            size="large"
            sx={{ bgcolor: 'background.paper', boxShadow: 2, border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'grey.100' } }}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Paper elevation={4} sx={{ p: { xs: 1, sm: 3 }, borderRadius: 3, mb: 3 }}>
          {/* Video */}
          <Box sx={{ width: '100%', aspectRatio: '16/9', mb: 2, borderRadius: 2, overflow: 'hidden', background: theme.palette.grey[900], transition: 'width 0.3s', position: 'relative' }}>
            {/* The IconButton is now outside the video box for better UX */}
            <video
              src={selectedLesson.video}
              controls
              style={{ width: '100%', height: '100%', background: '#000' }}
              poster="/images/Home Page 1.png"
            />
          </Box>
          {/* تفاصيل الدرس */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {selectedLesson.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {course.description}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip label={course.instructor} color="primary" variant="outlined" />
            <Chip icon={<StarIcon sx={{ color: 'gold' }} />} label={course.rating} variant="outlined" />
            <Chip label={`عدد الطلاب: ${course.students}`} variant="outlined" />
          </Stack>
          {/* ملفات التحميل */}
          {course.files && course.files.length > 0 && (
            <Card variant="outlined" sx={{ mb: 2, bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  <DescriptionIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> ملفات للتحميل
                </Typography>
                <Stack direction="row" spacing={2}>
                  {course.files.map((file, idx) => (
                    <Button
                      key={idx}
                      variant="contained"
                      color="secondary"
                      startIcon={<DownloadIcon />}
                      href={file.url}
                      download
                      sx={{ borderRadius: 2 }}
                    >
                      {file.name}
                    </Button>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

// Add fadeInSidebar animation
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeInSidebar { from { opacity: 0; transform: translateX(40px);} to { opacity: 1; transform: none;} }`;
document.head.appendChild(style);

export default CourseDetails; 