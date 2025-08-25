import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import Chat from '../components/Chat';
import { useChat } from '../context/ChatContext';
import axios from 'axios';
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
      const response = await axios.get('http://localhost:3001/chatrooms', {
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
      const response = await axios.get('http://localhost:3001/auth/me', {
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
      const response = await axios.get('http://localhost:3001/users', {
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
      const response = await axios.post('http://localhost:3001/chatrooms', {
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
      <Box sx={{ p: 3, height: 'calc(100vh - 100px)' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
          {/* Sidebar */}
          <Card elevation={3} sx={{ 
            width: 350, 
            minWidth: 350,
            borderRadius: 3,
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: 1, 
                borderColor: 'divider',
                background: 'linear-gradient(135deg, #667eea 0%, #5a6fd8 100%)',
                color: 'white'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ChatIcon sx={{ color: 'white' }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                      Chatterom
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowNewChatModal(true)}
                    size="small"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: 2,
                    }}
                  >
                    Ny Chat
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {chatRooms.length} aktive chatterom
                </Typography>
              </Box>

              {/* Room List */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {chatRooms.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ChatIcon sx={{ fontSize: 48, color: '#667eea', mb: 2, opacity: 0.6 }} />
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
                        sx={{ mb: 1 }}
                      >
                        <ListItemButton
                          selected={selectedRoom === room.id}
                          onClick={() => handleRoomClick(room.id)}
                          sx={{
                            borderRadius: 3,
                            '&.Mui-selected': {
                              backgroundColor: '#667eea',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: '#5a6fd8',
                              }
                            },
                            '&:hover': {
                              backgroundColor: selectedRoom === room.id ? '#5a6fd8' : 'rgba(102, 126, 234, 0.08)',
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ 
                              bgcolor: selectedRoom === room.id ? 'white' : '#667eea',
                              color: selectedRoom === room.id ? '#667eea' : 'white'
                            }}>
                              <GroupIcon color={selectedRoom === room.id ? 'primary' : 'inherit'} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={room.name}
                            secondary={`${room.members.length} medlemmer`}
                            primaryTypographyProps={{
                              fontWeight: selectedRoom === room.id ? 'bold' : 'normal'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card elevation={3} sx={{ 
            flex: 1,
            borderRadius: 3,
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <CardContent sx={{ p: 0, height: '100%' }}>
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
                  p: 4
                }}>
                  <ChatIcon sx={{ fontSize: 64, color: '#667eea', mb: 2, opacity: 0.6 }} />
                  <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                    Velg et chatterom
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Velg et chatterom fra listen for å starte chatting
                  </Typography>
                  
                  {!isConnected && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'warning.main' }}>
                      <WifiOffIcon />
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
              )}
            </CardContent>
          </Card>
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
