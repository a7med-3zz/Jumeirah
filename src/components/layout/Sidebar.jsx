import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// استيراد سياق المصادقة
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ open, onClose }) => {
  const { currentUser, hasRole } = useAuth();

  // قائمة الصفحات الرئيسية
  const mainPages = [
    { title: 'الرئيسية', path: '/', icon: <HomeIcon /> },
    { title: 'الكورسات', path: '/courses', icon: <SchoolIcon /> },
    { title: 'الطلبات الخاصة', path: '/requests', icon: <AssignmentIcon /> }
  ];

  // قائمة صفحات المستخدم
  const userPages = currentUser
    ? [
        {
          title: 'لوحة التحكم',
          path: hasRole('admin')
            ? '/admin-dashboard'
            : hasRole('teacher')
            ? '/teacher-dashboard'
            : '/student-dashboard',
          icon: <DashboardIcon />
        },
        { title: 'الملف الشخصي', path: '/profile', icon: <PersonIcon /> }
      ]
    : [
        { title: 'تسجيل الدخول', path: '/login', icon: <LoginIcon /> },
        { title: 'إنشاء حساب', path: '/register', icon: <AppRegistrationIcon /> }
      ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: 'background.paper'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', p: 1 }}>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Divider />
      
      {/* قائمة الصفحات الرئيسية */}
      <List>
        {mainPages.map((page) => (
          <ListItem key={page.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={page.path}
              onClick={onClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      {/* قائمة صفحات المستخدم */}
      <List>
        {userPages.map((page) => (
          <ListItem key={page.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={page.path}
              onClick={onClose}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;