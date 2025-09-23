import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { apiUrl } from '../utils/api';

interface ShiftApplication {
  id: string;
  userId: string;
  shiftId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  message?: string;
  isHidden?: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  shift: {
    id: string;
    startTime: string;
    endTime: string;
    location?: string;
    notes?: string;
  };
}

const SkiftsoknaderPage: NextPage = () => {
  const [applications, setApplications] = useState<ShiftApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ShiftApplication | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl('/shift-applications'), {
        withCredentials: true,
      });
      setApplications(response.data);
      setError(null);
    } catch (err: any) {
      setError('Kunne ikke hente skiftsøknader');
      console.error('Feil ved henting av skiftsøknader:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId: string) => {
    try {
      await axios.post(`http://localhost:3001/shift-applications/${applicationId}/approve`, {}, {
        withCredentials: true,
      });
      
      setSuccess('Skiftsøknad godkjent!');
      fetchApplications();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Kunne ikke godkjenne søknad');
      console.error('Feil ved godkjenning:', err);
    }
  };

  const handleReject = async (applicationId: string, message?: string) => {
    try {
      await axios.post(`http://localhost:3001/shift-applications/${applicationId}/reject`, {
        message: message || 'Søknad avvist',
      }, {
        withCredentials: true,
      });
      
      setSuccess('Skiftsøknad avvist');
      setShowDetailsDialog(false);
      setSelectedApplication(null);
      setRejectionMessage('');
      fetchApplications();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Kunne ikke avvise søknad');
      console.error('Feil ved avvisning:', err);
    }
  };

  const handleRemove = async (applicationId: string) => {
    try {
      // Send forespørsel til backend for å markere som fjernet
      await axios.patch(`http://localhost:3001/shift-applications/${applicationId}/remove`, {}, {
        withCredentials: true,
      });
      
      // Fjern fra lokalt state
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      setSuccess('Skiftsøknad fjernet fra skjermen!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      // Hvis backend ikke støtter remove, bare fjern fra frontend
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      setSuccess('Skiftsøknad fjernet fra skjermen!');
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const openDetailsDialog = (application: ShiftApplication) => {
    setSelectedApplication(application);
    setShowDetailsDialog(true);
  };

  const closeDetailsDialog = () => {
    setShowDetailsDialog(false);
    setSelectedApplication(null);
    setRejectionMessage('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (dateString: string) => {
    // Bruk UTC-tid for å unngå timezone-konvertering
    const date = new Date(dateString);
    return date.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Venter';
      case 'APPROVED':
        return 'Godkjent';
      case 'REJECTED':
        return 'Avvist';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Laster skiftsøknader...
        </Typography>
      </Box>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2.5 }}>
          Skiftsøknader
        </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

             {applications.filter(app => !app.isHidden).length === 0 ? (
         <Paper sx={{ p: 3, textAlign: 'center' }}>
           <Typography variant="h6" color="text.secondary">
             Ingen skiftsøknader funnet
           </Typography>
         </Paper>
       ) : (
        <TableContainer component={Paper} sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 10px 30px rgba(16,24,40,0.08)'
        }}>
          <Table sx={{
            '& th': { bgcolor: 'grey.50', fontWeight: 'bold' },
            '& td, & th': { borderBottomColor: 'divider', py: 2 },
            '& tbody tr:hover': { bgcolor: 'grey.50' }
          }}>
            <TableHead>
              <TableRow>
                <TableCell>Ansatt</TableCell>
                <TableCell>Skift</TableCell>
                <TableCell>Melding</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Søknadsdato</TableCell>
                <TableCell>Handlinger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.filter(app => !app.isHidden).map((application) => (
               <TableRow key={application.id} hover>
                 <TableCell>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                     <Avatar sx={{ bgcolor: 'grey.200', color: 'text.primary', border: '1px solid', borderColor: 'divider', width: 32, height: 32 }}>
                       {application.user.name?.charAt(0) || '?'}
                     </Avatar>
                     <Box>
                       <Typography variant="body1" fontWeight="medium">
                         {application.user.name}
                       </Typography>
                     </Box>
                   </Box>
                 </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {formatTime(application.shift.startTime)} - {formatTime(application.shift.endTime)}
                      </Typography>
                      {application.shift.location && (
                        <Typography variant="caption" color="text.secondary">
                          📍 {application.shift.location}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {application.message || 'Ingen melding'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                   <Chip
                     label={getStatusLabel(application.status)}
                     size="small"
                     sx={{
                       bgcolor: application.status === 'PENDING' ? 'transparent' : (application.status === 'APPROVED' ? 'success.light' : 'error.light'),
                       color: application.status === 'PENDING' ? 'warning.main' : (application.status === 'APPROVED' ? 'success.darker' : 'error.darker'),
                       border: application.status === 'PENDING' ? 'none' : '1px solid',
                       borderColor: application.status === 'PENDING' ? 'transparent' : 'divider',
                       fontWeight: application.status === 'PENDING' ? 600 : undefined
                     }}
                   />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(application.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                   <Box sx={{ display: 'flex', gap: 1 }}>
                      {application.status === 'PENDING' && (
                        <>
                          <Tooltip title="Godkjenn">
                             <IconButton
                              size="small"
                              onClick={() => handleApprove(application.id)}
                               sx={{
                                 bgcolor: 'transparent',
                                 border: 'none',
                                 color: 'success.main',
                                 filter: 'drop-shadow(0 1px 2px rgba(16,24,40,0.25))',
                                 '&:hover': { transform: 'translateY(-1px)' }
                               }}
                            >
                              <CheckIcon />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Avvis">
                             <IconButton
                              size="small"
                              onClick={() => openDetailsDialog(application)}
                               sx={{
                                 bgcolor: 'transparent',
                                 border: 'none',
                                 color: 'error.main',
                                 filter: 'drop-shadow(0 1px 2px rgba(16,24,40,0.25))',
                                 '&:hover': { transform: 'translateY(-1px)' }
                               }}
                            >
                               <CloseIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Detaljer Dialog */}
      <Dialog
        open={showDetailsDialog}
        onClose={closeDetailsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Skiftsøknad - {selectedApplication?.user.name}
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ansatt
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Navn:</strong> {selectedApplication.user.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>E-post:</strong> {selectedApplication.user.email}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Skift
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Tid:</strong> {formatTime(selectedApplication.shift.startTime)} - {formatTime(selectedApplication.shift.endTime)}
              </Typography>
              {selectedApplication.shift.location && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Lokasjon:</strong> {selectedApplication.shift.location}
                </Typography>
              )}
              {selectedApplication.shift.notes && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Notater:</strong> {selectedApplication.shift.notes}
                </Typography>
              )}

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Søknad
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Melding:</strong> {selectedApplication.message || 'Ingen melding'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Søknadsdato:</strong> {formatDate(selectedApplication.createdAt)}
              </Typography>

              {selectedApplication.status === 'PENDING' && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Avvis søknad
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Årsak til avvisning (valgfritt)"
                    value={rejectionMessage}
                    onChange={(e) => setRejectionMessage(e.target.value)}
                    placeholder="Skriv en forklaring på hvorfor søknaden avvises..."
                  />
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetailsDialog}>
            Lukk
          </Button>
          
          {selectedApplication?.status === 'PENDING' && (
            <>
              <Button
                onClick={() => handleApprove(selectedApplication.id)}
                color="success"
                variant="contained"
                startIcon={<CheckIcon />}
              >
                Godkjenn
              </Button>
              
              <Button
                onClick={() => handleReject(selectedApplication.id, rejectionMessage)}
                color="error"
                variant="contained"
                startIcon={<CancelIcon />}
              >
                Avvis
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
        </Box>
      </Layout>
    );
  };

export default SkiftsoknaderPage;
