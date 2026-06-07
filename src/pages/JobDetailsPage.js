import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Button, Typography, Chip, Avatar, Divider, Grid, Card, CardContent, LinearProgress,
} from '@mui/material';
import {
  ArrowBack, LocationOn, Work, AttachMoney, AccessTime, Bookmark, BookmarkBorder,
  CheckCircle, TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toggleSaveJob } from '../redux/slices/jobsSlice';
import { addApplication } from '../redux/slices/applicationsSlice';
import MainLayout from '../components/layout/MainLayout';

export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobs } = useSelector((s) => s.jobs);
  const { applications } = useSelector((s) => s.applications);

  const job = jobs.find((j) => j.id === Number(id));
  const alreadyApplied = applications.some((a) => a.jobId === Number(id));

  if (!job) {
    return (
      <MainLayout>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">Job not found</Typography>
          <Button onClick={() => navigate('/jobs')} sx={{ mt: 2 }}>Back to Jobs</Button>
        </Box>
      </MainLayout>
    );
  }

  const handleApply = () => {
    if (!alreadyApplied) {
      dispatch(addApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        logo: job.logo,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'applied',
        notes: '',
        salary: job.salary,
        location: job.location,
        nextStep: 'Waiting for recruiter response',
      }));
    }
  };

  const matchColor = job.atsScore >= 80 ? '#00E676' : job.atsScore >= 65 ? '#FFB300' : '#FF5252';

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Back */}
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/jobs')} sx={{ mb: 3, color: 'text.secondary' }}>
          Back to Jobs
        </Button>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 1, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar src={job.logo} sx={{ width: 60, height: 60, border: '1px solid rgba(255,255,255,0.1)' }}>
                      {job.company[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight={800}>{job.title}</Typography>
                      <Typography variant="body1" color="text.secondary">{job.company}</Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={job.saved ? <Bookmark /> : <BookmarkBorder />}
                    onClick={() => dispatch(toggleSaveJob(job.id))}
                    sx={{ color: job.saved ? '#6C63FF' : 'text.secondary', borderColor: job.saved ? '#6C63FF' : 'rgba(255,255,255,0.15)' }}
                  >
                    {job.saved ? 'Saved' : 'Save Job'}
                  </Button>
                </Box>

                {/* Meta */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{job.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Work sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{job.type}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AttachMoney sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{job.salary}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">Posted {job.postedDate}</Typography>
                  </Box>
                  {job.remote && <Chip label="Remote OK" size="small" sx={{ background: 'rgba(0,230,118,0.15)', color: '#00E676' }} />}
                </Box>

                {/* Skills */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {job.skills.map((s) => (
                    <Chip key={s} label={s} sx={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF', fontWeight: 600 }} />
                  ))}
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Description */}
                <Typography variant="h6" fontWeight={700} mb={1.5}>About the Role</Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.8} mb={3}>{job.description}</Typography>

                {/* Responsibilities */}
                <Typography variant="h6" fontWeight={700} mb={1.5}>Responsibilities</Typography>
                <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                  {job.responsibilities.map((r, i) => (
                    <Box component="li" key={i} sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">{r}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* Requirements */}
                <Typography variant="h6" fontWeight={700} mb={1.5}>Requirements</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {job.requirements.map((r, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <CheckCircle sx={{ fontSize: '1rem', color: '#6C63FF', mt: 0.2, flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary">{r}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Apply Card */}
            <Card sx={{ p: 1, mb: 3, border: '1px solid rgba(108,99,255,0.2)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={1}>{job.salary}</Typography>
                <Typography variant="caption" color="text.secondary">per year · {job.experience}</Typography>
                <Divider sx={{ my: 2 }} />
                <Button
                  fullWidth
                  variant={alreadyApplied ? 'outlined' : 'contained'}
                  size="large"
                  onClick={handleApply}
                  disabled={alreadyApplied}
                  sx={{ mb: 1.5 }}
                >
                  {alreadyApplied ? '✓ Already Applied' : 'Apply Now'}
                </Button>
                <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                  Deadline: {job.deadline}
                </Typography>
              </CardContent>
            </Card>

            {/* ATS Match Score */}
            <Card sx={{ p: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp sx={{ color: matchColor }} />
                  <Typography variant="h6" fontWeight={700}>Your Match Score</Typography>
                </Box>
                <Typography variant="h2" fontWeight={900} sx={{ color: matchColor, mb: 1 }}>
                  {job.atsScore}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={job.atsScore}
                  sx={{ height: 8, borderRadius: 4, mb: 2, '& .MuiLinearProgress-bar': { background: matchColor } }}
                />
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {job.atsScore >= 80
                    ? 'Excellent match! Your profile aligns strongly with this role.'
                    : job.atsScore >= 65
                    ? 'Good match. A few improvements could increase your chances.'
                    : 'Fair match. Consider improving your skills for this role.'}
                </Typography>
                <Button fullWidth variant="outlined" onClick={() => navigate('/ats')} size="small">
                  Improve ATS Score
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </MainLayout>
  );
}
