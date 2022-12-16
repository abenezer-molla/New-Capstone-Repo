import { useRadioGroupContext } from '@chakra-ui/react';
import { React, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth';

function PrivateRoute({ children }) {
  const createTokenProvider = () => {
    // eslint-disable-next-line no-underscore-dangle
    const _token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

    const getExpirationDate = (jwtToken) => {
      if (!jwtToken) {
        return null;
      }
      const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
      // multiply by 1000 to convert seconds into milliseconds
      // eslint-disable-next-line no-mixed-operators
      return jwt && jwt.exp && jwt.exp * 1000 || null;
    };

    const isExpired = (exp) => {
      if (!exp) {
        return false;
      }

      return Date.now() > exp;
    };

    const getToken = async () => {
      if (!_token) {
        return null;
      }

      if (isExpired(getExpirationDate(_token.accessToken))) {
        const updatedToken = await fetch('/update-token', {
          method: 'POST',
          body: _token.refreshToken,
        })
          .then((r) => r.json());

        getToken(updatedToken);
      }

      return _token && _token.accessToken;
    };

    const isLoggedIn = () => !!_token;

    return {
      isLoggedIn,
    };
  };
  const user = createTokenProvider();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
