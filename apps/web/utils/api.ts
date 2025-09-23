// Central API base for the web app
// Priority:
// 1) NEXT_PUBLIC_API_BASE env
// 2) window.location.hostname (same host, port 3001)
// 3) fallback list
export const API_BASE_URLS = ['http://10.229.18.144:3001', 'http://10.129.48.163:3001'];

function resolveApiBase(): string {
  // Env override
  if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE) {
    return process.env.NEXT_PUBLIC_API_BASE;
  }
  // Match current host in browser - this will automatically use whatever IP you're on!
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const host = window.location.hostname; // Automatically detects current IP
    return `http://${host}:3001`;
  }
  // Fallback - try both IPs in order
  return API_BASE_URLS[0];
}

export const API_BASE = resolveApiBase();

export const apiUrl = (path: string) => {
  if (!path) return API_BASE;
  return path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};


