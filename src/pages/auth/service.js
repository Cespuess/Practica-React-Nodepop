import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader
} from '../../api/client';
import storage from '../../utils/storage';

export const login = async (credentials) => {
  try {
    const accessToken = await client.post('/api/auth/login', credentials);
    setAuthorizationHeader(accessToken);
    return accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove('auth');
};
