import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, TextField, Typography,
  InputAdornment, IconButton, Alert, Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, AutoAwesome, Email, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { loginUser, clearError } from '../redux/slices/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((s) => s.auth);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: 'alex.johnson@email.com', password: 'password123' });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form.email, form.password));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108,99,255,0.18) 0%, #0A0A0F 65%)',
        p: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient orbs */}
      <Box sx={{
        position: 'fixed', top: '5%', left: '10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(108,99,255,0.07)', filter: 'blur(120px)', pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'fixed', bottom: '5%', right: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(0,217,255,0.06)', filter: 'blur(120px)', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 460, position: 'relative' }}
      >
        {/* Logo + heading */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{
              width: 44, height: 44, borderRadius: '13px',
              background: 'linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, color: '#fff', fontSize: '1.25rem',
              boxShadow: '0 4px 20px rgba(108,99,255,0.5)',
            }}>H</Box>
            <Typography variant="h5" sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              HuntAI
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={800} mb={1} letterSpacing="-0.02em">
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue your job search journey
          </Typography>
        </Box>

        {/* Card — gradient border wrapper */}
        <Box sx={{
          position: 'relative',
          borderRadius: '20px',
          p: '1px',
          background: 'linear-gradient(135deg, rgba(108,99,255,0.55) 0%, rgba(0,217,255,0.22) 50%, rgba(108,99,255,0.12) 100%)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 60px rgba(108,99,255,0.08)',
        }}>
          <Box sx={{
            borderRadius: '19px',
            background: 'linear-gradient(160deg, rgba(24,24,48,0.98) 0%, rgba(12,12,24,0.99) 100%)',
            backdropFilter: 'blur(24px)',
            p: { xs: 3, sm: 4 },
          }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', border: '1px solid rgba(255,82,82,0.3)' }}>
                {error}
              </Alert>
            )}

            {/* Demo hint */}
            <Box sx={{
              mb: 3.5, p: 2, borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.1) 0%, rgba(0,217,255,0.05) 100%)',
              border: '1px solid rgba(108,99,255,0.28)',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                <AutoAwesome sx={{ fontSize: '0.85rem', color: '#8B83FF' }} />
                <Typography variant="caption" sx={{
                  color: '#8B83FF', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.68rem',
                }}>
                  Demo credentials pre-filled
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Email: alex.johnson@email.com · Password: password123
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <Typography variant="caption" sx={{
                color: 'text.secondary', fontWeight: 600,
                mb: 0.75, display: 'block', letterSpacing: '0.03em',
              }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="you@example.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                sx={{
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#6C63FF', borderWidth: '1.5px' },
                  },
                  '& .MuiInputLabel-root': { display: 'none' },
                }}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#6C63FF', fontSize: '1.1rem', opacity: 0.85 }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password label row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.03em' }}>
                  Password
                </Typography>
                <Typography variant="caption" sx={{
                  color: '#6C63FF', fontWeight: 600, cursor: 'pointer',
                  '&:hover': { color: '#8B83FF' }, transition: 'color 0.2s',
                }}>
                  Forgot password?
                </Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="Enter your password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                sx={{
                  mb: 3.5,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(108,99,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#6C63FF', borderWidth: '1.5px' },
                  },
                  '& .MuiInputLabel-root': { display: 'none' },
                }}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#6C63FF', fontSize: '1.1rem', opacity: 0.85 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end" sx={{ color: 'text.secondary' }}>
                        {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  py: 1.6,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #8B83FF 100%)',
                  boxShadow: '0 4px 24px rgba(108,99,255,0.45)',
                  letterSpacing: '0.01em',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5A52E0 0%, #7A73EE 100%)',
                    boxShadow: '0 8px 36px rgba(108,99,255,0.65)',
                    transform: 'translateY(-1px)',
                  },
                  '&:active': { transform: 'translateY(0)' },
                  '&.Mui-disabled': { opacity: 0.5 },
                  transition: 'all 0.25s ease',
                }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.07)' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>or</Typography>
            </Divider>

            <Typography variant="body2" textAlign="center" color="text.secondary">
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#6C63FF', fontWeight: 700, textDecoration: 'none' }}>
                Create one free →
              </Link>
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary" textAlign="center" display="block" mt={3} sx={{ opacity: 0.5 }}>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </motion.div>
    </Box>
  );
}
