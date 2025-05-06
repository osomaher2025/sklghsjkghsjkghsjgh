
// This provides a process.env polyfill for client-side code running in Vite
// We only need to create the env object, not the full Node.js process object
if (typeof window !== 'undefined') {
  // @ts-ignore - Intentionally creating a limited version of process
  window.process = window.process || {
    env: {
      NODE_ENV: import.meta.env.MODE || 'development',
      BASE_PATH: '',
    },
  };
}

export {};
