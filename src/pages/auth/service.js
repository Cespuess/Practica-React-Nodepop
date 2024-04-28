import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader
} from '../../api/client';
import { storageLocal, storageSession } from '../../utils/storage';

export const login = async (credentials) => {
  const accessToken = await client.post('/api/auth/login', credentials);
  setAuthorizationHeader(accessToken.accessToken);
  return accessToken;
};

export const logout = () => {
  removeAuthorizationHeader();
  storageSession.delete('auth');
  storageLocal.delete('auth');
};
