import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  sentAt: string;
}

interface ChatProps {
  roomId: string;
  currentUserId: string;
}

const Chat: React.FC<ChatProps> = ({ roomId, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected, joinRoom, leaveRoom, sendMessage } = useChat();

  useEffect(() => {
    if (isConnected && roomId) {
      joinRoom(roomId);
      loadMessages();
    }

    return () => {
      if (roomId) {
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
      const response = await axios.get(`http://10.129.48.163:3001/chatrooms/${roomId}/messages`, {
        withCredentials: true,
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && isConnected) {
      sendMessage(roomId, newMessage, currentUserId);
      setNewMessage('');
      setIsTyping(false);
      socket?.emit('typing', { roomId, userId: currentUserId, isTyping: false });
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { roomId, userId: currentUserId, isTyping: true });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.message,
              ...(message.senderId === currentUserId ? styles.ownMessage : styles.otherMessage),
            }}
          >
            <div style={styles.messageHeader}>
              <span style={styles.senderName}>{message.senderName}</span>
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
        <div ref={messagesEndRef} />
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Skriv en melding..."
          style={styles.messageInput}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
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
    height: '600px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: '#f8f9fa',
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
};

export default Chat; 