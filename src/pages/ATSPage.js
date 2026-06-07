import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography, Button, LinearProgress,
  Chip, TextField, Divider, Alert,
} from '@mui/material';
import {
  Assessment, CloudUpload, CheckCircle, Warning, AutoAwesome, TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { uploadResume } from '../redux/slices/profileSlice';
import MainLayout from '../components/layout/MainLayout';

const scoreColor = (s) => s >= 80 ? '#00E676' : s >= 65 ? '#FFB300' : '#FF5252';

export default function ATSPage() {
  const dispatch = useDispatch();
  const { resumeUploaded, resumeName, atsScore, atsBreakdown, aiSuggestions } = useSelector((s) => s.profile);
  const [jobDesc, setJobDesc] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (file) => {
    if (file) {
      setAnalyzing(true);
      setTimeout(() => {
        dispatch(uploadResume({ name: file.name }));
        setAnalyzing(false);
      }, 2000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2500);
  };

  const breakdown = resumeUploaded
    ? atsBreakdown
    : { keywords: 88, formatting: 92, experience: 78, education: 90, skills: 81 };

  const score = resumeUploaded ? atsScore : 84;

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} mb={0.5}>ATS Score Analyzer</Typography>
          <Typography variant="body1" color="text.secondary">
            Analyze your resume against job descriptions and optimize for applicant tracking systems.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Upload & Score */}
          <Grid item xs={12} md={5}>
            {/* Upload Box */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card sx={{ mb: 3, p: 1 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>Upload Resume</Typography>
                  <Box
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    sx={{
                      border: `2px dashed ${dragOver ? '#6C63FF' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '12px',
                      p: 4,
                      textAlign: 'center',
                      background: dragOver ? 'rgba(108,99,255,0.08)' : 'rgba(255,255,255,0.02)',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                    }}
                    onClick={() => document.getElementById('resume-input').click()}
                  >
                    <input
                      id="resume-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      hidden
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                    />
                    <CloudUpload sx={{ fontSize: '3rem', color: dragOver ? '#6C63FF' : 'text.secondary', mb: 1 }} />
                    <Typography variant="body2" fontWeight={600} mb={0.5}>
                      {resumeUploaded ? resumeName : 'Drop your resume here'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {resumeUploaded ? '✓ Uploaded successfully' : 'PDF, DOC, DOCX • Max 5MB'}
                    </Typography>
                    {!resumeUploaded && (
                      <Button variant="outlined" size="small" sx={{ mt: 2 }}>Browse Files</Button>
                    )}
                  </Box>
                </CardContent>
              </Card>

              {/* ATS Score Card */}
              <Card sx={{ p: 1, border: `1px solid ${scoreColor(score)}30` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Overall ATS Score</Typography>
                    <Assessment sx={{ color: scoreColor(score) }} />
                  </Box>

                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h1" fontWeight={900} sx={{ color: scoreColor(score), lineHeight: 1 }}>
                      {score}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">out of 100</Typography>
                    <Chip
                      label={score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : 'Needs Work'}
                      sx={{ mt: 1, background: `${scoreColor(score)}20`, color: scoreColor(score), fontWeight: 700 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(breakdown).map(([key, val]) => (
                      <Box key={key}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{key}</Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ color: scoreColor(val) }}>{val}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={val}
                          sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { background: scoreColor(val) } }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7}>
            {/* Job Description Analyzer */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card sx={{ mb: 3, p: 1 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={1}>Analyze Against Job Description</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Paste a job description to see how well your resume matches it.
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Paste the job description here..."
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<TrendingUp />}
                    onClick={handleAnalyze}
                    disabled={!jobDesc.trim() || analyzing}
                    fullWidth
                  >
                    {analyzing ? 'Analyzing...' : 'Analyze Match'}
                  </Button>
                  {analyzed && (
                    <Alert severity="success" sx={{ mt: 2, borderRadius: '10px' }}>
                      Analysis complete! Your resume matches 79% of the job requirements.
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AutoAwesome sx={{ color: '#00D9FF' }} />
                    <Typography variant="h6" fontWeight={700}>AI Improvement Suggestions</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(resumeUploaded && aiSuggestions.length > 0 ? aiSuggestions : [
                      'Add more quantifiable achievements (e.g., "Increased performance by 40%")',
                      'Include more relevant keywords like "CI/CD", "microservices", "agile"',
                      'Add a professional summary section at the top',
                      'Expand your skills section to include cloud platforms (AWS, GCP)',
                      'Use stronger action verbs: "Led", "Built", "Architected", "Optimized"',
                    ]).map((suggestion, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                        <Box sx={{ display: 'flex', gap: 1.5, p: 2, borderRadius: '10px', background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.12)' }}>
                          <CheckCircle sx={{ color: '#6C63FF', fontSize: '1.1rem', flexShrink: 0, mt: 0.2 }} />
                          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>{suggestion}</Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1} sx={{ width: '100%' }}>
                      Missing Keywords:
                    </Typography>
                    {['Kubernetes', 'TypeScript', 'System Design', 'Mentoring', 'Agile'].map((kw) => (
                      <Chip
                        key={kw}
                        label={kw}
                        size="small"
                        icon={<Warning sx={{ fontSize: '0.8rem !important', color: '#FFB300 !important' }} />}
                        sx={{ background: 'rgba(255,179,0,0.1)', color: '#FFB300', fontSize: '0.75rem' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
