import { createSlice } from '@reduxjs/toolkit';
import { mockApplications } from '../../data/mockUser';

const loadApplications = () => {
  try {
    const saved = localStorage.getItem('applications');
    return saved ? JSON.parse(saved) : mockApplications;
  } catch {
    return mockApplications;
  }
};

const saveApplications = (apps) => {
  try {
    localStorage.setItem('applications', JSON.stringify(apps));
  } catch {}
};

const initialState = {
  applications: loadApplications(),
  loading: false,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    addApplication: (state, action) => {
      const newApp = { ...action.payload, id: Date.now() };
      state.applications.push(newApp);
      saveApplications(state.applications);
    },
    updateApplicationStatus: (state, action) => {
      const { id, status } = action.payload;
      const app = state.applications.find((a) => a.id === id);
      if (app) {
        app.status = status;
        saveApplications(state.applications);
      }
    },
    updateApplicationNotes: (state, action) => {
      const { id, notes } = action.payload;
      const app = state.applications.find((a) => a.id === id);
      if (app) {
        app.notes = notes;
        saveApplications(state.applications);
      }
    },
    removeApplication: (state, action) => {
      state.applications = state.applications.filter((a) => a.id !== action.payload);
      saveApplications(state.applications);
    },
    reorderApplications: (state, action) => {
      state.applications = action.payload;
      saveApplications(state.applications);
    },
  },
});

export const {
  addApplication,
  updateApplicationStatus,
  updateApplicationNotes,
  removeApplication,
  reorderApplications,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
