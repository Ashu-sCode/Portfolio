// src/components/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { checkAuthState } from '../firebase/auth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = checkAuthState((u) => {
      setUser(u);
      setAuthChecked(true);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  if (!authChecked) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-600">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mr-3"></div>
        Checking authentication...
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
