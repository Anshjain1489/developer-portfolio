import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Sync canonical link and handle HMR WebSocket notices
if (typeof window !== 'undefined') {
  try {
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalLink && window.location.origin.includes('developeransh.netlify.app')) {
      canonicalLink.href = window.location.origin + window.location.pathname;
    }
  } catch {
    // ignore
  }

  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event.reason?.message || event.reason || '');
    if (msg.includes('WebSocket') || msg.includes('websocket')) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
