import React from 'react'; // Add core React import
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ScreenReaderProvider } from './context/ScreenReaderContext';
import App from './App';
import "./index.css";

// Create root first
const root = createRoot(document.getElementById('root'));

// Render app with providers
root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-fzk2d7w7jcgdn5wz.us.auth0.com"
      clientId="MUw7VucBsoraVPhja1yFAQqf6AWD1MEw"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      cacheLocation="localstorage" // Add for better session persistence
    >
      <ScreenReaderProvider>
        <App />
      </ScreenReaderProvider>
    </Auth0Provider>
  </StrictMode>
);