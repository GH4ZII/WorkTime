import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: string, senderId: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to chat server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from chat server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Chat connection error:', error);
      setIsConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('Chat socket error:', error);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit('joinRoom', roomId);
    }
  };

  const leaveRoom = (roomId: string) => {
    if (socket) {
      socket.emit('leaveRoom', roomId);
    }
  };

  const sendMessage = (roomId: string, message: string, senderId: string) => {
    if (socket) {
      console.log('ChatContext: Sending message via socket:', { roomId, message, senderId });
      socket.emit('sendMessage', {
        roomId,
        message: {
          content: message,
          senderId,
        },
      });
    } else {
      console.error('ChatContext: Socket is null, cannot send message');
      throw new Error('Socket is not connected');
    }
  };

  const value: ChatContextType = {
    socket,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  return context;
}; 