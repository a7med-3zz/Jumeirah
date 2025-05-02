import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  School,
  Assignment,
  Chat,
  Person,
  Assessment,
  Settings,
} from '@mui/icons-material';

// Dashboard Components
const StudentDashboard = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'الرياضيات للصف الأول الثانوي',
      progress: 75,
      lastLesson: 'التفاضل والتكامل',
      nextLesson: 'المعادلات التفاضلية',
      image: '/images/math.jpg',
    },
    // Add more courses
  ];

  const activeRequests = [
    {
      id: 1,
      title: 'شرح درس التفاضل والتكامل',
      status: 'قيد المراجعة',
      offers: 3,
      deadline: '2024-04-01',
    },
    // Add more requests
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        مرحباً، محمد
      </Typography>

      {/* Enrolled Courses */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        الكورسات المسجلة
      </Typography>
      <Grid container spacing={3}>
        {enrolledCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    التقدم: {course.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  آخر درس: {course.lastLesson}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  الدرس القادم: {course.nextLesson}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  href={`/courses/${course.id}`}
                >
                  متابعة الكورس
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Active Requests */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        الطلبات النشطة
      </Typography>
      <List>
        {activeRequests.map((request) => (
          <ListItem
            key={request.id}
            component={Paper}
            sx={{ mb: 2, p: 2 }}
          >
            <ListItemText
              primary={request.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.secondary">
                    الحالة: {request.status}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    عدد العروض: {request.offers}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    الموعد النهائي: {request.deadline}
                  </Typography>
                </>
              }
            />
            <Button
              variant="outlined"
              href={`/requests/${request.id}`}
            >
              عرض التفاصيل
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const TeacherDashboard = () => {
  const myCourses = [
    {
      id: 1,
      title: 'الرياضيات للصف الأول الثانوي',
      students: 45,
      rating: 4.8,
      image: '/images/math.jpg',
    },
    // Add more courses
  ];

  const pendingOffers = [
    {
      id: 1,
      title: 'شرح درس التفاضل والتكامل',
      student: 'محمد أحمد',
      budget: '200',
      deadline: '2024-04-01',
    },
    // Add more offers
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        مرحباً، أ. أحمد
      </Typography>

      {/* My Courses */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        كورساتي
      </Typography>
      <Grid container spacing={3}>
        {myCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`${course.students} طالب`}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`تقييم ${course.rating}`}
                    size="small"
                    color="primary"
                  />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  href={`/courses/${course.id}/manage`}
                >
                  إدارة الكورس
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pending Offers */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        العروض المعلقة
      </Typography>
      <List>
        {pendingOffers.map((offer) => (
          <ListItem
            key={offer.id}
            component={Paper}
            sx={{ mb: 2, p: 2 }}
          >
            <ListItemText
              primary={offer.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.secondary">
                    الطالب: {offer.student}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    الميزانية: {offer.budget} ريال
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    الموعد النهائي: {offer.deadline}
                  </Typography>
                </>
              }
            />
            <Button
              variant="outlined"
              href={`/requests/${offer.id}`}
            >
              عرض التفاصيل
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const AdminDashboard = () => {
  const pendingCourses = [
    {
      id: 1,
      title: 'الرياضيات للصف الأول الثانوي',
      teacher: 'أ. أحمد محمد',
      submittedAt: '2024-03-15',
    },
    // Add more courses
  ];

  const pendingRequests = [
    {
      id: 1,
      title: 'شرح درس التفاضل والتكامل',
      student: 'محمد أحمد',
      offers: 3,
      submittedAt: '2024-03-15',
    },
    // Add more requests
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        لوحة تحكم الأدمن
      </Typography>

      {/* Pending Courses */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        الكورسات المعلقة
      </Typography>
      <List>
        {pendingCourses.map((course) => (
          <ListItem
            key={course.id}
            component={Paper}
            sx={{ mb: 2, p: 2 }}
          >
            <ListItemText
              primary={course.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.secondary">
                    المعلم: {course.teacher}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    تاريخ التقديم: {course.submittedAt}
                  </Typography>
                </>
              }
            />
            <Box>
              <Button
                variant="outlined"
                color="success"
                sx={{ mr: 1 }}
              >
                موافقة
              </Button>
              <Button
                variant="outlined"
                color="error"
              >
                رفض
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Pending Requests */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        الطلبات المعلقة
      </Typography>
      <List>
        {pendingRequests.map((request) => (
          <ListItem
            key={request.id}
            component={Paper}
            sx={{ mb: 2, p: 2 }}
          >
            <ListItemText
              primary={request.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.secondary">
                    الطالب: {request.student}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    عدد العروض: {request.offers}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    تاريخ التقديم: {request.submittedAt}
                  </Typography>
                </>
              }
            />
            <Button
              variant="outlined"
              href={`/requests/${request.id}`}
            >
              عرض التفاصيل
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [userRole] = useState('student'); // This should come from your auth context

  const tabs = [
    { label: 'الرئيسية', icon: <School /> },
    { label: 'الكورسات', icon: <Assignment /> },
    { label: 'المحادثات', icon: <Chat /> },
    { label: 'الملف الشخصي', icon: <Person /> },
    { label: 'التقارير', icon: <Assessment /> },
    { label: 'الإعدادات', icon: <Settings /> },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Tabs
              orientation="vertical"
              value={currentTab}
              onChange={handleTabChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  label={tab.label}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            {userRole === 'student' && <StudentDashboard />}
            {userRole === 'teacher' && <TeacherDashboard />}
            {userRole === 'admin' && <AdminDashboard />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 