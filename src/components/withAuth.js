import { setToken } from '../services/tokenService';
import { getHashParams } from '../services/utils';
import useAuth from '../hooks/useAuth';

const WithAuth = BaseComponent => {
  const hashParams = getHashParams();
  const nonEmptyHashParams = Object.keys(hashParams).length > 0;

  if (nonEmptyHashParams) {
    setToken(hashParams);
  }

  const [isAuthenticated, login] = useAuth();

  if (!isAuthenticated) {
    login();
    return () => null;
  }

  return BaseComponent;
}


export default WithAuth;
