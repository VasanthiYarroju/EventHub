import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is NOT logged in, show an alert and redirect to the homepage.
    if (!isLoggedIn) {
      alert('You must be logged in to view the admin page. Please use the admin access link/button.');
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // If the user is logged in, render the component that was passed in (e.g., AdminPage)
  if (isLoggedIn) {
    return children;
  }
  
  // Otherwise, render nothing while we redirect
  return null; 
};

export default ProtectedRoute;