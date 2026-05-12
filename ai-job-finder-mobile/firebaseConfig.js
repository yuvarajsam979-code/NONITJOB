import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", 
  authDomain: "sunny-sandbox-472406-c4.firebaseapp.com",
  projectId: "sunny-sandbox-472406-c4",
  storageBucket: "sunny-sandbox-472406-c4.appspot.com",
  messagingSenderId: "445019190074",
  appId: "YOUR_APP_ID" 
};

// Safe Initialization
let app;
let auth;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn("Firebase: Running in Demo Mode (No API Key provided)");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { auth };
