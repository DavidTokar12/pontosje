import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authenticateWithToken, selectIsAuthenticated } from './slices/authSlice';

const AuthHandler = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('authToken');

        if (!isAuthenticated && token) {
            dispatch(authenticateWithToken(token));
        } else if (isAuthenticated) {
            navigate('/helyesiras');
        }
    }, [isAuthenticated, dispatch, navigate]);

    return <>{children}</>;
};

export default AuthHandler;