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

const MessagesPage: NextPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { isConnected } = useChat();

  useEffect(() => {
    fetchChatRooms();
    fetchCurrentUser();
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
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <h2>Chatterom</h2>
          <div style={styles.roomList}>
            {chatRooms.map((room) => (
              <div
                key={room.id}
                style={{
                  ...styles.roomItem,
                  ...(selectedRoom === room.id && styles.selectedRoom),
                }}
                onClick={() => setSelectedRoom(room.id)}
              >
                <h3>{room.name}</h3>
                <p>{room.members.length} medlemmer</p>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.chatArea}>
          {selectedRoom && currentUser ? (
            <Chat roomId={selectedRoom} currentUserId={currentUser.id} />
          ) : (
            <div style={styles.noRoomSelected}>
              <p>Velg et chatterom for å starte chatting</p>
              {!isConnected && <p style={styles.connectionWarning}>Kobler til chat-server...</p>}
            </div>
          )}
        </div>
      </div>
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
};

export default MessagesPage;
