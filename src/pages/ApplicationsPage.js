import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Avatar,
  IconButton, Tooltip, TextField, Button, Divider,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVert, AttachMoney, Notes, Delete, OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { updateApplicationStatus, removeApplication } from '../redux/slices/applicationsSlice';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const COLUMNS = [
  { id: 'applied', label: 'Applied', color: '#6C63FF', bg: 'rgba(108,99,255,0.1)' },
  { id: 'interview', label: 'Interview', color: '#00D9FF', bg: 'rgba(0,217,255,0.1)' },
  { id: 'offer', label: 'Offer', color: '#00E676', bg: 'rgba(0,230,118,0.1)' },
  { id: 'rejected', label: 'Rejected', color: '#FF5252', bg: 'rgba(255,82,82,0.1)' },
];

const AppCard = ({ app, index, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Draggable draggableId={String(app.id)} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <motion.div animate={{ scale: snapshot.isDragging ? 1.03 : 1 }}>
            <Card
              sx={{
                mb: 2, p: 0,
                border: snapshot.isDragging ? '1px solid rgba(108,99,255,0.5)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: snapshot.isDragging ? '0 20px 60px rgba(108,99,255,0.3)' : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Avatar src={app.logo} sx={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.1)' }}>
                      {app.company[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700} lineHeight={1.2}>{app.jobTitle}</Typography>
                      <Typography variant="caption" color="text.secondary">{app.company}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="View job">
                      <IconButton size="small" onClick={() => navigate(`/jobs/${app.jobId}`)} sx={{ color: 'text.secondary', p: 0.5 }}>
                        <OpenInNew sx={{ fontSize: '0.85rem' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <IconButton size="small" onClick={() => onDelete(app.id)} sx={{ color: 'text.secondary', p: 0.5, '&:hover': { color: '#FF5252' } }}>
                        <Delete sx={{ fontSize: '0.85rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Salary */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <AttachMoney sx={{ fontSize: '0.8rem', color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">{app.salary}</Typography>
                </Box>

                {/* Applied date */}
                <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
                  Applied: {app.appliedDate}
                </Typography>

                {/* Next Step */}
                {app.nextStep && app.nextStep !== 'N/A' && (
                  <Box sx={{ p: 1, borderRadius: '8px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)' }}>
                    <Typography variant="caption" color="primary" fontWeight={600}>
                      Next: {app.nextStep}
                    </Typography>
                  </Box>
                )}

                {/* Notes */}
                {app.notes && (
                  <Box sx={{ mt: 1.5, display: 'flex', gap: 0.5 }}>
                    <Notes sx={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.2, flexShrink: 0 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {app.notes}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default function ApplicationsPage() {
  const dispatch = useDispatch();
  const { applications } = useSelector((s) => s.applications);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    dispatch(updateApplicationStatus({ id: Number(draggableId), status: destination.droppableId }));
  };

  const getColumnApps = (status) => applications.filter((a) => a.status === status);

  return (
    <MainLayout>
      <Box>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} mb={0.5}>Application Tracker</Typography>
            <Typography variant="body1" color="text.secondary">
              Drag and drop applications between columns to track your progress.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {COLUMNS.map((col) => (
              <Chip
                key={col.id}
                label={`${col.label}: ${getColumnApps(col.id).length}`}
                sx={{ background: col.bg, color: col.color, fontWeight: 600 }}
              />
            ))}
          </Box>
        </Box>

        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2.5}>
            {COLUMNS.map((col) => (
              <Grid item xs={12} sm={6} lg={3} key={col.id}>
                <Box
                  sx={{
                    borderRadius: '16px',
                    background: col.bg,
                    border: `1px solid ${col.color}30`,
                    p: 2,
                    minHeight: 500,
                  }}
                >
                  {/* Column Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: col.color }} />
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: col.color }}>
                        {col.label}
                      </Typography>
                    </Box>
                    <Chip
                      label={getColumnApps(col.id).length}
                      size="small"
                      sx={{ background: `${col.color}25`, color: col.color, height: 22, fontWeight: 700, fontSize: '0.75rem' }}
                    />
                  </Box>

                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          minHeight: 400,
                          borderRadius: '8px',
                          background: snapshot.isDraggingOver ? `${col.color}08` : 'transparent',
                          transition: 'background 0.2s',
                          p: snapshot.isDraggingOver ? 0.5 : 0,
                        }}
                      >
                        {getColumnApps(col.id).map((app, i) => (
                          <AppCard
                            key={app.id}
                            app={app}
                            index={i}
                            onDelete={(id) => dispatch(removeApplication(id))}
                          />
                        ))}
                        {provided.placeholder}
                        {getColumnApps(col.id).length === 0 && !snapshot.isDraggingOver && (
                          <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="caption" color="text.secondary">
                              Drop applications here
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Droppable>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Box>
    </MainLayout>
  );
}
