import { createAuthProvider } from 'react-token-auth';

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  accessTokenKey: 'access_token',
  onUpdateToken: (token) => {
    console.log(token);
    fetch('/auth/refresh', {
      method: 'POST',
      body: token.refresh_token,
    }).then((r) => {
      console.log(r.json());
      r.json();
    });
  },
});
