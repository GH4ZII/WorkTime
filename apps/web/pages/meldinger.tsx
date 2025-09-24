import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import Chat from '../components/Chat';
import { useChat } from '../context/ChatContext';
import axios from 'axios'
import { apiUrl } from '../utils/api';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Avatar,
    IconButton,
    Alert,
    CircularProgress,
    Grid,
    Divider,
    Tooltip,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemButton
} from '@mui/material';
import {
    Chat as ChatIcon,
    Add as AddIcon,
    Group as GroupIcon,
    Person as PersonIcon,
    Check as CheckIcon,
    Cancel as CancelIcon,
    WifiOff as WifiOffIcon
} from '@mui/icons-material';

interface ChatRoom {
  id: string;
  name: string;
  members: Array<{
    user: {
      id: string;
      name: string;
    };
  }>;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

const MessagesPage: NextPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newChatName, setNewChatName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useChat();

  useEffect(() => {
    fetchChatRooms();
    fetchCurrentUser();
    fetchAllUsers();
  }, []);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl('/chatrooms'), {
        withCredentials: true,
      });
      setChatRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
      setError('Kunne ikke hente chatrom');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(apiUrl('/auth/me'), {
        withCredentials: true,
      });
      
      if (response.data && response.data.id) {
        setCurrentUser(response.data);
      } else {
        setError('Du må være innlogget for å bruke chat-funksjonaliteten');
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      
      if (error.response?.status === 401) {
        setError('Du må være innlogget for å bruke chat-funksjonaliteten');
      } else {
        setError('Kunne ikke hente brukerdata. Vennligst prøv å logge inn på nytt.');
      }
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(apiUrl('/users'), {
        withCredentials: true,
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Kunne ikke hente brukere');
    }
  };

  const handleCreateNewChat = async () => {
    if (selectedUsers.length === 0 || !newChatName.trim()) {
      setError('Vennligst velg brukere og gi chatrommet et navn');
      return;
    }

    try {
      const response = await axios.post(apiUrl('/chatrooms'), {
        name: newChatName,
        memberIds: selectedUsers,
      }, {
        withCredentials: true,
      });

      setChatRooms(prev => [...prev, response.data]);
      setShowNewChatModal(false);
      setSelectedUsers([]);
      setNewChatName('');
      setSelectedRoom(response.data.id);
      setError(null);
    } catch (error) {
      console.error('Failed to create chat room:', error);
      setError('Kunne ikke opprette chatrom');
    }
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleRoomClick = (roomId: string) => {
    console.log('MessagesPage: Room clicked:', roomId);
    setSelectedRoom(roomId);
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={60} sx={{ color: '#667eea' }} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
        {error && (
          <Alert severity="error" sx={{ m: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        {/* Top Header with Search */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid #e0e0e0',
          background: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChatIcon sx={{ color: '#1976d2', fontSize: 28 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2' }}>
                Chatter
              </Typography>
            </Box>
            
            <TextField
              placeholder="Søk i chatter..."
              variant="outlined"
              size="small"
              sx={{
                flex: 1,
                maxWidth: 400,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowNewChatModal(true)}
              sx={{
                backgroundColor: '#1976d2',
                borderRadius: 3,
                px: 3,
                py: 1,
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Ny chat
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: 'flex' }}>
          {/* Left Sidebar */}
          <Box sx={{ 
            width: 350, 
            minWidth: 350,
            borderRight: '1px solid #e0e0e0',
            background: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Sidebar Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ChatIcon sx={{ color: '#1976d2', fontSize: 20 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#1976d2' }}>
                    Chatterom
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setShowNewChatModal(true)}
                  sx={{
                    backgroundColor: '#1976d2',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  NY CHAT
                </Button>
              </Box>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {chatRooms.length} aktive chatterom
              </Typography>
            </Box>

            {/* Room List */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {chatRooms.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4, px: 3 }}>
                  <ChatIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Ingen chatterom
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Opprett ditt første chatterom for å komme i gang
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {chatRooms.map((room) => (
                    <ListItem 
                      key={room.id} 
                      disablePadding 
                      sx={{ px: 2, mb: 1 }}
                    >
                      <ListItemButton
                        selected={selectedRoom === room.id}
                        onClick={() => handleRoomClick(room.id)}
                        sx={{
                          borderRadius: 2,
                          py: 2,
                          '&.Mui-selected': {
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            '&:hover': {
                              backgroundColor: '#bbdefb',
                            }
                          },
                          '&:hover': {
                            backgroundColor: selectedRoom === room.id ? '#bbdefb' : '#f5f5f5',
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: selectedRoom === room.id ? '#1976d2' : '#e0e0e0',
                            color: selectedRoom === room.id ? 'white' : '#666',
                            width: 40,
                            height: 40
                          }}>
                            {room.members.length > 2 ? (
                              <GroupIcon />
                            ) : (
                              <PersonIcon />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={room.name}
                          secondary={room.members.length > 1 ? 
                            `${room.members.length} medlemmer` : 
                            `${room.members.length} medlem`
                          }
                          primaryTypographyProps={{
                            fontWeight: selectedRoom === room.id ? 'bold' : 'normal',
                            fontSize: '0.95rem'
                          }}
                          secondaryTypographyProps={{
                            fontSize: '0.8rem',
                            color: selectedRoom === room.id ? '#1976d2' : '#666'
                          }}
                        />
                        <Box sx={{ color: '#ccc' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>

          {/* Right Chat Area */}
          <Box sx={{ 
            flex: 1,
            background: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {selectedRoom && currentUser ? (
              <Box sx={{ height: '100%' }}>
                <Chat roomId={selectedRoom} currentUserId={currentUser.id} />
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                p: 4,
                background: '#fafafa'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  mb: 4,
                  color: '#666'
                }}>
                  <GroupIcon sx={{ fontSize: 24 }} />
                  <Typography variant="h6" color="text.secondary">
                    Ingen chatter valgt
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                    </svg>
                    <Typography variant="body2" sx={{ color: '#4caf50' }}>
                      Kryptert
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <ChatIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Velg et chatterom
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Velg et chatterom fra listen for å starte chatting
                  </Typography>
                  
                  {!isConnected && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: '#ff9800' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1,9H3L5,15L9,3H11L7.5,13.5L6,9H8L9,6L10,9H12L9,18H7L5,12L4,18H2L1,9Z"/>
                      </svg>
                      <Typography variant="body2">
                        Kobler til chat-server...
                      </Typography>
                    </Box>
                  )}
                  
                  {!currentUser && (
                    <Typography variant="body2" color="error.main">
                      Ingen bruker lastet
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* New Chat Modal */}
        <Dialog 
          open={showNewChatModal} 
          onClose={() => setShowNewChatModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: '1px solid rgba(102, 126, 234, 0.1)'
            }
          }}
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddIcon sx={{ color: 'white' }} />
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                Opprett nytt chatterom
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Navn på chatterom"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Skriv navn på chatterom"
                variant="outlined"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                      borderWidth: '2px',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                  },
                }}
              />

              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#667eea' }}>
                Velg brukere:
              </Typography>
              
              <Box sx={{ 
                maxHeight: 300, 
                overflow: 'auto', 
                border: 1, 
                borderColor: 'rgba(102, 126, 234, 0.2)', 
                borderRadius: 2 
              }}>
                <List>
                  {allUsers
                    .filter(user => user.id !== currentUser?.id)
                    .map((user) => (
                      <ListItem key={user.id} disablePadding>
                        <ListItemButton onClick={() => handleUserToggle(user.id)}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#667eea', color: 'white' }}>
                              {user.name.charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.name}
                            secondary={user.email}
                          />
                          <Chip
                            label={user.role === 'ADMIN' ? 'Administrator' : 'Ansatt'}
                            size="small"
                            sx={{
                              bgcolor: user.role === 'ADMIN' ? '#667eea' : 'rgba(102, 126, 234, 0.1)',
                              color: user.role === 'ADMIN' ? 'white' : '#667eea',
                              border: user.role === 'ADMIN' ? 'none' : '1px solid #667eea',
                            }}
                          />
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserToggle(user.id)}
                            sx={{ 
                              color: '#667eea',
                              '&.Mui-checked': {
                                color: '#667eea',
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => setShowNewChatModal(false)}
              startIcon={<CancelIcon />}
              variant="outlined"
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5a6fd8',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                },
                borderRadius: 2,
              }}
            >
              Avbryt
            </Button>
            <Button
              onClick={handleCreateNewChat}
              startIcon={<CheckIcon />}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #4c5fd6 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                },
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Opprett
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default MessagesPage;
