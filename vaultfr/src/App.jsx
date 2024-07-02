import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [collection, setCollection] = useState([]); // Example of state for collection

  useEffect(() => {
    // Initialize state based on localStorage when component mounts
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (user) => {
    // Update state and localStorage on successful login
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    // Clear state and localStorage on logout
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div>
      {/* Header component to display user info and logout button */}
      <Header isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />

      {/* Outlet to render child components defined in routes */}
      <Outlet context={{ handleLogin, isLoggedIn, collection, setCollection }} />
    </div>
  );
};

export default App;
