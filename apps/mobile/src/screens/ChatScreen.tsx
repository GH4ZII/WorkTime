import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useAuth } from '../context/AuthContext';
import ScreenHeader from '../components/ScreenHeader';

const { width } = Dimensions.get('window');

const ChatScreen: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const placeholderMessages = [
        {
            id: 1,
            sender: 'Anna Hansen',
            message: 'Hei! Har du sett på vaktplanen for neste uke?',
            time: '10:30',
            isMe: false,
        },
        {
            id: 2,
            sender: 'Du',
            message: 'Ja, jeg har sjekket den. Ser bra ut!',
            time: '10:32',
            isMe: true,
        },
        {
            id: 3,
            sender: 'Lars Olsen',
            message: 'Kan noen ta over min vakt på fredag?',
            time: '10:35',
            isMe: false,
        },
        {
            id: 4,
            sender: 'Du',
            message: 'Jeg kan hjelpe deg med det!',
            time: '10:37',
            isMe: true,
        },
    ];

    const handleSendMessage = () => {
        if (message.trim()) {
            // Her ville du normalt sende meldingen til backend
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    const renderMessage = (msg: any) => (
        <View key={msg.id} style={[styles.messageContainer, msg.isMe ? styles.myMessage : styles.otherMessage]}>
            <View style={[styles.messageBubble, msg.isMe ? styles.myBubble : styles.otherBubble]}>
                {!msg.isMe && (
                    <Text style={styles.senderName}>{msg.sender}</Text>
                )}
                <Text style={[styles.messageText, msg.isMe ? styles.myMessageText : styles.otherMessageText]}>
                    {msg.message}
                </Text>
                <Text style={[styles.messageTime, msg.isMe ? styles.myMessageTime : styles.otherMessageTime]}>
                    {msg.time}
                </Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScreenHeader
                title="Meldinger"
                subtitle="Chat med dine kollegaer"
            />
            <View style={styles.chatContainer}>
                <FlatList
                    style={styles.scrollView}
                    data={placeholderMessages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMessage}
                    inverted
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Skriv en melding..."
                        placeholderTextColor="#999"
                        multiline
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
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
    },
    myMessage: {
        alignItems: 'flex-end',
    },
    otherMessage: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: width * 0.75,
        padding: 16,
        borderRadius: 20,
    },
    myBubble: {
        backgroundColor: '#667eea',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
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
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typingText: {
        fontSize: 14,
        color: '#6b7280',
        fontStyle: 'italic',
        marginRight: 8,
    },
    typingDots: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#6b7280',
        marginHorizontal: 1,
    },
    dot1: {
        opacity: 0.4,
    },
    dot2: {
        opacity: 0.7,
    },
    dot3: {
        opacity: 1,
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
    devNotice: {
        backgroundColor: '#fff3cd',
        margin: 20,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffeaa7',
    },
    devNoticeIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    devNoticeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#856404',
        textAlign: 'center',
        marginBottom: 4,
    },
    devNoticeSubtext: {
        fontSize: 14,
        color: '#856404',
        textAlign: 'center',
        opacity: 0.8,
    },
});

export default ChatScreen;
