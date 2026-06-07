import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Box,
  Menu, MenuItem, Divider, Tooltip, InputBase,
} from '@mui/material';
import {
  Notifications, Search, Menu as MenuIcon, Settings, Person, Logout,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { unreadCount } = useSelector((s) => s.notifications);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Left: hamburger (mobile) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onMenuClick}
            sx={{ display: { md: 'none' }, color: 'text.secondary' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search bar */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              px: 2, py: 0.75,
              gap: 1,
              width: 280,
              '&:hover': { border: '1px solid rgba(108,99,255,0.3)' },
              transition: 'all 0.2s',
            }}
          >
            <Search sx={{ color: 'text.secondary', fontSize: '1rem' }} />
            <InputBase
              placeholder="Search jobs, companies..."
              sx={{ flex: 1, fontSize: '0.875rem', color: 'text.primary' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate('/jobs');
              }}
            />
          </Box>
        </Box>

        {/* Right: actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton onClick={() => navigate('/notifications')} sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={unreadCount} color="primary" max={9}>
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
                <Avatar
                  src={user?.avatar}
                  sx={{
                    width: 34, height: 34,
                    border: '2px solid rgba(108,99,255,0.5)',
                    cursor: 'pointer',
                  }}
                >
                  {user?.name?.[0]}
                </Avatar>
              </IconButton>
            </motion.div>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                mt: 1.5, minWidth: 200,
                background: 'rgba(18,18,26,0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" fontWeight={600}>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null); }} sx={{ gap: 1.5, py: 1.2 }}>
              <Person sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/settings'); setAnchorEl(null); }} sx={{ gap: 1.5, py: 1.2 }}>
              <Settings sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, color: '#FF5252' }}>
              <Logout sx={{ fontSize: '1.1rem' }} />
              <Typography variant="body2" color="#FF5252">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
