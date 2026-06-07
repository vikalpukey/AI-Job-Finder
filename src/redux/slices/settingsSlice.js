import { createSlice } from '@reduxjs/toolkit';

const loadSettings = () => {
  try {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const defaultSettings = {
  emailAlerts: true,
  pushNotifications: true,
  jobMatchAlerts: true,
  applicationUpdates: true,
  weeklyDigest: false,
  profileVisibility: 'public',
  showSalary: true,
  autoApply: false,
  language: 'en',
  timezone: 'America/Los_Angeles',
};

const stored = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState: stored || defaultSettings,
  reducers: {
    updateSetting: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
      localStorage.setItem('settings', JSON.stringify(state));
    },
    resetSettings: () => {
      localStorage.setItem('settings', JSON.stringify(defaultSettings));
      return defaultSettings;
    },
  },
});

export const { updateSetting, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
