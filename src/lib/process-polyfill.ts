
// This provides a process.env polyfill for client-side code running in Vite
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {
      NODE_ENV: import.meta.env.MODE || 'development',
      BASE_PATH: '',
    },
  };
}

export {};
