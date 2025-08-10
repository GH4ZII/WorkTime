// Simple API Configuration - Always uses your IP address
// Use this for debugging network issues

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'http://192.168.10.128:3001/auth/login',
    },
    SHIFTS: 'http://192.168.10.128:3001/shifts',
    USERS: 'http://192.168.10.128:3001/users',
    WORKLOG: 'http://192.168.10.128:3001/worklog',
    NOTIFICATIONS: 'http://192.168.10.128:3001/notifications',
    CHAT: 'http://192.168.10.128:3001/chat',
    SHIFT_SWAP_REQUESTS: 'http://192.168.10.128:3001/shift-swap-requests',
    TIME_OFF_REQUESTS: 'http://192.168.10.128:3001/time-off-requests',
};

export default 'http://192.168.10.128:3001';
