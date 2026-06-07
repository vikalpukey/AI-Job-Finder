import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resumeUploaded: false,
  resumeName: '',
  atsScore: 0,
  atsBreakdown: {
    keywords: 0,
    formatting: 0,
    experience: 0,
    education: 0,
    skills: 0,
  },
  aiSuggestions: [],
  coverLetter: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    uploadResume: (state, action) => {
      state.resumeUploaded = true;
      state.resumeName = action.payload.name;
      // Simulate ATS analysis
      state.atsScore = Math.floor(Math.random() * 30) + 65;
      state.atsBreakdown = {
        keywords: Math.floor(Math.random() * 20) + 75,
        formatting: Math.floor(Math.random() * 15) + 80,
        experience: Math.floor(Math.random() * 25) + 70,
        education: Math.floor(Math.random() * 10) + 85,
        skills: Math.floor(Math.random() * 20) + 72,
      };
      state.aiSuggestions = [
        'Add more quantifiable achievements (e.g., "Increased performance by 40%")',
        'Include more relevant keywords like "CI/CD", "microservices", "agile"',
        'Add a professional summary section at the top',
        'Expand your skills section to include cloud platforms',
        'Improve bullet point structure using action verbs',
      ];
    },
    removeResume: (state) => {
      state.resumeUploaded = false;
      state.resumeName = '';
      state.atsScore = 0;
      state.atsBreakdown = { keywords: 0, formatting: 0, experience: 0, education: 0, skills: 0 };
      state.aiSuggestions = [];
    },
    setCoverLetter: (state, action) => {
      state.coverLetter = action.payload;
    },
    updateAtsScore: (state, action) => {
      state.atsScore = action.payload;
    },
  },
});

export const { uploadResume, removeResume, setCoverLetter, updateAtsScore } = profileSlice.actions;

export default profileSlice.reducer;
