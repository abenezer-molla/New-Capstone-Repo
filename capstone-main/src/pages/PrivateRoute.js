import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  const [logged] = useAuth();
  const placeholderTrueVal = true;
  return (
    placeholderTrueVal ? children : <Navigate to="/login" />
  );
}

export default PrivateRoute;
