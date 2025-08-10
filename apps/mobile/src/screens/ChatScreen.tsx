import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';

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
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chat</Text>
                <Text style={styles.headerSubtitle}>Kommuniser med teamet</Text>
            </View>

            {/* Chat Messages */}
            <ScrollView 
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            >
                {placeholderMessages.map(renderMessage)}
                
                {/* Typing Indicator */}
                {isTyping && (
                    <View style={[styles.messageContainer, styles.otherMessage]}>
                        <View style={[styles.messageBubble, styles.otherBubble]}>
                            <Text style={styles.senderName}>Anna Hansen</Text>
                            <View style={styles.typingIndicator}>
                                <Text style={styles.typingText}>skriver...</Text>
                                <View style={styles.typingDots}>
                                    <View style={[styles.dot, styles.dot1]} />
                                    <View style={[styles.dot, styles.dot2]} />
                                    <View style={[styles.dot, styles.dot3]} />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Skriv en melding..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                        onPress={handleSendMessage}
                        disabled={!message.trim()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Development Notice */}
            <View style={styles.devNotice}>
                <Text style={styles.devNoticeIcon}>🚧</Text>
                <Text style={styles.devNoticeText}>Chat-funksjonen er under utvikling</Text>
                <Text style={styles.devNoticeSubtext}>Dette er en forhåndsvisning av designet</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#3498db',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#ecf0f1',
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
        backgroundColor: '#3498db',
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
        color: '#7f8c8d',
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
        color: '#2c3e50',
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
        color: '#95a5a6',
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typingText: {
        fontSize: 14,
        color: '#7f8c8d',
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
        backgroundColor: '#7f8c8d',
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
        backgroundColor: '#f8f9fa',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#e1e8ed',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        maxHeight: 100,
        paddingVertical: 8,
    },
    sendButton: {
        backgroundColor: '#3498db',
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
