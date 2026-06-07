import { createSlice } from '@reduxjs/toolkit';
import { mockJobs } from '../../data/mockJobs';

const loadSavedJobs = () => {
  try {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const savedJobIds = loadSavedJobs();
const jobsWithSaved = mockJobs.map((job) => ({
  ...job,
  saved: savedJobIds.includes(job.id),
}));

const initialState = {
  jobs: jobsWithSaved,
  filteredJobs: jobsWithSaved,
  selectedJob: null,
  loading: false,
  searchQuery: '',
  filters: {
    category: 'All',
    type: 'All',
    experience: 'All',
    remote: false,
    salaryMin: 0,
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = { category: 'All', type: 'All', experience: 'All', remote: false, salaryMin: 0 };
      state.searchQuery = '';
      state.filteredJobs = state.jobs;
    },
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      const job = state.jobs.find((j) => j.id === jobId);
      if (job) {
        job.saved = !job.saved;
        const filtered = state.filteredJobs.find((j) => j.id === jobId);
        if (filtered) filtered.saved = job.saved;
        const savedIds = state.jobs.filter((j) => j.saved).map((j) => j.id);
        localStorage.setItem('savedJobs', JSON.stringify(savedIds));
      }
    },
    setJobLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

function applyFilters(state) {
  let result = state.jobs;
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
    );
  }
  if (state.filters.category !== 'All') {
    result = result.filter((j) => j.category === state.filters.category);
  }
  if (state.filters.type !== 'All') {
    result = result.filter((j) => j.type === state.filters.type);
  }
  if (state.filters.remote) {
    result = result.filter((j) => j.remote);
  }
  state.filteredJobs = result;
}

export const { setSelectedJob, setSearchQuery, setFilter, clearFilters, toggleSaveJob, setJobLoading } =
  jobsSlice.actions;

export default jobsSlice.reducer;
