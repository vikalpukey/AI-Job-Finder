import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Typography, Divider, Chip, Tooltip,
} from '@mui/material';
import {
  Dashboard, Work, BookmarkBorder, Assessment, Description, Edit,
  TrackChanges, Person, Notifications, Settings, Logout, AutoAwesome,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Job Search', icon: <Work />, path: '/jobs' },
  { label: 'Saved Jobs', icon: <BookmarkBorder />, path: '/saved' },
  { label: 'Applications', icon: <TrackChanges />, path: '/applications' },
  { label: 'ATS Score', icon: <Assessment />, path: '/ats' },
  { label: 'AI Resume', icon: <AutoAwesome />, path: '/resume' },
  { label: 'Cover Letter', icon: <Edit />, path: '/cover-letter' },
  { label: 'Profile', icon: <Person />, path: '/profile' },
  { label: 'Notifications', icon: <Notifications />, path: '/notifications' },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
];

export default function Sidebar({ open, onClose, variant = 'permanent' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { unreadCount } = useSelector((s) => s.notifications);

  const handleNav = (path) => {
    navigate(path);
    if (variant === 'temporary') onClose?.();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const content = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10,10,15,0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #6C63FF, #00D9FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: 800, color: '#fff',
          }}
        >
          H
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #6C63FF, #00D9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
            HuntAI
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
            Job Platform
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* User Info */}
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: '12px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)' }}>
          <Avatar
            src={user?.avatar}
            sx={{ width: 38, height: 38, border: '2px solid #6C63FF' }}
          >
            {user?.name?.[0]}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', noWrap: true }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              {user?.title || 'Job Seeker'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav Items */}
      <List sx={{ flex: 1, px: 1.5, py: 0 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div key={item.path} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNav(item.path)}
                  sx={{
                    borderRadius: '10px',
                    py: 1,
                    background: isActive ? 'linear-gradient(135deg, rgba(108,99,255,0.25), rgba(0,217,255,0.1))' : 'transparent',
                    border: isActive ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
                    '&:hover': {
                      background: 'rgba(108,99,255,0.12)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? '#6C63FF' : 'text.secondary',
                      '& svg': { fontSize: '1.2rem' },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'text.primary' : 'text.secondary',
                    }}
                  />
                  {item.label === 'Notifications' && unreadCount > 0 && (
                    <Chip
                      label={unreadCount}
                      size="small"
                      sx={{
                        height: 18, fontSize: '0.65rem', fontWeight: 700,
                        background: '#6C63FF', color: '#fff',
                        '& .MuiChip-label': { px: 0.8 },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          );
        })}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: '10px', py: 1,
            '&:hover': { background: 'rgba(255,82,82,0.1)', color: '#FF5252' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
            <Logout sx={{ fontSize: '1.2rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
    >
      {content}
    </Drawer>
  );
}

export { DRAWER_WIDTH };
