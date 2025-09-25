import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import ScreenHeader from '../components/ScreenHeader';
import { API_ENDPOINTS } from '../config/api-simple';
import axios from 'axios';
import io, { Socket } from 'socket.io-client';

const { width } = Dimensions.get('window');

interface User {
  id: string;
  name: string;
  email: string;
}

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

interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
  };
  sentAt: string;
  roomId: string; // Added roomId to the Message interface
}

const ChatScreen: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newChatName, setNewChatName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [usePolling, setUsePolling] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [processedMessageIds, setProcessedMessageIds] = useState<Set<string>>(new Set());
  const processedMessageIdsRef = useRef<Set<string>>(new Set());
  const selectedRoomIdRef = useRef<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  
  const messagesEndRef = useRef<FlatList>(null);

  useEffect(() => {
    if (currentUser) {
      fetchChatRooms();
      fetchAllUsers();
      initializeSocket();
    }
  }, [currentUser]);

  useEffect(() => {
    if (isConnected && selectedRoom) {
      joinRoom(selectedRoom.id);
      loadMessages(selectedRoom.id);
    }
  }, [isConnected, selectedRoom]);

  // Hold latest selectedRoom id in a ref so socket handlers see current value
  useEffect(() => {
    selectedRoomIdRef.current = selectedRoom ? selectedRoom.id : null;
  }, [selectedRoom]);

  // Polling fallback hvis WebSocket ikke fungerer
  useEffect(() => {
    if (usePolling && selectedRoom) {
      const interval = setInterval(() => {
        loadMessages(selectedRoom.id);
      }, 3000); // Poll hver 3. sekund
      
      setPollingInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [usePolling, selectedRoom]);

  const initializeSocket = () => {
    // Hvis vi allerede har en socket, lukk den først
    if (socketRef.current) {
      socketRef.current.close();
    }

    const newSocket = io(API_ENDPOINTS.BASE_URL, {
      transports: ['websocket'],
      timeout: 5000,
    });

    // Fjern alle eksisterende event listeners
    newSocket.removeAllListeners();

    newSocket.on('connect', () => {
      setIsConnected(true);
      setUsePolling(false);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      setUsePolling(true);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Mobile: Connection error:', error);
      setIsConnected(false);
      setUsePolling(true);
    });

    // Håndter nye meldinger fra andre brukere (bruk refs for å unngå stale closures)
    const onNewMessage = (message: Message) => {
      // Avvis hvis allerede behandlet
      if (processedMessageIdsRef.current.has(message.id)) {
        return;
      }

      const activeRoomId = selectedRoomIdRef.current;

      if (activeRoomId && message.roomId === activeRoomId && message.senderId !== currentUser?.id) {
        setMessages(prev => {
          // Ekstra sikring mot duplikater dersom samme id finnes
          if (prev.some(m => m.id === message.id)) {
            return prev;
          }
          return [...prev, message];
        });

        // Marker meldingen som behandlet i både ref og state
        processedMessageIdsRef.current = new Set([...processedMessageIdsRef.current, message.id]);
        setProcessedMessageIds(new Set(processedMessageIdsRef.current));
      }
    };
    newSocket.on('newMessage', onNewMessage);

    // Håndter bekreftelse på egen melding
    const onMessageSent = (message: Message) => {
      // Oppdater meldingen med riktig ID fra server
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? message : msg
      ));
    };
    newSocket.on('messageSent', onMessageSent);

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.off('newMessage', onNewMessage);
        newSocket.off('messageSent', onMessageSent);
        newSocket.removeAllListeners();
        newSocket.close();
      }
    };
  };

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

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.CHAT);
      setChatRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
      setError('Kunne ikke hente chatrom');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS);
      setAllUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      setIsLoadingMessages(true);
      const response = await axios.get(`${API_ENDPOINTS.CHAT}/${roomId}/messages`);
      setMessages(response.data);
      // Oppdater processed-id settet slik at innkommende socket-event ikke dobler
      const ids = new Set<string>(response.data.map((m: Message) => m.id));
      processedMessageIdsRef.current = ids;
      setProcessedMessageIds(ids);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setError('Kunne ikke laste meldinger');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedRoom || !socket) {
      return;
    }

    try {
      console.log('Mobile: Sending message:', {
        roomId: selectedRoom.id,
        content: message.trim(),
        senderId: currentUser?.id
      });

      // Opprett en ny melding lokalt umiddelbart
      const newMessageObj: Message = {
        id: `temp-${Date.now()}-${Math.random()}`, // Mer unik midlertidig ID
        content: message.trim(),
        senderId: currentUser?.id || '',
        sender: {
          id: currentUser?.id || '',
          name: currentUser?.name || '',
        },
        sentAt: new Date().toISOString(),
        roomId: selectedRoom.id,
      };


      // Sjekk om meldingen allerede eksisterer
      const messageExists = messages.some(msg => 
        msg.content === newMessageObj.content && 
        msg.senderId === newMessageObj.senderId &&
        Math.abs(new Date(msg.sentAt).getTime() - new Date(newMessageObj.sentAt).getTime()) < 1000 // 1 sekund toleranse
      );

      if (messageExists) {
        return;
      }

      // Legg til meldingen lokalt umiddelbart
      setMessages(prev => [...prev, newMessageObj]);
      // Marker midlertidig id som behandlet for å forhindre duplikater
      processedMessageIdsRef.current = new Set([...processedMessageIdsRef.current, newMessageObj.id]);
      setProcessedMessageIds(new Set(processedMessageIdsRef.current));
      
      // Rydd opp input-feltet
      setMessage('');

      // Send meldingen via WebSocket
      socket.emit('sendMessage', {
        roomId: selectedRoom.id,
        message: {
          content: message.trim(),
          senderId: currentUser?.id,
        },
      });

    } catch (error) {
      console.error('Mobile: Error sending message:', error);
      Alert.alert('Feil', 'Kunne ikke sende melding');
    }
  };

  const createNewChat = async () => {
    if (selectedUsers.length === 0) {
      Alert.alert('Feil', 'Velg minst én medarbeider');
      return;
    }

    try {
      // Sørg for at navnet ikke er tomt
      const chatName = newChatName.trim() || `Chat med ${selectedUsers.length} medarbeider(e)`;
      
      console.log('Creating chat with data:', {
        name: chatName,
        memberIds: [...selectedUsers, currentUser?.id]
      });

      const response = await axios.post(API_ENDPOINTS.CHAT, {
        name: chatName,
        memberIds: [...selectedUsers, currentUser?.id],
      });

      console.log('Chat created successfully:', response.data);

      const newRoom = response.data;
      setChatRooms(prev => [...prev, newRoom]);
      setSelectedRoom(newRoom);
      setShowNewChatModal(false);
      setSelectedUsers([]);
      setNewChatName('');
    } catch (error: any) {
      console.error('Error creating chat:', error);
      
      // Gi mer spesifikk feilmelding
      let errorMessage = 'Kunne ikke opprette chat';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Feil', errorMessage);
    }
  };

  const renderMessage = (msg: Message) => (
    <View style={[
      styles.messageContainer, 
      msg.senderId === currentUser?.id ? styles.myMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble, 
        msg.senderId === currentUser?.id ? styles.myBubble : styles.otherBubble
      ]}>
        {msg.senderId !== currentUser?.id && (
          <Text style={styles.senderName}>{msg.sender.name}</Text>
        )}
        <Text style={[
          styles.messageText, 
          msg.senderId === currentUser?.id ? styles.myMessageText : styles.otherMessageText
        ]}>
          {msg.content}
        </Text>
        <Text style={[
          styles.messageTime, 
          msg.senderId === currentUser?.id ? styles.myMessageTime : styles.otherMessageTime
        ]}>
          {new Date(msg.sentAt).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderChatRoom = (room: ChatRoom) => (
    <TouchableOpacity
      key={room.id}
      style={[
        styles.chatRoomItem,
        selectedRoom?.id === room.id && styles.selectedChatRoom
      ]}
      onPress={() => setSelectedRoom(room)}
    >
      <View style={styles.chatRoomInfo}>
        <Text style={styles.chatRoomName}>{room.name}</Text>
        <Text style={styles.chatRoomMembers}>
          {room.members.length} medlemmer
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Meldinger" subtitle="Chat med dine kollegaer" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Laster chatrom...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Meldinger" subtitle="Chat med dine kollegaer" />
      
      <View style={styles.mainContainer}>
        {/* Chat Room List */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Chatrom</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={styles.newChatButton}
                onPress={() => setShowNewChatModal(true)}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
              {selectedRoom && (
                <TouchableOpacity
                  style={[styles.newChatButton, { backgroundColor: '#e53935' }]}
                  onPress={async () => {
                    try {
                      await axios.delete(`${API_ENDPOINTS.CHAT}/${selectedRoom.id}`);
                      setChatRooms(prev => prev.filter(r => r.id !== selectedRoom.id));
                      setSelectedRoom(null);
                      setMessages([]);
                    } catch (error) {
                      console.error('Failed to delete chat room:', error);
                      Alert.alert('Feil', 'Kunne ikke slette chat');
                    }
                  }}
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <FlatList
            data={chatRooms}
            renderItem={({ item }) => renderChatRoom(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Chat Area */}
        <View style={styles.chatArea}>
          {selectedRoom ? (
            <>
              <View style={styles.chatHeader}>
                <Text style={styles.chatHeaderTitle}>{selectedRoom.name}</Text>
                <Text style={styles.chatHeaderSubtitle}>
                  {selectedRoom.members.length} medlemmer
                </Text>
              </View>

              <View style={styles.messagesContainer}>
                {isLoadingMessages ? (
                  <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#667eea" />
                  </View>
                ) : (
                  <FlatList
                    ref={messagesEndRef}
                    data={messages}
                    renderItem={({ item }) => renderMessage(item)}
                    keyExtractor={(item) => item.id} // Bruk kun ID, ikke sentAt
                    extraData={messages.length}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messagesContent}
                    onContentSizeChange={() => messagesEndRef.current?.scrollToEnd()}
                  />
                )}
              </View>

              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
              >
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      value={message}
                      onChangeText={setMessage}
                      placeholder="Skriv en melding..."
                      placeholderTextColor="#999"
                      multiline
                      maxLength={500}
                    />
                    <TouchableOpacity
                      style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                      onPress={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </>
          ) : (
            <View style={styles.noChatSelected}>
              <Ionicons name="chatbubbles-outline" size={64} color="#bdc3c7" />
              <Text style={styles.noChatText}>Velg et chatrom for å starte chatting</Text>
            </View>
          )}
        </View>
      </View>

      {/* New Chat Modal */}
      <Modal
        visible={showNewChatModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Opprett ny chat</Text>
              <TouchableOpacity
                onPress={() => setShowNewChatModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              placeholder="Chat navn (valgfritt)"
              value={newChatName}
              onChangeText={setNewChatName}
            />

            <Text style={styles.modalLabel}>Velg medarbeidere:</Text>
            <FlatList
              data={allUsers.filter(user => user.id !== currentUser?.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.userItem,
                    selectedUsers.includes(item.id) && styles.selectedUser
                  ]}
                  onPress={() => {
                    if (selectedUsers.includes(item.id)) {
                      setSelectedUsers(prev => prev.filter(id => id !== item.id));
                    } else {
                      setSelectedUsers(prev => [...prev, item.id]);
                    }
                  }}
                >
                  <Text style={styles.userName}>{item.name}</Text>
                  {selectedUsers.includes(item.id) && (
                    <Ionicons name="checkmark-circle" size={20} color="#667eea" />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            <TouchableOpacity
              style={styles.createButton}
              onPress={createNewChat}
            >
              <Text style={styles.createButtonText}>Opprett chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: width * 0.4,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#e1e8ed',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  newChatButton: {
    backgroundColor: '#667eea',
    padding: 8,
    borderRadius: 20,
  },
  chatRoomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  selectedChatRoom: {
    backgroundColor: '#f0f2ff',
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  chatRoomMembers: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  chatArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    backgroundColor: '#f8f9fa',
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  chatHeaderSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.6,
    padding: 16,
    borderRadius: 20,
  },
  myBubble: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#f1f3f4',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#374151',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 8,
    textAlign: 'right',
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherMessageTime: {
    color: '#9ca3af',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sendButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  noChatSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noChatText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7f8c8d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: width * 0.9,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  selectedUser: {
    backgroundColor: '#f0f2ff',
  },
  userName: {
    fontSize: 16,
    color: '#2c3e50',
  },
  createButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatScreen;
