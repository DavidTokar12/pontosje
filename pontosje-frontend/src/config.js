const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
    apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 1000),
    csrfTokenEndpoint: '/csrf/',
};


export default config;
