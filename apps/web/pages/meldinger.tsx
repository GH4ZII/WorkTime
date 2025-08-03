import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import Chat from '../components/Chat';
import { useChat } from '../context/ChatContext';
import axios from 'axios';

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
  const { isConnected } = useChat();

  useEffect(() => {
    fetchChatRooms();
    fetchCurrentUser();
    fetchAllUsers();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://10.129.48.163:3001/chatrooms', {
        withCredentials: true,
      });
      setChatRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://10.129.48.163:3001/auth/me', {
        withCredentials: true,
      });
      
      if (response.data && response.data.id) {
        setCurrentUser(response.data);
      } else {
        alert('Du må være innlogget for å bruke chat-funksjonaliteten');
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      if (error.response?.status === 401) {
        alert('Du må være innlogget for å bruke chat-funksjonaliteten');
      } else {
        alert('Kunne ikke hente brukerdata. Vennligst prøv å logge inn på nytt.');
      }
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://10.129.48.163:3001/users', {
        withCredentials: true,
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleCreateNewChat = async () => {
    if (selectedUsers.length === 0 || !newChatName.trim()) {
      alert('Vennligst velg brukere og gi chatrommet et navn');
      return;
    }

    try {
      const response = await axios.post('http://10.129.48.163:3001/chatrooms', {
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
    } catch (error) {
      console.error('Failed to create chat room:', error);
      alert('Kunne ikke opprette chatrom');
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

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h2>Chatterom</h2>
              <button 
                onClick={() => setShowNewChatModal(true)}
                style={styles.newChatButton}
              >
                + Ny Chat
              </button>
            
          </div>
          
          <div style={styles.roomList}>
            {chatRooms.map((room) => (
              <div
                key={room.id}
                style={{
                  ...styles.roomItem,
                  ...(selectedRoom === room.id && styles.selectedRoom),
                }}
                onClick={() => handleRoomClick(room.id)}
              >
                <h3>{room.name}</h3>
                <p>{room.members.length} medlemmer</p>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.chatArea}>
          {selectedRoom && currentUser ? (
            <div>
              <p>Debug: selectedRoom = {selectedRoom}, currentUser.id = {currentUser.id}</p>
              <Chat roomId={selectedRoom} currentUserId={currentUser.id} />
            </div>
          ) : (
            <div style={styles.noRoomSelected}>
              <p>Velg et chatterom for å starte chatting</p>
              {!isConnected && <p style={styles.connectionWarning}>Kobler til chat-server...</p>}
              {!selectedRoom && <p>Ingen chatrom valgt</p>}
              {!currentUser && <p>Ingen bruker lastet</p>}
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Opprett nytt chatterom</h3>
            
            <div style={styles.formGroup}>
              <label>Navn på chatterom:</label>
              <input
                type="text"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Skriv navn på chatterom"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Velg brukere:</label>
              <div style={styles.userList}>
                {allUsers
                  .filter(user => user.id !== currentUser?.id)
                  .map((user) => (
                    <div 
                      key={user.id} 
                      style={styles.userItem}
                      onClick={() => handleUserToggle(user.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserToggle(user.id)}
                        style={styles.checkbox}
                      />
                      <span>{user.name}</span>
                      <span style={styles.userRole}>({user.role})</span>
                    </div>
                  ))}
              </div>
            </div>

            <div style={styles.modalActions}>
              <button 
                onClick={() => setShowNewChatModal(false)}
                style={styles.cancelButton}
              >
                Avbryt
              </button>
              <button 
                onClick={handleCreateNewChat}
                style={styles.createButton}
              >
                Opprett
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 100px)',
  },
  sidebar: {
    width: '300px',
    borderRight: '1px solid #e0e0e0',
    padding: '16px',
    backgroundColor: '#f8f9fa',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  newChatButton: {
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  roomList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  roomItem: {
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  selectedRoom: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  chatArea: {
    flex: 1,
    padding: '16px',
  },
  noRoomSelected: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#666',
  },
  connectionWarning: {
    color: '#ff6b6b',
    fontSize: '14px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    width: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  formGroup: {
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  userList: {
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  checkbox: {
    marginRight: '8px',
  },
  userRole: {
    marginLeft: '8px',
    color: '#666',
    fontSize: '12px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  createButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MessagesPage;
