import { createSlice } from '@reduxjs/toolkit';
import { mockUser } from '../../data/mockUser';

const loadFromStorage = () => {
  try {
    const serialized = localStorage.getItem('auth');
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem('auth', JSON.stringify(state));
  } catch {}
};

const storedAuth = loadFromStorage();

const initialState = {
  isAuthenticated: storedAuth?.isAuthenticated || false,
  user: storedAuth?.user || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      saveToStorage({ isAuthenticated: true, user: action.payload });
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('auth');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveToStorage({ isAuthenticated: true, user: state.user });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile, clearError } = authSlice.actions;

export const loginUser = (email, password) => (dispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    if (email === mockUser.email && password === mockUser.password) {
      dispatch(loginSuccess(mockUser));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  }, 1000);
};

export const registerUser = (userData) => (dispatch) => {
  dispatch(loginStart());
  setTimeout(() => {
    const newUser = { ...mockUser, ...userData, id: Date.now() };
    dispatch(loginSuccess(newUser));
  }, 1000);
};

export default authSlice.reducer;
