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
          <CircularProgress size={60} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3, height: 'calc(100vh - 100px)' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
          {/* Sidebar */}
          <Card elevation={2} sx={{ width: 350, minWidth: 350 }}>
            <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ChatIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Chatterom
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowNewChatModal(true)}
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                      }
                    }}
                  >
                    Ny Chat
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {chatRooms.length} aktive chatterom
                </Typography>
              </Box>

              {/* Room List */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {chatRooms.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ChatIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
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
                            borderRadius: 2,
                            '&.Mui-selected': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'primary.dark',
                              }
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: selectedRoom === room.id ? 'white' : 'primary.main' }}>
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
          <Card elevation={2} sx={{ flex: 1 }}>
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
                  <ChatIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
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
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Opprett nytt chatterom
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Navn på chatterom"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Skriv navn på chatterom"
                variant="outlined"
                sx={{ mb: 3 }}
              />

              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                Velg brukere:
              </Typography>
              
              <Box sx={{ maxHeight: 300, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <List>
                  {allUsers
                    .filter(user => user.id !== currentUser?.id)
                    .map((user) => (
                      <ListItem key={user.id} disablePadding>
                        <ListItemButton onClick={() => handleUserToggle(user.id)}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
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
                            color={user.role === 'ADMIN' ? 'primary' : 'default'}
                            variant="outlined"
                          />
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserToggle(user.id)}
                            color="primary"
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
            >
              Avbryt
            </Button>
            <Button
              onClick={handleCreateNewChat}
              startIcon={<CheckIcon />}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                }
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
