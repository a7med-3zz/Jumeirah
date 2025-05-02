import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// استيراد المكونات الرئيسية
import Layout from './components/layout/Layout';

// استيراد الصفحات
import Home from './pages/Home';
import Courses from './pages/Courses';
import RequestsPage from './pages/RequestsPage';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import CourseDetails from './pages/CourseDetails';
import NotFoundPage from './pages/NotFoundPage';
// إضافة استيراد صفحات auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RequestDetailsPage from './pages/RequestDetailsPage';

// استيراد سياق الدولة
import { CountryProvider } from './context/CountryContext';
// استيراد سياق الوضع الليلي
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const themeOptions = (mode) => ({
  direction: 'rtl',
  typography: {
    fontFamily: 'Cairo, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  palette: {
    mode,
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
    ...(mode === 'dark' && {
      background: {
        default: '#181a20',
        paper: '#23272f',
      },
      text: {
        primary: '#fff',
        secondary: '#b0b3b8',
      },
    }),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease-in-out',
        },
      },
    },
  },
});

function AppContent() {
  const { mode } = useThemeMode();
  const theme = createTheme(themeOptions(mode));
  return (
    <CountryProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="requests" element={<RequestsPage />} />
              <Route path="requests/:id" element={<RequestDetailsPage />} />
              <Route path="chat" element={<Chat />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="about" element={<About />} />
              <Route path="courses/:id" element={<CourseDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </CountryProvider>
  );
}

export default AppContent;