import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader
} from '../../api/client';
import storage from '../../utils/storage';

export const login = async (credentials) => {
  try {
    const accessToken = await client.post('/api/auth/login', credentials);
    setAuthorizationHeader(accessToken.accessToken);
    return accessToken;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error;
  }
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.delete('auth');
};
