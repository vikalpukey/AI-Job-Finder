import React, { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar, { DRAWER_WIDTH } from './Sidebar';

export default function MainLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#0A0A0F' }}>
      <Navbar onMenuClick={() => setMobileOpen(true)} />

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar variant="permanent" />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sidebar
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${DRAWER_WIDTH}px` },
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #0F0F1A 50%, #0A0A0F 100%)',
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: '1400px', mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
