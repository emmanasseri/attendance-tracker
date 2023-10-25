import { useState, useEffect } from 'react';

function GoogleSigninButton() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hashedUserId, setHashedUserId] = useState(null);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return {};
    }
  };

  const hashUserId = async (userId) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(userId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const onCredentialResponse = async (response) => {
    const tokenId = response.credential;
    
    const decodedToken = decodeJWT(tokenId);
    const userId = decodedToken.sub;
    const hashedId = await hashUserId(userId);
    setHashedUserId(hashedId);

    console.log("Hashed User's Google ID:", hashedId);
    setIsSignedIn(true);
  };

  useEffect(() => {
    // Dynamically load the new GIS library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      console.log("Google Identity Services script loaded successfully.");

      window.google.accounts.id.initialize({
        client_id: '75204647996-ua3mellpivin98pa8726dugoellsqaip.apps.googleusercontent.com', // Replace with your actual client ID
        callback: onCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
          theme: 'outline',
          size: 'large',
        }
      );
    };

    script.onerror = () => {
      console.error("Failed to load Google Identity Services script.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {!isSignedIn ? (
        <div id="buttonDiv"></div>
      ) : (
        <p>User signed in with hashed Google ID: {hashedUserId}</p>
      )}
    </div>
  );
}

export default GoogleSigninButton;
