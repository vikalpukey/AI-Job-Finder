import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Add,
  Save,
  LinkedIn,
  GitHub,
  Language,
  Work,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { updateProfile } from "../redux/slices/authSlice";
import MainLayout from "../components/layout/MainLayout";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    title: user?.title || "",
    location: user?.location || "",
    phone: user?.phone || "",
    website: user?.website || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    bio: user?.bio || "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(user?.skills || []);

  const handleSave = () => {
    dispatch(updateProfile({ ...form, skills }));
    setEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  return (
    <MainLayout>
      <Box>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              mb={0.5}
            >
              My Profile
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              Manage your professional information
            </Typography>
          </Box>
          <Button
            variant={editing ? "contained" : "outlined"}
            startIcon={editing ? <Save /> : <Edit />}
            onClick={editing ? handleSave : () => setEditing(true)}
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        </Box>

        <Grid
          container
          spacing={3}
        >
          {/* Left — Avatar + Info */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card sx={{ p: 1, mb: 3, textAlign: "center" }}>
                <CardContent>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src={user?.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                        border: "3px solid #6C63FF",
                        mx: "auto",
                      }}
                    >
                      {user?.name?.[0]}
                    </Avatar>
                    {editing && (
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          background: "#6C63FF",
                          "&:hover": { background: "#5A52E0" },
                          width: 28,
                          height: 28,
                        }}
                      >
                        <Edit sx={{ fontSize: "0.75rem", color: "#fff" }} />
                      </IconButton>
                    )}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={1}
                  >
                    {user?.title}
                  </Typography>
                  <Chip
                    label={user?.jobSearchStatus || "Actively Looking"}
                    size="small"
                    sx={{
                      background: "rgba(0,230,118,0.15)",
                      color: "#00E676",
                      fontWeight: 600,
                    }}
                  />
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {user?.linkedin && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LinkedIn
                          sx={{ color: "#0077B5", fontSize: "1.1rem" }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {user.linkedin}
                        </Typography>
                      </Box>
                    )}
                    {user?.github && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <GitHub
                          sx={{ color: "text.secondary", fontSize: "1.1rem" }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {user.github}
                        </Typography>
                      </Box>
                    )}
                    {user?.website && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Language
                          sx={{ color: "#6C63FF", fontSize: "1.1rem" }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {user.website}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2}
                  >
                    Skills
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    {skills.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        onDelete={editing ? () => removeSkill(s) : undefined}
                        sx={{
                          background: "rgba(108,99,255,0.15)",
                          color: "#6C63FF",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                  {editing && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Add skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        sx={{ flex: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={addSkill}
                        sx={{
                          background: "#6C63FF",
                          "&:hover": { background: "#5A52E0" },
                        }}
                      >
                        <Add sx={{ color: "#fff", fontSize: "1rem" }} />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right — Editable Info */}
          <Grid
            item
            xs={12}
            md={8}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Basic Info */}
              <Card sx={{ p: 1, mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2.5}
                  >
                    Basic Information
                  </Typography>
                  <Grid
                    container
                    spacing={2.5}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >
                      <TextField
                        fullWidth
                        label="Job Title"
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >
                      <TextField
                        fullWidth
                        label="Location"
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                    >
                      <TextField
                        fullWidth
                        label="Phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        disabled={!editing}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Professional Bio"
                        value={form.bio}
                        onChange={(e) =>
                          setForm({ ...form, bio: e.target.value })
                        }
                        disabled={!editing}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Links */}
              <Card sx={{ p: 1, mb: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={2.5}
                  >
                    Links
                  </Typography>
                  <Grid
                    container
                    spacing={2.5}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={4}
                    >
                      <TextField
                        fullWidth
                        label="LinkedIn"
                        value={form.linkedin}
                        onChange={(e) =>
                          setForm({ ...form, linkedin: e.target.value })
                        }
                        disabled={!editing}
                        InputProps={{
                          startAdornment: (
                            <LinkedIn
                              sx={{
                                color: "#0077B5",
                                mr: 1,
                                fontSize: "1.1rem",
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                    >
                      <TextField
                        fullWidth
                        label="GitHub"
                        value={form.github}
                        onChange={(e) =>
                          setForm({ ...form, github: e.target.value })
                        }
                        disabled={!editing}
                        InputProps={{
                          startAdornment: (
                            <GitHub
                              sx={{
                                color: "text.secondary",
                                mr: 1,
                                fontSize: "1.1rem",
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                    >
                      <TextField
                        fullWidth
                        label="Website"
                        value={form.website}
                        onChange={(e) =>
                          setForm({ ...form, website: e.target.value })
                        }
                        disabled={!editing}
                        InputProps={{
                          startAdornment: (
                            <Language
                              sx={{
                                color: "#6C63FF",
                                mr: 1,
                                fontSize: "1.1rem",
                              }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Work Experience
                    </Typography>
                    {editing && (
                      <Button
                        size="small"
                        startIcon={<Add />}
                        variant="outlined"
                        sx={{ py: 0.5 }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                  {user?.experience?.map((exp, i) => (
                    <Box
                      key={exp.id}
                      sx={{ mb: i < user.experience.length - 1 ? 3 : 0 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "10px",
                            background: "rgba(108,99,255,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Work sx={{ color: "#6C63FF", fontSize: "1.1rem" }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="body1"
                            fontWeight={700}
                          >
                            {exp.role}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary"
                          >
                            {exp.company}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {exp.duration}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={0.5}
                            lineHeight={1.6}
                          >
                            {exp.description}
                          </Typography>
                        </Box>
                      </Box>
                      {i < user.experience.length - 1 && (
                        <Divider sx={{ mt: 2.5 }} />
                      )}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
