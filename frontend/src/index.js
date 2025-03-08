import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 uses `react-dom/client`
import './index.css';
import App from './App';
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider
import reportWebVitals from './reportWebVitals';

// Create the root using React 18's `createRoot`
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the App component with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
