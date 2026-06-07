import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, TextField, Typography, Card, CardContent,
  InputAdornment, IconButton, Alert, Grid,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock, Work } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { registerUser, clearError } from '../redux/slices/authSlice';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((s) => s.auth);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', title: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) dispatch(registerUser(form));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.12) 0%, #0A0A0F 70%)',
        p: 3,
      }}
    >
      <Box sx={{ position: 'fixed', top: '10%', right: '15%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,217,255,0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 480 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 42, height: 42, borderRadius: '12px', background: 'linear-gradient(135deg, #6C63FF, #00D9FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '1.2rem' }}>H</Box>
            <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF, #00D9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HuntAI
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={700} mb={0.5}>Create your account</Typography>
          <Typography variant="body2" color="text.secondary">Start your AI-powered job search today — it's free</Typography>
        </Box>

        <Card sx={{ p: 1 }}>
          <CardContent sx={{ p: 3 }}>
            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Person sx={{ color: 'text.secondary', fontSize: '1.1rem' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.secondary', fontSize: '1.1rem' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Title (e.g. Frontend Engineer)"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Work sx={{ color: 'text.secondary', fontSize: '1.1rem' }} /></InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.secondary', fontSize: '1.1rem' }} /></InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)} edge="end" sx={{ color: 'text.secondary' }}>
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{ py: 1.5, fontSize: '1rem' }}
                  >
                    {loading ? 'Creating account...' : 'Create Free Account'}
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Typography variant="body2" textAlign="center" color="text.secondary" mt={3}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#6C63FF', fontWeight: 600, textDecoration: 'none' }}>
                Sign in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
