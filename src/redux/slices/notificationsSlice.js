import { createSlice } from '@reduxjs/toolkit';
import { mockNotifications } from '../../data/mockUser';

const initialState = {
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload, id: Date.now(), read: false });
      state.unreadCount += 1;
    },
    removeNotification: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif && !notif.read) state.unreadCount = Math.max(0, state.unreadCount - 1);
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    clearAll: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification, removeNotification, clearAll } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
