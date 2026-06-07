import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, TextField,
  Chip, Divider, LinearProgress, List, ListItem,
} from '@mui/material';
import {
  AutoAwesome, Edit, CheckCircle, TrendingUp, Download, Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';

const resumeSections = [
  { label: 'Professional Summary', score: 72, tip: 'Add more industry-specific keywords and quantify your impact.' },
  { label: 'Work Experience', score: 85, tip: 'Great detail! Try adding metrics to 2 more bullet points.' },
  { label: 'Skills', score: 78, tip: 'Include trending tech skills: TypeScript, Kubernetes, GraphQL.' },
  { label: 'Education', score: 95, tip: 'Excellent. Consider adding relevant coursework or GPA if strong.' },
  { label: 'Projects', score: 60, tip: 'Add 1-2 impactful projects with GitHub links and tech stack.' },
];

const improvements = [
  { priority: 'High', text: 'Add a compelling professional summary in the first 3 lines.', impact: '+8 ATS points' },
  { priority: 'High', text: 'Quantify achievements: "Reduced load time by 40%" vs "improved performance".', impact: '+6 ATS points' },
  { priority: 'Medium', text: 'Add 5 more technical skills from your target job descriptions.', impact: '+5 ATS points' },
  { priority: 'Medium', text: 'Use more action verbs: Led, Architected, Optimized, Delivered, Scaled.', impact: '+3 ATS points' },
  { priority: 'Low', text: 'Consider adding a GitHub or portfolio link to your contact section.', impact: '+2 ATS points' },
];

const priorityColor = { High: '#FF5252', Medium: '#FFB300', Low: '#00E676' };

export default function ResumePage() {
  const { user } = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(false);
  const [summaryText, setSummaryText] = useState(
    user?.bio || 'Passionate frontend engineer with 6 years of experience building scalable web applications.'
  );

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} mb={0.5}>AI Resume Assistant</Typography>
          <Typography variant="body1" color="text.secondary">
            Get AI-powered suggestions to make your resume stand out and pass ATS filters.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Section Scores */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card sx={{ p: 1, mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2.5}>Resume Section Scores</Typography>
                  {resumeSections.map((section, i) => (
                    <Box key={section.label} mb={2.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>{section.label}</Typography>
                        <Typography variant="body2" fontWeight={700} sx={{ color: section.score >= 80 ? '#00E676' : section.score >= 65 ? '#FFB300' : '#FF5252' }}>
                          {section.score}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={section.score}
                        sx={{
                          height: 6, borderRadius: 3, mb: 0.75,
                          '& .MuiLinearProgress-bar': {
                            background: section.score >= 80 ? '#00E676' : section.score >= 65 ? '#FFB300' : '#FF5252',
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">{section.tip}</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Summary Editor */}
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>Professional Summary</Typography>
                    <Button
                      size="small"
                      startIcon={editing ? <CheckCircle /> : <Edit />}
                      onClick={() => setEditing(!editing)}
                      variant={editing ? 'contained' : 'outlined'}
                      sx={{ py: 0.5 }}
                    >
                      {editing ? 'Save' : 'Edit'}
                    </Button>
                  </Box>
                  {editing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={summaryText}
                      onChange={(e) => setSummaryText(e.target.value)}
                      placeholder="Write your professional summary..."
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{summaryText}</Typography>
                  )}
                  {editing && (
                    <Button
                      fullWidth
                      startIcon={<AutoAwesome />}
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setSummaryText('Results-driven Senior Frontend Engineer with 6+ years of experience building high-performance React applications. Led cross-functional teams to deliver scalable solutions serving millions of users. Expert in TypeScript, Redux, and modern frontend architecture.');
                      }}
                    >
                      AI Improve Summary
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Improvement Suggestions */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card sx={{ p: 1, mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                    <AutoAwesome sx={{ color: '#00D9FF' }} />
                    <Typography variant="h6" fontWeight={700}>Prioritized Improvements</Typography>
                  </Box>
                  <List disablePadding>
                    {improvements.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                        <ListItem disablePadding sx={{ mb: 2 }}>
                          <Box sx={{ width: '100%', p: 2, borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Chip
                                label={item.priority}
                                size="small"
                                sx={{ background: `${priorityColor[item.priority]}20`, color: priorityColor[item.priority], fontWeight: 700, height: 20, fontSize: '0.7rem' }}
                              />
                              <Chip
                                icon={<TrendingUp sx={{ fontSize: '0.75rem !important', color: '#00E676 !important' }} />}
                                label={item.impact}
                                size="small"
                                sx={{ background: 'rgba(0,230,118,0.1)', color: '#00E676', height: 20, fontSize: '0.7rem' }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                          </Box>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Download + Re-analyze */}
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>Resume Actions</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button fullWidth variant="contained" startIcon={<Download />} sx={{ py: 1.5 }}>
                        Download Resume
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button fullWidth variant="outlined" startIcon={<Refresh />} sx={{ py: 1.5 }}>
                        Re-Analyze
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="outlined" startIcon={<AutoAwesome />} sx={{ py: 1.5, borderColor: 'rgba(0,217,255,0.3)', color: '#00D9FF' }}>
                        Generate AI-Optimized Version
                      </Button>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2.5 }} />

                  <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1.5}>
                    Skills to Add:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['TypeScript', 'Kubernetes', 'GraphQL', 'System Design', 'AWS', 'Docker', 'CI/CD'].map((skill) => (
                      <Chip
                        key={skill}
                        label={`+ ${skill}`}
                        size="small"
                        sx={{ background: 'rgba(108,99,255,0.12)', color: '#6C63FF', cursor: 'pointer', '&:hover': { background: 'rgba(108,99,255,0.25)' } }}
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
