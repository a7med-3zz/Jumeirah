import React from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

const CourseFilters = ({ filters, onFilterChange }) => {
  // قواميس البيانات للفلاتر
  const countries = [
    { value: 'egypt', label: 'مصر' },
    { value: 'uae', label: 'الإمارات' },
    { value: 'kuwait', label: 'الكويت' }
  ];

  const levels = {
    egypt: [
      { value: 'primary', label: 'المرحلة الابتدائية' },
      { value: 'middle', label: 'المرحلة الإعدادية' },
      { value: 'secondary', label: 'المرحلة الثانوية' }
    ],
    uae: [
      { value: 'primary', label: 'المرحلة الابتدائية' },
      { value: 'middle', label: 'المرحلة المتوسطة' },
      { value: 'secondary', label: 'المرحلة الثانوية' }
    ],
    kuwait: [
      { value: 'primary', label: 'المرحلة الابتدائية' },
      { value: 'middle', label: 'المرحلة المتوسطة' },
      { value: 'secondary', label: 'المرحلة الثانوية' }
    ]
  };

  const subjects = {
    primary: [
      { value: 'arabic', label: 'اللغة العربية' },
      { value: 'english', label: 'اللغة الإنجليزية' },
      { value: 'math', label: 'الرياضيات' },
      { value: 'science', label: 'العلوم' }
    ],
    middle: [
      { value: 'arabic', label: 'اللغة العربية' },
      { value: 'english', label: 'اللغة الإنجليزية' },
      { value: 'math', label: 'الرياضيات' },
      { value: 'science', label: 'العلوم' },
      { value: 'social', label: 'الدراسات الاجتماعية' }
    ],
    secondary: [
      { value: 'arabic', label: 'اللغة العربية' },
      { value: 'english', label: 'اللغة الإنجليزية' },
      { value: 'math', label: 'الرياضيات' },
      { value: 'physics', label: 'الفيزياء' },
      { value: 'chemistry', label: 'الكيمياء' },
      { value: 'biology', label: 'الأحياء' }
    ]
  };

  const terms = [
    { value: 'first', label: 'الترم الأول' },
    { value: 'second', label: 'الترم الثاني' }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        تصفية الكورسات
      </Typography>
      <Grid container spacing={2}>
        {/* فلتر الدولة */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="country-label">الدولة</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="country"
              value={filters.country}
              label="الدولة"
              onChange={onFilterChange}
            >
              <MenuItem value="">الكل</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* فلتر المرحلة الدراسية */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth disabled={!filters.country}>
            <InputLabel id="level-label">المرحلة الدراسية</InputLabel>
            <Select
              labelId="level-label"
              id="level"
              name="level"
              value={filters.level}
              label="المرحلة الدراسية"
              onChange={onFilterChange}
            >
              <MenuItem value="">الكل</MenuItem>
              {filters.country &&
                levels[filters.country].map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* فلتر المادة الدراسية */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth disabled={!filters.level}>
            <InputLabel id="subject-label">المادة الدراسية</InputLabel>
            <Select
              labelId="subject-label"
              id="subject"
              name="subject"
              value={filters.subject}
              label="المادة الدراسية"
              onChange={onFilterChange}
            >
              <MenuItem value="">الكل</MenuItem>
              {filters.level &&
                subjects[filters.level].map((subject) => (
                  <MenuItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* فلتر الترم الدراسي */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth disabled={!filters.subject}>
            <InputLabel id="term-label">الترم الدراسي</InputLabel>
            <Select
              labelId="term-label"
              id="term"
              name="term"
              value={filters.term}
              label="الترم الدراسي"
              onChange={onFilterChange}
            >
              <MenuItem value="">الكل</MenuItem>
              {terms.map((term) => (
                <MenuItem key={term.value} value={term.value}>
                  {term.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseFilters;