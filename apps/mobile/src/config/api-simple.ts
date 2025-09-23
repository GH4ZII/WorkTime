// Simple API Configuration - Always uses your IP address
// Use this for debugging network issues

// Supported backend base URLs (primary first). Keep both for easy switching.
export const BASE_URLS = ['http://10.229.18.144:3001', 'http://10.129.48.163:3001'];
export const BASE_URL = BASE_URLS[0];

export const API_ENDPOINTS = {
    BASE_URL,
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
        FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    },
    SHIFTS: `${BASE_URL}/shifts`,
    USERS: `${BASE_URL}/users`,
    WORKLOG: `${BASE_URL}/worklog`,
    NOTIFICATIONS: `${BASE_URL}/notifications`,
    CHAT: `${BASE_URL}/chatrooms`, // Endret fra 'chat' til 'chatrooms'
    SHIFT_SWAP_REQUESTS: `${BASE_URL}/shift-swap-requests`,
    TIME_OFF_REQUESTS: `${BASE_URL}/time-off-requests`,
    SHIFT_APPLICATIONS: `${BASE_URL}/shift-applications`,
};

export default BASE_URL;
