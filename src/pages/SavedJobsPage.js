import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Bookmark,
  LocationOn,
  AttachMoney,
  TrendingUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { toggleSaveJob, setSelectedJob } from "../redux/slices/jobsSlice";
import { addApplication } from "../redux/slices/applicationsSlice";
import MainLayout from "../components/layout/MainLayout";

export default function SavedJobsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs } = useSelector((s) => s.jobs);
  const { applications } = useSelector((s) => s.applications);
  const savedJobs = jobs.filter((j) => j.saved);

  const isApplied = (jobId) => applications.some((a) => a.jobId === jobId);

  const handleApply = (job) => {
    if (!isApplied(job.id)) {
      dispatch(
        addApplication({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          logo: job.logo,
          appliedDate: new Date().toISOString().split("T")[0],
          status: "applied",
          notes: "",
          salary: job.salary,
          location: job.location,
          nextStep: "Waiting for recruiter response",
        }),
      );
    }
  };

  const matchColor = (score) =>
    score >= 80 ? "#00E676" : score >= 65 ? "#FFB300" : "#FF5252";

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            mb={0.5}
          >
            Saved Jobs
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
          </Typography>
        </Box>

        {savedJobs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Bookmark
              sx={{
                fontSize: "5rem",
                color: "text.secondary",
                mb: 2,
                opacity: 0.3,
              }}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              mb={1}
            >
              No saved jobs yet
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={3}
            >
              Browse jobs and click the bookmark icon to save them here.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/jobs")}
            >
              Browse Jobs
            </Button>
          </Box>
        ) : (
          <Grid
            container
            spacing={3}
          >
            {savedJobs.map((job, i) => (
              <Grid
                item
                xs={12}
                md={6}
                key={job.id}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(setSelectedJob(job));
                      navigate(`/jobs/${job.id}`);
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            src={job.logo}
                            sx={{
                              width: 46,
                              height: 46,
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            {job.company[0]}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              fontWeight={700}
                            >
                              {job.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {job.company}
                            </Typography>
                          </Box>
                        </Box>
                        <Tooltip title="Unsave">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(toggleSaveJob(job.id));
                            }}
                            sx={{ color: "#6C63FF" }}
                          >
                            <Bookmark />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mb: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <LocationOn
                            sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {job.location}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <AttachMoney
                            sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {job.salary}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <TrendingUp
                            sx={{
                              fontSize: "0.9rem",
                              color: matchColor(job.atsScore),
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: matchColor(job.atsScore),
                              fontWeight: 600,
                            }}
                          >
                            {job.atsScore}% match
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 2.5,
                          flexWrap: "wrap",
                        }}
                      >
                        {job.skills.slice(0, 4).map((s) => (
                          <Chip
                            key={s}
                            label={s}
                            size="small"
                            sx={{
                              background: "rgba(108,99,255,0.12)",
                              color: "#6C63FF",
                              height: 22,
                              fontSize: "0.7rem",
                            }}
                          />
                        ))}
                        {job.remote && (
                          <Chip
                            label="Remote"
                            size="small"
                            sx={{
                              background: "rgba(0,230,118,0.12)",
                              color: "#00E676",
                              height: 22,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        <Button
                          variant={isApplied(job.id) ? "outlined" : "contained"}
                          size="small"
                          disabled={isApplied(job.id)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(job);
                          }}
                          sx={{ flex: 1 }}
                        >
                          {isApplied(job.id) ? "✓ Applied" : "Apply Now"}
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setSelectedJob(job));
                            navigate(`/jobs/${job.id}`);
                          }}
                          sx={{ flex: 1 }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </MainLayout>
  );
}
