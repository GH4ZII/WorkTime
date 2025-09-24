// Simple API Configuration - Always uses your IP address
// Use this for debugging network issues

// Supported backend base URLs (priority order)
export const BASE_URLS = [
    // Local development first
    'http://10.0.2.2:3001', // Android emulator -> host machine localhost
    'http://localhost:3001', // iOS simulator or device if port forwarded
    'http://127.0.0.1:3001',
    // School/new IPs fallback
    'http://10.229.17.40:3001',
    // Older IPs fallback
    'http://10.229.18.144:3001',
    'http://10.129.48.163:3001',
];

function resolveBaseUrl(): string {
    // Expo/React Native env override
    const envBase = (process?.env?.EXPO_PUBLIC_API_BASE || process?.env?.API_BASE) as string | undefined;
    if (envBase) return envBase;
    // Default to first working in list (keep simple; emulator-friendly first)
    return BASE_URLS[0];
}

export const BASE_URL = resolveBaseUrl();

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
