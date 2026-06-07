import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, TextField,
  Select, MenuItem, FormControl, InputLabel, Chip, Divider,
} from '@mui/material';
import { AutoAwesome, ContentCopy, Download, Refresh, Edit } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';

const tones = ['Professional', 'Enthusiastic', 'Concise', 'Creative', 'Formal'];

const generateLetter = (job, company, tone, user) => `Dear Hiring Manager,

I am writing to express my strong interest in the ${job || 'Software Engineer'} position at ${company || 'your company'}. As a passionate and results-driven ${user?.title || 'engineer'} with over 6 years of experience building scalable applications, I am confident that my skills and background make me an excellent fit for this role.

Throughout my career at TechCorp and StartupXYZ, I have consistently delivered high-impact results. I led the development of a design system adopted by 20+ engineers, improved application performance by 40% through strategic code splitting, and mentored junior developers to accelerate team velocity.

What excites me most about ${company || 'your company'} is your commitment to innovation and the opportunity to work on products that impact millions of users. My expertise in React, TypeScript, Redux, and modern web architecture aligns perfectly with your technical stack and the challenges described in the job posting.

I am particularly drawn to this role because it offers the opportunity to lead frontend architecture decisions while collaborating with a talented cross-functional team — something I have thrived in throughout my career.

I would love to discuss how my experience can contribute to ${company || "your team"}'s success. Thank you for considering my application. I look forward to the opportunity to speak with you.

Best regards,
${user?.name || 'Alex Johnson'}
${user?.email || 'alex.johnson@email.com'}
${user?.phone || '+1 (555) 234-5678'}`;

export default function CoverLetterPage() {
  const { user } = useSelector((s) => s.auth);
  const { jobs } = useSelector((s) => s.jobs);
  const [selectedJob, setSelectedJob] = useState('');
  const [company, setCompany] = useState('');
  const [tone, setTone] = useState('Professional');
  const [letter, setLetter] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setLetter(generateLetter(selectedJob, company, tone, user));
      setGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJobSelect = (jobTitle) => {
    setSelectedJob(jobTitle);
    const job = jobs.find((j) => j.title === jobTitle);
    if (job) setCompany(job.company);
  };

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} mb={0.5}>Cover Letter Generator</Typography>
          <Typography variant="body1" color="text.secondary">
            Generate personalized, professional cover letters with AI in seconds.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Configuration */}
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card sx={{ p: 1, position: 'sticky', top: 88 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2.5}>
                    Configure Letter
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <FormControl fullWidth>
                      <InputLabel>Select a Job</InputLabel>
                      <Select
                        value={selectedJob}
                        label="Select a Job"
                        onChange={(e) => handleJobSelect(e.target.value)}
                      >
                        {jobs.map((j) => (
                          <MenuItem key={j.id} value={j.title}>{j.title} — {j.company}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Stripe, Airbnb"
                    />

                    <TextField
                      fullWidth
                      label="Job Title"
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      placeholder="e.g. Senior Frontend Engineer"
                    />

                    <FormControl fullWidth>
                      <InputLabel>Tone</InputLabel>
                      <Select value={tone} label="Tone" onChange={(e) => setTone(e.target.value)}>
                        {tones.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                      </Select>
                    </FormControl>

                    <Button
                      variant="contained"
                      startIcon={<AutoAwesome />}
                      onClick={handleGenerate}
                      disabled={generating || !company}
                      size="large"
                      sx={{ py: 1.5 }}
                    >
                      {generating ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2.5 }} />

                  <Typography variant="body2" color="text.secondary" fontWeight={600} mb={1}>
                    About You (auto-filled)
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">Name: {user?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Title: {user?.title}</Typography>
                    <Typography variant="caption" color="text.secondary">Email: {user?.email}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Letter Output */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>Generated Cover Letter</Typography>
                    {letter && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label={tone} size="small" sx={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF' }} />
                        <Button size="small" startIcon={<Edit />} onClick={() => setEditing(!editing)} variant="outlined" sx={{ py: 0.3 }}>
                          {editing ? 'Done' : 'Edit'}
                        </Button>
                        <Button size="small" startIcon={<ContentCopy />} onClick={handleCopy} variant="outlined" sx={{ py: 0.3 }}>
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button size="small" startIcon={<Download />} variant="outlined" sx={{ py: 0.3 }}>
                          Export
                        </Button>
                      </Box>
                    )}
                  </Box>

                  {!letter && !generating && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <AutoAwesome sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" mb={1}>No letter generated yet</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fill in the job details on the left and click "Generate with AI"
                      </Typography>
                    </Box>
                  )}

                  {generating && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <AutoAwesome sx={{ fontSize: '3rem', color: '#6C63FF' }} />
                      </motion.div>
                      <Typography variant="body1" color="text.secondary" mt={2}>
                        AI is crafting your cover letter...
                      </Typography>
                    </Box>
                  )}

                  {letter && !generating && (
                    <Box>
                      {editing ? (
                        <TextField
                          fullWidth
                          multiline
                          rows={20}
                          value={letter}
                          onChange={(e) => setLetter(e.target.value)}
                          sx={{ fontFamily: 'monospace' }}
                        />
                      ) : (
                        <Box
                          sx={{
                            p: 3, borderRadius: '10px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.8,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary" component="pre" sx={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                            {letter}
                          </Typography>
                        </Box>
                      )}

                      <Divider sx={{ my: 2.5 }} />

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button startIcon={<Refresh />} variant="outlined" onClick={handleGenerate} disabled={generating}>
                          Regenerate
                        </Button>
                        <Button startIcon={<Download />} variant="contained">
                          Download as PDF
                        </Button>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
