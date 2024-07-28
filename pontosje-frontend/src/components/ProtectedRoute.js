import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../slices/authSlice';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;