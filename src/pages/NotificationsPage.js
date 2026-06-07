import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Card, CardContent, Typography, Button, IconButton, Chip, Divider, Tooltip,
} from '@mui/material';
import {
  Work, Visibility, Event, Analytics, Warning, DoneAll, Delete, Circle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { markAsRead, markAllAsRead, removeNotification, clearAll } from '../redux/slices/notificationsSlice';
import MainLayout from '../components/layout/MainLayout';

const iconMap = {
  work: <Work sx={{ fontSize: '1.2rem' }} />,
  visibility: <Visibility sx={{ fontSize: '1.2rem' }} />,
  event: <Event sx={{ fontSize: '1.2rem' }} />,
  analytics: <Analytics sx={{ fontSize: '1.2rem' }} />,
  warning: <Warning sx={{ fontSize: '1.2rem' }} />,
};

const iconColorMap = {
  match: '#6C63FF',
  application: '#00D9FF',
  interview: '#00E676',
  ats: '#FFB300',
  saved: '#FF9800',
};

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((s) => s.notifications);

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h4" fontWeight={800}>Notifications</Typography>
              {unreadCount > 0 && (
                <Chip label={`${unreadCount} unread`} size="small" sx={{ background: 'rgba(108,99,255,0.2)', color: '#6C63FF', fontWeight: 700 }} />
              )}
            </Box>
            <Typography variant="body1" color="text.secondary">
              Stay updated with your job search activity.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {unreadCount > 0 && (
              <Button startIcon={<DoneAll />} variant="outlined" onClick={() => dispatch(markAllAsRead())} size="small">
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button startIcon={<Delete />} variant="outlined" color="error" onClick={() => dispatch(clearAll())} size="small" sx={{ borderColor: 'rgba(255,82,82,0.3)', color: '#FF5252' }}>
                Clear all
              </Button>
            )}
          </Box>
        </Box>

        {notifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <DoneAll sx={{ fontSize: '5rem', color: 'text.secondary', mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" color="text.secondary">All caught up!</Typography>
            <Typography variant="body2" color="text.secondary">No notifications to show.</Typography>
          </Box>
        ) : (
          <Card sx={{ p: 0 }}>
            <AnimatePresence>
              {notifications.map((notif, i) => (
                <React.Fragment key={notif.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Box
                      onClick={() => dispatch(markAsRead(notif.id))}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        p: 2.5,
                        cursor: 'pointer',
                        background: notif.read ? 'transparent' : 'rgba(108,99,255,0.04)',
                        transition: 'background 0.2s',
                        '&:hover': { background: 'rgba(255,255,255,0.03)' },
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                          background: `${iconColorMap[notif.type]}20`,
                          border: `1px solid ${iconColorMap[notif.type]}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: iconColorMap[notif.type],
                        }}
                      >
                        {iconMap[notif.icon] || <Work sx={{ fontSize: '1.2rem' }} />}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.3 }}>
                          <Typography variant="body2" fontWeight={notif.read ? 500 : 700}>
                            {notif.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, ml: 1 }}>
                            {!notif.read && (
                              <Circle sx={{ fontSize: '0.5rem', color: '#6C63FF' }} />
                            )}
                            <Typography variant="caption" color="text.secondary">{notif.time}</Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
                          {notif.message}
                        </Typography>
                      </Box>

                      {/* Actions */}
                      <Tooltip title="Remove">
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); dispatch(removeNotification(notif.id)); }}
                          sx={{ color: 'text.secondary', flexShrink: 0, alignSelf: 'center', '&:hover': { color: '#FF5252' }, opacity: 0.5, '&:hover': { opacity: 1 } }}
                        >
                          <Delete sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </motion.div>
                  {i < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </Card>
        )}
      </Box>
    </MainLayout>
  );
}
