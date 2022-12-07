import { React, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

function PrivateRoute({ children }) {
  const user = true;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
