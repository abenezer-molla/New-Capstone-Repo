import { useRadioGroupContext } from '@chakra-ui/react';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  console.log('new token', !token, typeof token);

  if (token === 'null') {
    return (
      <Navigate
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
