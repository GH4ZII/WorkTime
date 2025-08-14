// Simple API Configuration - Always uses your IP address
// Use this for debugging network issues

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'http://10.129.48.163:3001/auth/login',
        CHANGE_PASSWORD: 'http://10.129.48.163:3001/auth/change-password',
    },
    SHIFTS: 'http://10.129.48.163:3001/shifts',
    USERS: 'http://10.129.48.163:3001/users',
    WORKLOG: 'http://10.129.48.163:3001/worklog',
    NOTIFICATIONS: 'http://10.129.48.163:3001/notifications',
    CHAT: 'http://10.129.48.163:3001/chatrooms', // Endret fra 'chat' til 'chatrooms'
    SHIFT_SWAP_REQUESTS: 'http://10.129.48.163:3001/shift-swap-requests',
    TIME_OFF_REQUESTS: 'http://10.129.48.163:3001/time-off-requests',
};

export default 'http://10.129.48.163:3001';
