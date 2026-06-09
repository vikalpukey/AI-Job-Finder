import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Skeleton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Search,
  BookmarkBorder,
  Bookmark,
  LocationOn,
  Work,
  AttachMoney,
  FilterList,
  Close,
  TrendingUp,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleSaveJob,
  setSearchQuery,
  setFilter,
  clearFilters,
  setSelectedJob,
} from "../redux/slices/jobsSlice";
import { addApplication } from "../redux/slices/applicationsSlice";
import { jobCategories, jobTypes } from "../data/mockJobs";
import MainLayout from "../components/layout/MainLayout";

const JobCard = ({ job, onView, onSave, onApply }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    <Card
      sx={{ cursor: "pointer", position: "relative", overflow: "visible" }}
      onClick={() => onView(job)}
    >
      {job.applied && (
        <Box
          sx={{
            position: "absolute",
            top: -8,
            right: 12,
            background: "#00E676",
            borderRadius: "6px",
            px: 1,
            py: 0.3,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#000", fontWeight: 700, fontSize: "0.65rem" }}
          >
            APPLIED
          </Typography>
        </Box>
      )}
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Avatar
              src={job.logo}
              sx={{
                width: 44,
                height: 44,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {job.company[0]}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                lineHeight={1.2}
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
          <Tooltip title={job.saved ? "Unsave" : "Save job"}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onSave(job.id);
              }}
              sx={{ color: job.saved ? "#6C63FF" : "text.secondary" }}
            >
              {job.saved ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip
            icon={<LocationOn sx={{ fontSize: "0.8rem !important" }} />}
            label={job.location}
            size="small"
            sx={{ background: "rgba(255,255,255,0.05)", fontSize: "0.75rem" }}
          />
          <Chip
            icon={<Work sx={{ fontSize: "0.8rem !important" }} />}
            label={job.type}
            size="small"
            sx={{ background: "rgba(255,255,255,0.05)", fontSize: "0.75rem" }}
          />
          {job.remote && (
            <Chip
              label="Remote"
              size="small"
              sx={{
                background: "rgba(0,230,118,0.15)",
                color: "#00E676",
                fontSize: "0.75rem",
              }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <AttachMoney sx={{ fontSize: "0.9rem", color: "text.secondary" }} />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {job.salary}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2.5 }}>
          {job.skills.slice(0, 3).map((s) => (
            <Chip
              key={s}
              label={s}
              size="small"
              sx={{
                background: "rgba(108,99,255,0.12)",
                color: "#6C63FF",
                fontSize: "0.7rem",
                height: 22,
              }}
            />
          ))}
          {job.skills.length > 3 && (
            <Chip
              label={`+${job.skills.length - 3}`}
              size="small"
              sx={{
                background: "rgba(255,255,255,0.05)",
                fontSize: "0.7rem",
                height: 22,
              }}
            />
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <TrendingUp
              sx={{
                fontSize: "0.85rem",
                color:
                  job.atsScore >= 80
                    ? "#00E676"
                    : job.atsScore >= 65
                      ? "#FFB300"
                      : "#FF5252",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color:
                  job.atsScore >= 80
                    ? "#00E676"
                    : job.atsScore >= 65
                      ? "#FFB300"
                      : "#FF5252",
                fontWeight: 600,
              }}
            >
              {job.atsScore}% match
            </Typography>
          </Box>
          <Button
            size="small"
            variant={job.applied ? "outlined" : "contained"}
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
            disabled={job.applied}
            sx={{ py: 0.5, px: 2, fontSize: "0.75rem" }}
          >
            {job.applied ? "Applied" : "Apply Now"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

export default function JobSearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filteredJobs, searchQuery, filters } = useSelector((s) => s.jobs);
  const [showFilters, setShowFilters] = useState(false);
  const [loading] = useState(false);

  const handleApply = (job) => {
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
  };

  const handleView = (job) => {
    dispatch(setSelectedJob(job));
    navigate(`/jobs/${job.id}`);
  };

  return (
    <MainLayout>
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            mb={0.5}
          >
            Find Your Next Role
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            {filteredJobs.length} jobs matching your profile
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search by title, company, skill..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            sx={{ flex: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => dispatch(clearFilters())}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant={showFilters ? "contained" : "outlined"}
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ mb: 3, p: 1 }}>
                <CardContent>
                  <Grid
                    container
                    spacing={2.5}
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                    >
                      <FormControl
                        fullWidth
                        size="small"
                      >
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={filters.category}
                          label="Category"
                          onChange={(e) =>
                            dispatch(setFilter({ category: e.target.value }))
                          }
                        >
                          {jobCategories.map((c) => (
                            <MenuItem
                              key={c}
                              value={c}
                            >
                              {c}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                    >
                      <FormControl
                        fullWidth
                        size="small"
                      >
                        <InputLabel>Job Type</InputLabel>
                        <Select
                          value={filters.type}
                          label="Job Type"
                          onChange={(e) =>
                            dispatch(setFilter({ type: e.target.value }))
                          }
                        >
                          {jobTypes.map((t) => (
                            <MenuItem
                              key={t}
                              value={t}
                            >
                              {t}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={filters.remote}
                            onChange={(e) =>
                              dispatch(setFilter({ remote: e.target.checked }))
                            }
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2">Remote Only</Typography>
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                    >
                      <Button
                        variant="text"
                        color="secondary"
                        onClick={() => dispatch(clearFilters())}
                      >
                        Clear All Filters
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {(filters.category !== "All" ||
          filters.type !== "All" ||
          filters.remote) && (
          <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
            {filters.category !== "All" && (
              <Chip
                label={filters.category}
                onDelete={() => dispatch(setFilter({ category: "All" }))}
                size="small"
                sx={{ background: "rgba(108,99,255,0.2)", color: "#6C63FF" }}
              />
            )}
            {filters.type !== "All" && (
              <Chip
                label={filters.type}
                onDelete={() => dispatch(setFilter({ type: "All" }))}
                size="small"
                sx={{ background: "rgba(108,99,255,0.2)", color: "#6C63FF" }}
              />
            )}
            {filters.remote && (
              <Chip
                label="Remote"
                onDelete={() => dispatch(setFilter({ remote: false }))}
                size="small"
                sx={{ background: "rgba(0,230,118,0.15)", color: "#00E676" }}
              />
            )}
          </Box>
        )}

        {/* Job Grid */}
        <Grid
          container
          spacing={3}
        >
          <AnimatePresence>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={i}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={280}
                      sx={{ borderRadius: "16px" }}
                    />
                  </Grid>
                ))
              : filteredJobs.map((job) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={job.id}
                  >
                    <JobCard
                      job={job}
                      onView={handleView}
                      onSave={(id) => dispatch(toggleSaveJob(id))}
                      onApply={handleApply}
                    />
                  </Grid>
                ))}
          </AnimatePresence>
          {filteredJobs.length === 0 && (
            <Grid
              item
              xs={12}
            >
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Work
                  sx={{ fontSize: "4rem", color: "text.secondary", mb: 2 }}
                />
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  No jobs found
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={3}
                >
                  Try adjusting your search or filters
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(clearFilters())}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </MainLayout>
  );
}
