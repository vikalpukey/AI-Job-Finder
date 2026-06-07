import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography, Button, LinearProgress,
  Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Divider,
} from '@mui/material';
import {
  Work, BookmarkBorder, TrackChanges, Assessment, TrendingUp,
  ArrowForward, AutoAwesome, CheckCircle,
} from '@mui/icons-material';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale, PointElement, LineElement, Filler,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const StatCard = ({ icon, label, value, color, change, onClick }) => (
  <motion.div variants={fadeUp} initial="hidden" animate="visible" whileHover={{ y: -4 }}>
    <Card onClick={onClick} sx={{ cursor: onClick ? 'pointer' : 'default', p: 0.5 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>{label}</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ color }}>{value}</Typography>
            {change && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <TrendingUp sx={{ fontSize: '0.85rem', color: '#00E676' }} />
                <Typography variant="caption" color="#00E676">{change}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ width: 48, height: 48, borderRadius: '12px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {React.cloneElement(icon, { sx: { color, fontSize: '1.5rem' } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { applications } = useSelector((s) => s.applications);
  const { jobs } = useSelector((s) => s.jobs);

  const savedJobs = jobs.filter((j) => j.saved).length;
  const statusCounts = {
    applied: applications.filter((a) => a.status === 'applied').length,
    interview: applications.filter((a) => a.status === 'interview').length,
    offer: applications.filter((a) => a.status === 'offer').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const doughnutData = {
    labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
    datasets: [{
      data: [statusCounts.applied, statusCounts.interview, statusCounts.offer, statusCounts.rejected],
      backgroundColor: ['rgba(108,99,255,0.8)', 'rgba(0,217,255,0.8)', 'rgba(0,230,118,0.8)', 'rgba(255,82,82,0.8)'],
      borderColor: ['#6C63FF', '#00D9FF', '#00E676', '#FF5252'],
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Applications',
      data: [2, 5, 3, 8, 6, applications.length],
      fill: true,
      backgroundColor: 'rgba(108,99,255,0.1)',
      borderColor: '#6C63FF',
      borderWidth: 2,
      pointBackgroundColor: '#6C63FF',
      pointRadius: 4,
      tension: 0.4,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: '#9090B0', boxRounded: true, boxWidth: 12 } } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9090B0' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#9090B0' } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '70%',
    plugins: { legend: { position: 'bottom', labels: { color: '#9090B0', padding: 16, boxRounded: true, boxWidth: 12 } } },
  };

  const recentApps = applications.slice(0, 3);
  const atsScore = user?.atsScore || 84;

  const aiTips = [
    'Add more quantifiable achievements to your experience section',
    'Include keywords: "CI/CD", "microservices", "agile methodology"',
    'Expand your skills section with cloud platforms (AWS, GCP)',
  ];

  return (
    <MainLayout>
      <Box>
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight={800} mb={0.5}>
              Good morning, {user?.name?.split(' ')[0]} 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's your job search overview for today.
            </Typography>
          </Box>
        </motion.div>

        {/* Stat Cards */}
        <Grid container spacing={3} mb={4}>
          {[
            { icon: <Work />, label: 'Jobs Available', value: jobs.length, color: '#6C63FF', change: '+12 today', onClick: () => navigate('/jobs') },
            { icon: <BookmarkBorder />, label: 'Saved Jobs', value: savedJobs, color: '#00D9FF', onClick: () => navigate('/saved') },
            { icon: <TrackChanges />, label: 'Applications', value: applications.length, color: '#00E676', change: '+2 this week', onClick: () => navigate('/applications') },
            { icon: <Assessment />, label: 'ATS Score', value: `${atsScore}%`, color: '#FFB300', onClick: () => navigate('/ats') },
          ].map((s, i) => (
            <Grid item xs={12} sm={6} lg={3} key={s.label}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>

        {/* Charts + Recent Applications */}
        <Grid container spacing={3} mb={4}>
          {/* Line Chart */}
          <Grid item xs={12} md={8}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              <Card sx={{ p: 1, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>Application Activity</Typography>
                    <Chip label="Last 6 months" size="small" sx={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF' }} />
                  </Box>
                  <Line data={lineData} options={chartOptions} />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Doughnut Chart */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <Card sx={{ p: 1, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={2}>Application Status</Typography>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* ATS Score + AI Tips + Recent Apps */}
        <Grid container spacing={3}>
          {/* ATS Score */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <Card sx={{ p: 1, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Resume ATS Score</Typography>
                    <Assessment sx={{ color: '#6C63FF' }} />
                  </Box>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <Typography variant="h2" fontWeight={900} sx={{ background: 'linear-gradient(135deg, #6C63FF, #00D9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {atsScore}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">out of 100</Typography>
                    </Box>
                  </Box>
                  {[
                    { label: 'Keywords', score: 88 },
                    { label: 'Formatting', score: 92 },
                    { label: 'Experience', score: 78 },
                    { label: 'Skills Match', score: 81 },
                  ].map((item) => (
                    <Box key={item.label} mb={1.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                        <Typography variant="caption" fontWeight={600}>{item.score}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={item.score} sx={{ height: 5, borderRadius: 3 }} />
                    </Box>
                  ))}
                  <Button fullWidth variant="outlined" onClick={() => navigate('/ats')} sx={{ mt: 2 }} endIcon={<ArrowForward />}>
                    Full Analysis
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* AI Tips */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
              <Card sx={{ p: 1, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>AI Suggestions</Typography>
                    <AutoAwesome sx={{ color: '#00D9FF' }} />
                  </Box>
                  <List disablePadding>
                    {aiTips.map((tip, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 2, alignItems: 'flex-start', gap: 1 }}>
                        <CheckCircle sx={{ color: '#6C63FF', fontSize: '1rem', mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" color="text.secondary" lineHeight={1.5}>{tip}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button fullWidth variant="outlined" onClick={() => navigate('/resume')} sx={{ mt: 2 }} endIcon={<ArrowForward />}>
                    View All Suggestions
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Recent Applications */}
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
              <Card sx={{ p: 1, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Recent Applications</Typography>
                    <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/applications')} sx={{ fontSize: '0.75rem' }}>
                      View all
                    </Button>
                  </Box>
                  <List disablePadding>
                    {recentApps.map((app, i) => (
                      <React.Fragment key={app.id}>
                        <ListItem disablePadding sx={{ py: 1.5 }}>
                          <ListItemAvatar>
                            <Avatar src={app.logo} sx={{ width: 38, height: 38, border: '1px solid rgba(255,255,255,0.1)' }}>
                              {app.company[0]}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="body2" fontWeight={600}>{app.jobTitle}</Typography>}
                            secondary={<Typography variant="caption" color="text.secondary">{app.company}</Typography>}
                          />
                          <Chip
                            label={app.status}
                            size="small"
                            sx={{
                              fontSize: '0.65rem', fontWeight: 600, height: 22,
                              background: app.status === 'offer' ? 'rgba(0,230,118,0.15)' : app.status === 'interview' ? 'rgba(0,217,255,0.15)' : app.status === 'rejected' ? 'rgba(255,82,82,0.15)' : 'rgba(108,99,255,0.15)',
                              color: app.status === 'offer' ? '#00E676' : app.status === 'interview' ? '#00D9FF' : app.status === 'rejected' ? '#FF5252' : '#6C63FF',
                            }}
                          />
                        </ListItem>
                        {i < recentApps.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
