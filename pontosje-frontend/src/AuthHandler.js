import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authenticateWithToken, selectIsAuthenticated, selectToken } from './slices/authSlice';

const AuthHandler = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const token = useSelector(selectToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {

        console.log('AuthHandler useEffect', isAuthenticated, token);

        if (!isAuthenticated && token) {
            dispatch(authenticateWithToken(token));
        } else if (isAuthenticated) {
            navigate('/helyesiras');
        }
    }, [isAuthenticated, dispatch, navigate]);

    return <>{children}</>;
};

export default AuthHandler;