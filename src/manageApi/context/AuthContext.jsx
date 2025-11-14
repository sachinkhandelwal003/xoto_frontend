// src/context/AuthProvider.jsx
import React, { createContext, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import {
  loginUser,
  logoutUser,
  refreshToken,
  rehydrateAuthState,
  fetchMyPermissions,
} from '../store/authSlice';

export const AuthContext = createContext();

const API_BASE = 'https://kotiboxglobaltech.online/api';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [intervalId, setIntervalId] = useState(null);
  const hasFetchedPermissions = useRef(false);

  // Rehydrate auth state on app mount
  useEffect(() => {
    dispatch(rehydrateAuthState());
  }, [dispatch]);

  // Fetch permissions once after successful authentication
  useEffect(() => {
    if (isAuthenticated && token && !hasFetchedPermissions.current) {
      hasFetchedPermissions.current = true;
      dispatch(fetchMyPermissions()).unwrap().catch(() => {});
    }

    if (!isAuthenticated) {
      hasFetchedPermissions.current = false;
    }
  }, [isAuthenticated, token, dispatch]);

  // Auto token refresh logic
  useEffect(() => {
  if (!token) return;

  const checkAndRefresh = () => {
    try {
      const decoded = jwtDecode(token);
      const timeUntilExpiry = decoded.exp * 1000 - Date.now();

      if (timeUntilExpiry < 5 * 60 * 1000) {
        dispatch(refreshToken());
      }
    } catch (err) {
      console.error('Invalid token, logging out');
      dispatch(logoutUser());
    }
  };

  checkAndRefresh();
  const id = setInterval(checkAndRefresh, 60 * 1000);

  return () => clearInterval(id);
}, [token, dispatch]);


  // Enhanced login function that accepts dynamic endpoint
  const login = async (email, password, endpointPath = '/auth/login') => {
    const fullEndpoint = `${API_BASE}${endpointPath}`;
    
    return await dispatch(
      loginUser({
        email,
        password,
        endpoint: fullEndpoint,
      })
    ).unwrap();
  };

  // Logout with optional backend call
  const logout = async (logoutEndpoint = '/auth/logout') => {
    hasFetchedPermissions.current = false;
    const fullEndpoint = `${API_BASE}${logoutEndpoint}`;
    
    try {
      await dispatch(logoutUser(fullEndpoint)).unwrap();
    } catch (err) {
      // Even if backend fails, clear local state
      dispatch(logoutUser());
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,    // Now supports dynamic endpoints
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;