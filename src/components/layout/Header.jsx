import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';

// استيراد سياق المصادقة
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { currentUser, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const navigateToDashboard = () => {
    if (hasRole('admin')) {
      navigate('/admin-dashboard');
    } else if (hasRole('teacher')) {
      navigate('/teacher-dashboard');
    } else {
      navigate('/student-dashboard');
    }
    handleCloseUserMenu();
  };

  // قائمة الصفحات الرئيسية
  const pages = [
    { title: 'الرئيسية', path: '/' },
    { title: 'الكورسات', path: '/courses' },
    { title: 'الطلبات الخاصة', path: '/requests' }
  ];

  // إشعارات وهمية للعرض
  const notifications = [
    { id: 1, text: 'تم قبول طلبك الخاص', read: false },
    { id: 2, text: 'تم إضافة كورس جديد في الرياضيات', read: false },
    { id: 3, text: 'لديك رسالة جديدة من المعلم أحمد', read: true }
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'primary.main', boxShadow: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* شعار للشاشات الكبيرة */}
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            منصة جوميرا
          </Typography>

          {/* زر القائمة للشاشات الصغيرة */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="فتح القائمة"
              onClick={toggleSidebar}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* شعار للشاشات الصغيرة */}
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            جوميرا
          </Typography>

          {/* روابط التنقل للشاشات الكبيرة */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={RouterLink}
                to={page.path}
                sx={{ mx: 1, color: 'text.primary', '&:hover': { color: 'primary.main' } }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* قسم المستخدم والإشعارات */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {currentUser ? (
              <>
                {/* زر الإشعارات */}
                <Tooltip title="الإشعارات">
                  <IconButton onClick={handleOpenNotifications} sx={{ ml: 1 }}>
                    <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                
                {/* قائمة الإشعارات */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="notifications-menu"
                  anchorEl={anchorElNotifications}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNotifications)}
                  onClose={handleCloseNotifications}
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <MenuItem key={notification.id} onClick={handleCloseNotifications}
                        sx={{
                          backgroundColor: notification.read ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
                          fontWeight: notification.read ? 'normal' : 'bold'
                        }}
                      >
                        <Typography textAlign="center">{notification.text}</Typography>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem onClick={handleCloseNotifications}>
                      <Typography textAlign="center">لا توجد إشعارات</Typography>
                    </MenuItem>
                  )}
                </Menu>

                {/* زر الملف الشخصي */}
                <Tooltip title="الإعدادات">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                    <Avatar alt={currentUser.name} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                
                {/* قائمة الملف الشخصي */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={navigateToDashboard}>
                    <Typography textAlign="center">لوحة التحكم</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                    <Typography textAlign="center">الملف الشخصي</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">تسجيل الخروج</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{ ml: 1 }}
                >
                  تسجيل الدخول
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                >
                  إنشاء حساب
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;