import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Box
    sx={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      py: 8,
    }}
  >
    <Typography variant="h2" color="primary" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      الصفحة غير موجودة
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      عذراً، الصفحة التي تبحث عنها غير متوفرة.
    </Typography>
    <Button variant="contained" component={Link} to="/">
      العودة للصفحة الرئيسية
    </Button>
  </Box>
);

export default NotFoundPage; 