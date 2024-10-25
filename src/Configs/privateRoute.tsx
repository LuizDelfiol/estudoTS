import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
