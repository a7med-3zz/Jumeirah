import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email, Person } from '@mui/icons-material';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    userType: '',
    country: '',
    phone: '',
    bio: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirm = () => setShowConfirm((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق التسجيل لاحقًا
    alert(`تم إنشاء الحساب (واجهة فقط)\n\nالبيانات:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          إنشاء حساب جديد
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="user-type-label">نوع المستخدم</InputLabel>
            <Select
              labelId="user-type-label"
              id="userType"
              name="userType"
              value={form.userType}
              label="نوع المستخدم"
              onChange={handleChange}
            >
              <MenuItem value="">اختر النوع</MenuItem>
              <MenuItem value="student">طالب</MenuItem>
              <MenuItem value="teacher">معلم</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="country-label">الدولة</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="country"
              value={form.country}
              label="الدولة"
              onChange={handleChange}
            >
              <MenuItem value="">اختر الدولة</MenuItem>
              <MenuItem value="egypt">مصر</MenuItem>
              <MenuItem value="uae">الإمارات</MenuItem>
              <MenuItem value="kuwait">الكويت</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="الاسم الكامل"
            name="name"
            autoComplete="name"
            autoFocus
            value={form.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="البريد الإلكتروني"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="رقم الجوال (اختياري)"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="bio"
            label="نبذة عنك (اختياري)"
            name="bio"
            multiline
            minRows={2}
            value={form.bio}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="تأكيد كلمة المرور"
            type={showConfirm ? 'text' : 'password'}
            id="confirm"
            autoComplete="new-password"
            value={form.confirm}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirm} edge="end">
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            إنشاء حساب
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 