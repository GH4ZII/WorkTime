import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
  };
  sentAt: string;
}

interface ChatProps {
  roomId: string;
  currentUserId: string;
  currentUserName?: string; // Legg til brukernavn
}

const Chat: React.FC<ChatProps> = ({ roomId, currentUserId, currentUserName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected, joinRoom, leaveRoom, sendMessage } = useChat();

  console.log('Chat: roomId =', roomId);
  console.log('Chat: currentUserId =', currentUserId);
  console.log('Chat: isConnected =', isConnected);

  useEffect(() => {
    console.log('Chat: useEffect triggered, isConnected =', isConnected, 'roomId =', roomId);
    
    if (isConnected && roomId) {
      console.log('Chat: Joining room and loading messages');
      joinRoom(roomId);
      loadMessages();
    } else {
      console.log('Chat: Not connected or no roomId');
      setIsLoading(false);
    }

    return () => {
      if (roomId) {
        console.log('Chat: Leaving room');
        leaveRoom(roomId);
      }
    };
  }, [isConnected, roomId]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: Message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('userTyping', ({ userId, isTyping: typing }) => {
        if (typing) {
          setTypingUsers(prev => [...prev.filter(id => id !== userId), userId]);
        } else {
          setTypingUsers(prev => prev.filter(id => id !== userId));
        }
      });

      return () => {
        socket.off('newMessage');
        socket.off('userTyping');
      };
    }
  }, [socket]);

  const loadMessages = async () => {
    try {
      console.log('Chat: Loading messages for room', roomId);
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`http://localhost:3001/chatrooms/${roomId}/messages`, {
        withCredentials: true,
      });
      
      console.log('Chat: Messages loaded:', response.data);
      setMessages(response.data);
    } catch (error) {
      console.error('Chat: Failed to load messages:', error);
      setError('Kunne ikke laste meldinger');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    console.log('handleSendMessage called:', { newMessage, isConnected, roomId, currentUserId });
    
    if (!newMessage.trim()) {
      console.log('Message is empty, not sending');
      return;
    }
    
    if (!isConnected) {
      console.log('Not connected to chat server');
      setError('Ikke tilkoblet chat-server');
      return;
    }
    
    if (!roomId || !currentUserId) {
      console.log('Missing roomId or currentUserId:', { roomId, currentUserId });
      setError('Mangler rom-ID eller bruker-ID');
      return;
    }
    
    try {
      console.log('Sending message:', { roomId, message: newMessage, senderId: currentUserId });
      
      // Opprett en ny melding lokalt umiddelbart
      const newMessageObj: Message = {
        id: Date.now().toString(), // Midlertidig ID
        content: newMessage.trim(),
        senderId: currentUserId,
        sender: {
          id: currentUserId,
          name: currentUserName || 'Du', // Bruk faktisk brukernavn
        },
        sentAt: new Date().toISOString(),
      };
      
      // Legg til meldingen lokalt umiddelbart
      setMessages(prev => [...prev, newMessageObj]);
      
      // Send meldingen via WebSocket
      sendMessage(roomId, newMessage.trim(), currentUserId);
      
      // Rydd opp
      setNewMessage('');
      setIsTyping(false);
      socket?.emit('typing', { roomId, userId: currentUserId, isTyping: false });
      setError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Kunne ikke sende melding');
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { roomId, userId: currentUserId, isTyping: true });
      
      // Clear typing indicator after 3 seconds
      setTimeout(() => {
        setIsTyping(false);
        socket?.emit('typing', { roomId, userId: currentUserId, isTyping: false });
      }, 3000);
    }
  };

  // Endre useEffect til å respektere autoScroll
  // useEffect(() => {
  //   if (autoScroll) {
  //     scrollToBottom();
  //   }
  // }, [messages, autoScroll]);

  // Legg til en funksjon for å toggle auto-scroll
  // const toggleAutoScroll = () => {
  //   setAutoScroll(!autoScroll);
  // };

  return (
    <div style={styles.chatContainer}>
      {/* Legg til en toggle-knapp for auto-scroll */}
      <div style={styles.autoScrollToggle}>
        <button
          onClick={() => {}} // Removed toggleAutoScroll as auto-scroll is off
          style={{
            ...styles.toggleButton,
            backgroundColor: '#bdc3c7' // Changed color to gray
          }}
        >
          Auto-scroll: Av
        </button>
      </div>

      <div style={styles.messagesContainer}>
        {isLoading && (
          <div style={styles.loadingMessage}>
            Laster meldinger...
          </div>
        )}
        
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}
        
        {!isLoading && !error && messages.length === 0 && (
          <div style={styles.emptyMessage}>
            Ingen meldinger ennå. Start samtalen!
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.message,
              ...(message.senderId === currentUserId ? styles.ownMessage : styles.otherMessage),
            }}
          >
            <div style={styles.messageHeader}>
              <span style={styles.senderName}>{message.sender.name}</span>
              <span style={styles.messageTime}>
                {new Date(message.sentAt).toLocaleTimeString('nb-NO', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div style={styles.messageContent}>{message.content}</div>
          </div>
        ))}
        
        {typingUsers.length > 0 && (
          <div style={styles.typingIndicator}>
            {typingUsers.join(', ')} skriver...
          </div>
        )}
        {/* <div ref={messagesEndRef} /> */}
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Skriv en melding..."
          style={styles.messageInput}
          disabled={!isConnected}
        />
        <button 
          onClick={handleSendMessage} 
          style={!isConnected || !newMessage.trim() ? styles.sendButtonDisabled : styles.sendButton}
          disabled={!isConnected || !newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Endret fra '600px' til '100%' for å fylle tilgjengelig plass
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    minHeight: 0, // Legg til denne for å sikre at flexbox fungerer riktig
  },
  message: {
    marginBottom: '12px',
    padding: '8px 12px',
    borderRadius: '12px',
    maxWidth: '70%',
  },
  ownMessage: {
    backgroundColor: '#007bff',
    color: 'white',
    marginLeft: 'auto',
  },
  otherMessage: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    fontSize: '12px',
  },
  senderName: {
    fontWeight: 'bold',
  },
  messageTime: {
    opacity: 0.7,
  },
  messageContent: {
    wordBreak: 'break-word',
  },
  typingIndicator: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: '12px',
    marginBottom: '8px',
  },
  inputContainer: {
    display: 'flex',
    padding: '16px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: 'white',
    flexShrink: 0, // Legg til denne for å forhindre at input-feltet krymper
  },
  messageInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '20px',
    marginRight: '8px',
  },
  sendButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  sendButtonDisabled: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  loadingMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
    fontStyle: 'italic',
  },
  errorMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    margin: '10px',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
    fontStyle: 'italic',
  },
  autoScrollToggle: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e1e8ed',
    textAlign: 'center',
  },
  
  toggleButton: {
    padding: '6px 12px',
    borderRadius: '16px',
    border: 'none',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default Chat; 