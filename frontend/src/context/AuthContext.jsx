import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  // Add the 'children' prop to the props validation
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || '';
  const isAuthenticated = user ? true : false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    const contextValue = useMemo(() => ({ isAuthenticated, user }), [isAuthenticated, user]);
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
