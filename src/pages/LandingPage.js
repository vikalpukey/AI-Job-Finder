import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import {
  AutoAwesome,
  Work,
  Assessment,
  TrackChanges,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const features = [
  {
    icon: <Assessment sx={{ fontSize: "2rem", color: "#6C63FF" }} />,
    title: "ATS Score Analyzer",
    desc: "Instantly score your resume against any job description and see exactly what's missing.",
    color: "#6C63FF",
  },
  {
    icon: <AutoAwesome sx={{ fontSize: "2rem", color: "#00D9FF" }} />,
    title: "AI Resume Suggestions",
    desc: "Get personalized AI-powered recommendations to make your resume stand out.",
    color: "#00D9FF",
  },
  {
    icon: <Work sx={{ fontSize: "2rem", color: "#00E676" }} />,
    title: "Smart Job Search",
    desc: "Filter thousands of jobs by role, salary, location, and remote preferences instantly.",
    color: "#00E676",
  },
  {
    icon: <TrackChanges sx={{ fontSize: "2rem", color: "#FFB300" }} />,
    title: "Application Tracker",
    desc: "Visual Kanban board to track every application from applied to offer.",
    color: "#FFB300",
  },
];

const stats = [
  { value: "50K+", label: "Jobs Listed" },
  { value: "12K+", label: "Users Hired" },
  { value: "94%", label: "ATS Pass Rate" },
  { value: "3x", label: "Faster Hiring" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ minHeight: "100vh", background: "#0A0A0F", overflowX: "hidden" }}
    >
      {/* Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 6 },
          py: 2,
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6C63FF, #00D9FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "#fff",
              fontSize: "1rem",
            }}
          >
            H
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #6C63FF, #00D9FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HuntAI
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{
              borderColor: "rgba(255,255,255,0.2)",
              color: "text.secondary",
              "&:hover": { borderColor: "#6C63FF", color: "#6C63FF" },
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          pt: 10,
          pb: 8,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.15) 0%, transparent 70%)",
          position: "relative",
        }}
      >
        {/* Floating orbs */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(108,99,255,0.06)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(0,217,255,0.06)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Chip
                icon={
                  <AutoAwesome
                    sx={{
                      fontSize: "0.85rem !important",
                      color: "#6C63FF !important",
                    }}
                  />
                }
                label="AI-Powered Job Hunting Platform"
                sx={{
                  mb: 3,
                  background: "rgba(108,99,255,0.15)",
                  border: "1px solid rgba(108,99,255,0.3)",
                  color: "#6C63FF",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                }}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 900,
                  background:
                    "linear-gradient(135deg, #F0F0FF 30%, #6C63FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
              >
                Land Your Dream Job with AI
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                  mb: 5,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                }}
              >
                Optimize your resume with ATS analysis, track applications on a
                Kanban board, generate cover letters, and find perfectly matched
                jobs — all in one platform.
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/register")}
                  sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
                >
                  Start for Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <AvatarGroup
                  max={4}
                  sx={{
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      border: "2px solid #6C63FF",
                    },
                  }}
                >
                  {["Alex", "Sam", "Jordan", "Morgan"].map((name) => (
                    <Avatar
                      key={name}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                    />
                  ))}
                </AvatarGroup>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  <strong style={{ color: "#F0F0FF" }}>12,000+</strong>{" "}
                  professionals hired this month
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          py: 6,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            justifyContent="center"
          >
            {stats.map((stat, i) => (
              <Grid
                item
                xs={6}
                md={3}
                key={stat.label}
              >
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #6C63FF, #00D9FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              mb={1}
              sx={{ fontWeight: 800 }}
            >
              Everything You Need to{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #6C63FF, #00D9FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Get Hired
              </Box>
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
              mb={6}
            >
              Powerful AI tools that give you an unfair advantage in today's
              competitive job market.
            </Typography>
          </motion.div>

          <Grid
            container
            spacing={3}
          >
            {features.map((f, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={f.title}
              >
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  whileHover={{ y: -8 }}
                >
                  <Card sx={{ height: "100%", p: 1 }}>
                    <CardContent>
                      <Box
                        sx={{
                          width: 54,
                          height: 54,
                          borderRadius: "14px",
                          background: `${f.color}20`,
                          border: `1px solid ${f.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        {f.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={1}
                      >
                        {f.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        lineHeight={1.6}
                      >
                        {f.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="sm">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card
              sx={{
                textAlign: "center",
                p: 4,
                background:
                  "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(0,217,255,0.1))",
                border: "1px solid rgba(108,99,255,0.3)",
              }}
            >
              <AutoAwesome sx={{ fontSize: "3rem", color: "#6C63FF", mb: 2 }} />
              <Typography
                variant="h4"
                fontWeight={800}
                mb={2}
              >
                Ready to Get Hired?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                mb={4}
              >
                Join thousands of professionals who landed their dream jobs
                using HuntAI.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate("/register")}
                sx={{ px: 5 }}
              >
                Create Free Account
              </Button>
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 3,
                }}
              >
                {["No credit card", "Free forever", "Cancel anytime"].map(
                  (t) => (
                    <Box
                      key={t}
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CheckCircle
                        sx={{ fontSize: "0.9rem", color: "#00E676" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {t}
                      </Typography>
                    </Box>
                  ),
                )}
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          © 2026 HuntAI. Built with ❤️ for job seekers everywhere.
        </Typography>
      </Box>
    </Box>
  );
}
