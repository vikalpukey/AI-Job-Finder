import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  Select,
  MenuItem,
  FormControl,
  Button,
  Divider,
  Alert,
} from "@mui/material";
import {
  Notifications,
  Visibility,
  Security,
  Language,
  Restore,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { updateSetting, resetSettings } from "../redux/slices/settingsSlice";
import MainLayout from "../components/layout/MainLayout";

const SettingRow = ({ label, description, children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 2,
    }}
  >
    <Box sx={{ flex: 1, mr: 2 }}>
      <Typography
        variant="body2"
        fontWeight={600}
      >
        {label}
      </Typography>
      {description && (
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {description}
        </Typography>
      )}
    </Box>
    {children}
  </Box>
);

export default function SettingsPage() {
  const dispatch = useDispatch();
  const settings = useSelector((s) => s.settings);

  const toggle = (key) =>
    dispatch(updateSetting({ key, value: !settings[key] }));
  const set = (key, value) => dispatch(updateSetting({ key, value }));

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            mb={0.5}
          >
            Settings
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Manage your preferences and account settings.
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={8}
          >
            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card sx={{ p: 1, mb: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Notifications sx={{ color: "#6C63FF" }} />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Notifications
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }} />

                  <SettingRow
                    label="Email Alerts"
                    description="Receive job match alerts and updates via email"
                  >
                    <Switch
                      checked={settings.emailAlerts}
                      onChange={() => toggle("emailAlerts")}
                      color="primary"
                    />
                  </SettingRow>
                  <Divider />

                  <SettingRow
                    label="Push Notifications"
                    description="Browser push notifications for real-time updates"
                  >
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={() => toggle("pushNotifications")}
                      color="primary"
                    />
                  </SettingRow>
                  <Divider />

                  <SettingRow
                    label="Job Match Alerts"
                    description="Get notified when new jobs match your profile"
                  >
                    <Switch
                      checked={settings.jobMatchAlerts}
                      onChange={() => toggle("jobMatchAlerts")}
                      color="primary"
                    />
                  </SettingRow>
                  <Divider />

                  <SettingRow
                    label="Application Updates"
                    description="Updates on your submitted applications"
                  >
                    <Switch
                      checked={settings.applicationUpdates}
                      onChange={() => toggle("applicationUpdates")}
                      color="primary"
                    />
                  </SettingRow>
                  <Divider />

                  <SettingRow
                    label="Weekly Digest"
                    description="A summary email of your job search activity"
                  >
                    <Switch
                      checked={settings.weeklyDigest}
                      onChange={() => toggle("weeklyDigest")}
                      color="primary"
                    />
                  </SettingRow>
                </CardContent>
              </Card>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card sx={{ p: 1, mb: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Visibility sx={{ color: "#00D9FF" }} />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Privacy
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }} />

                  <SettingRow
                    label="Profile Visibility"
                    description="Control who can see your profile"
                  >
                    <FormControl
                      size="small"
                      sx={{ minWidth: 130 }}
                    >
                      <Select
                        value={settings.profileVisibility}
                        onChange={(e) =>
                          set("profileVisibility", e.target.value)
                        }
                      >
                        <MenuItem value="public">Public</MenuItem>
                        <MenuItem value="recruiters">Recruiters Only</MenuItem>
                        <MenuItem value="private">Private</MenuItem>
                      </Select>
                    </FormControl>
                  </SettingRow>
                  <Divider />

                  <SettingRow
                    label="Show Salary Expectations"
                    description="Display your expected salary to recruiters"
                  >
                    <Switch
                      checked={settings.showSalary}
                      onChange={() => toggle("showSalary")}
                      color="primary"
                    />
                  </SettingRow>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Language sx={{ color: "#00E676" }} />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Preferences
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }} />

                  <SettingRow label="Language">
                    <FormControl
                      size="small"
                      sx={{ minWidth: 130 }}
                    >
                      <Select
                        value={settings.language}
                        onChange={(e) => set("language", e.target.value)}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                      </Select>
                    </FormControl>
                  </SettingRow>
                  <Divider />

                  <SettingRow label="Timezone">
                    <FormControl
                      size="small"
                      sx={{ minWidth: 200 }}
                    >
                      <Select
                        value={settings.timezone}
                        onChange={(e) => set("timezone", e.target.value)}
                      >
                        <MenuItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </MenuItem>
                        <MenuItem value="America/New_York">
                          Eastern Time (ET)
                        </MenuItem>
                        <MenuItem value="America/Chicago">
                          Central Time (CT)
                        </MenuItem>
                        <MenuItem value="Europe/London">GMT (London)</MenuItem>
                        <MenuItem value="Europe/Berlin">CET (Berlin)</MenuItem>
                      </Select>
                    </FormControl>
                  </SettingRow>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Column */}
          <Grid
            item
            xs={12}
            md={4}
          >
            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card
                sx={{ p: 1, mb: 3, border: "1px solid rgba(255,82,82,0.2)" }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Security sx={{ color: "#FF5252" }} />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#FF5252"
                    >
                      Danger Zone
                    </Typography>
                  </Box>
                  <Alert
                    severity="warning"
                    sx={{ mb: 2, borderRadius: "10px" }}
                  >
                    These actions cannot be undone.
                  </Alert>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ mb: 1.5, borderColor: "rgba(255,82,82,0.3)" }}
                  >
                    Delete All Applications
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ borderColor: "rgba(255,82,82,0.3)" }}
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>

              {/* Reset Settings */}
              <Card sx={{ p: 1 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Restore sx={{ color: "#FFB300" }} />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Reset
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                  >
                    Reset all settings to their default values.
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Restore />}
                    onClick={() => dispatch(resetSettings())}
                    sx={{
                      borderColor: "rgba(255,179,0,0.3)",
                      color: "#FFB300",
                    }}
                  >
                    Reset All Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}
