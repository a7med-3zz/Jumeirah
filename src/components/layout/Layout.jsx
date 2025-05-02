import { useState, useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  Assignment,
  Dashboard,
  Chat,
  Person,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Apps as AppsIcon,
} from '@mui/icons-material';
import { useCountry } from '../../context/CountryContext';
import { useThemeMode } from '../../context/ThemeModeContext';
import Switch from '@mui/material/Switch';

const countries = [
  { code: 'egypt', name: 'مصر', flag: '/images/egypt.png' },
  { code: 'uae', name: 'الإمارات', flag: '/images/UAE.png' },
  { code: 'kuwait', name: 'الكويت', flag: '/images/Kwait.png' },
];

const Layout = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElCountry, setAnchorElCountry] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { country, setCountry } = useCountry();
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCountryMenu = (event) => {
    setAnchorElCountry(event.currentTarget);
  };

  const handleCloseCountryMenu = () => {
    setAnchorElCountry(null);
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleSelectCountry = (code) => {
    setCountry(code);
    handleCloseCountryMenu();
    window.location.replace('/');
  };

  const menuItems = [
    { text: 'الكورسات', icon: <School />, path: '/courses' },
    { text: 'الطلبات', icon: <Assignment />, path: '/requests' },
    { text: 'لوحة التحكم', icon: <Dashboard />, path: '/dashboard' },
    { text: 'المحادثات', icon: <Chat />, path: '/chat' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component="a" href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const selectedCountry = countries.find((c) => c.code === country);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ px: { xs: 0, md: 2 }, overflowX: 'auto' }}>
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 64,
              px: { xs: 1, md: 3 },
              overflowX: 'auto',
            }}
          >
            {/* Right: Auth (login) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: 'flex-start' }}>
              {!isMobile && (
                <Button
                  color="inherit"
                  startIcon={selectedCountry ? (
                    <Box
                      component="img"
                      src={selectedCountry.flag}
                      alt={selectedCountry.name}
                      sx={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', boxShadow: 1, border: '2px solid #fff' }}
                    />
                  ) : (
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.300' }} />
                  )}
                  onClick={handleOpenCountryMenu}
                  sx={{ fontWeight: 600, minWidth: 120, justifyContent: 'flex-start' }}
                >
                  {selectedCountry ? selectedCountry.name : 'اختر الدولة'}
                </Button>
              )}
              <Menu
                anchorEl={anchorElCountry}
                open={Boolean(anchorElCountry)}
                onClose={handleCloseCountryMenu}
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} onClick={() => handleSelectCountry(c.code)}>
                    <Box
                      component="img"
                      src={c.flag}
                      alt={c.name}
                      sx={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', mr: 1, boxShadow: 1, border: '2px solid #eee' }}
                    />
                    {c.name}
                  </MenuItem>
                ))}
              </Menu>
              <Button color="inherit" component={RouterLink} to="/login" sx={{ fontWeight: 600 }}>
                تسجيل الدخول
              </Button>
            </Box>

            {/* Center: Logo + Title */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component={RouterLink}
                  to="/"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 2,
                    background: mode === 'light' ? 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)' : 'transparent',
                    boxShadow: mode === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: mode === 'light' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={mode === 'dark' ? "/images/logo.png" : "/images/logo.png"}
                    alt="شعار جوميرا"
                    sx={{ 
                      width: { xs: 56, sm: 72, md: 90 }, 
                      height: 'auto', 
                      ml: 1,
                      filter: mode === 'light' ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Left: Menu (or nav links on desktop) */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
              {isMobile ? (
                <>
                  <IconButton color="inherit" onClick={handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton color="inherit" onClick={handleOpenNavMenu}>
                    <AppsIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  >
                    {menuItems.map((item) => (
                      <MenuItem key={item.text} component={RouterLink} to={item.path} onClick={handleCloseNavMenu}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
              {/* زر تغيير المود كسويتش يظهر في كل الشاشات */}
              <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <LightModeIcon sx={{ color: mode === 'light' ? 'gold' : 'grey.500', fontSize: 20 }} />
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleMode}
                  color="primary"
                  inputProps={{ 'aria-label': 'تغيير الوضع الليلي/النهاري' }}
                />
                <DarkModeIcon sx={{ color: mode === 'dark' ? '#90caf9' : 'grey.500', fontSize: 20 }} />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={RouterLink} to={item.path} onClick={handleDrawerToggle}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <Box sx={{ my: 2 }} />
            {/* الدولة والمود في القائمة الجانبية فقط على الموبايل */}
            {isMobile && (
              <>
                <ListItem button onClick={handleOpenCountryMenu}>
                  <ListItemIcon>
                    {selectedCountry ? (
                      <Box
                        component="img"
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        sx={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', boxShadow: 1, border: '2px solid #fff' }}
                      />
                    ) : (
                      <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'grey.300' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={selectedCountry ? selectedCountry.name : 'اختر الدولة'} />
                </ListItem>
                <Menu
                  anchorEl={anchorElCountry}
                  open={Boolean(anchorElCountry)}
                  onClose={handleCloseCountryMenu}
                >
                  {countries.map((c) => (
                    <MenuItem key={c.code} onClick={() => handleSelectCountry(c.code)}>
                      <Box
                        component="img"
                        src={c.flag}
                        alt={c.name}
                        sx={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', mr: 1, boxShadow: 1, border: '2px solid #eee' }}
                      />
                      {c.name}
                    </MenuItem>
                  ))}
                </Menu>
                <ListItem button onClick={toggleMode}>
                  <ListItemIcon>
                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={mode === 'dark' ? 'الوضع الليلي' : 'الوضع الفاتح'} />
                </ListItem>
                <ListItem button component={RouterLink} to="/login" onClick={handleDrawerToggle}>
                  <ListItemIcon><Person /></ListItemIcon>
                  <ListItemText primary="تسجيل الدخول" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, ml: 2 }}>
              تواصل معنا
            </Typography>
            <IconButton
              component="a"
              href="https://wa.me/201234567890"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#25D366', bgcolor: 'background.paper', border: '1px solid #25D366', ml: 1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.59 1.38 5.08L2 22l5.09-1.36A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18c-1.61 0-3.13-.39-4.45-1.08l-.32-.17-3.02.8.81-2.95-.17-.3A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8Zm4.29-5.38c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.13-.68-.6-1.14-1.34-1.28-1.57-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.08-.15.04-.28-.02-.4-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39-.13-.01-.28-.01-.43-.01-.15 0-.4.06-.61.28-.21.22-.8.78-.8 1.9 0 1.12.82 2.2.94 2.36.12.15 1.61 2.46 3.91 3.36.55.24.98.38 1.31.49.55.17 1.05.15 1.44.09.44-.07 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.28Z" fill="#25D366"/></svg>
            </IconButton>
            <IconButton
              component="a"
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#229ED9', bgcolor: 'background.paper', border: '1px solid #229ED9', ml: 1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.036 15.472l-.396 3.77c.567 0 .813-.244 1.11-.537l2.664-2.53 5.522 4.03c1.012.558 1.73.264 1.98-.937l3.59-16.8c.327-1.52-.553-2.12-1.54-1.76L2.36 9.13c-1.48.58-1.46 1.41-.253 1.78l4.59 1.43 10.66-6.7c.5-.32.96-.14.58.2l-8.63 7.8Z" fill="#229ED9"/></svg>
            </IconButton>
            <IconButton
              component={RouterLink}
              to="/chat"
              sx={{ color: 'primary.main', bgcolor: 'background.paper', border: '1px solid', borderColor: 'primary.main' }}
            >
              <Chat />
            </IconButton>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mx: 2 }}>
              © {new Date().getFullYear()} منصة جوميرا التعليمية. جميع الحقوق محفوظة
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;