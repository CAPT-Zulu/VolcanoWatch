import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Tab, Tabs, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
// Common imports
import API from '../common/api';
// Component imports
import LoginForm from '../components/loginForm';
import RegisterForm from '../components/registerForm';
// Auth context
import { AuthContext } from '../App';

// User route
function User() {
    // Token from AuthContext
    const { token, setToken } = useContext(AuthContext);
    // Navigate function
    const navigate = useNavigate();
    // Get action from URL
    const { action } = useParams();

    // Handle user login
    function handleLogin(event) {
        event.preventDefault(); // Prevent default form submission
        // Create and call the login API promise
        const loginPromise = API.login(event.target.email.value, event.target.password.value, setToken);
        // Create a toast promise
        toast.promise(loginPromise, { pending: 'Logging in...' });
    };

    // Handle user registration
    function handleRegister(event) {
        event.preventDefault(); // Prevent default form submission
        // Create and call the register API promise
        const registerPromise = API.register(event.target.email.value, event.target.password.value, setToken);
        // Create a toast promise
        toast.promise(registerPromise, { pending: 'Creating account...' });
    };

    // Check wether the user should be redirected
    useEffect(() => {
        // If token exists
        if (token) {
            // If action is logout, log the user out
            if (action === 'logout') { API.logout(setToken) };
            // Either way, redirect to home 
            // (Would be better to redirect to previous page, 
            // but this causes some issues, so for the sake of simplicity, 
            // we'll just redirect to home)
            navigate('/');
            // navigate(-1);
        } else {
            // Otherwise, check if action is not recognised
            if (action !== 'login' && action !== 'register') {
                // If not, redirect to login
                navigate('/user/login');
            }
        }
    }, [token]);

    return (
        <>
            {action === 'login' || action === 'register' ? (
                <Box className="UserForm">
                    <Tabs value={action} centered variant='fullWidth'>
                        <Tab
                            label="Login"
                            value="login"
                            onClick={() => navigate('/user/login')}
                        />
                        <Tab
                            label="Register"
                            value="register"
                            onClick={() => navigate('/user/register')}
                        />
                    </Tabs>
                    <Box>
                        {action === 'login' && <LoginForm handleSubmit={handleLogin} />}
                        {action === 'register' && <RegisterForm handleSubmit={handleRegister} />}
                    </Box>
                </Box>
            ) : (
                <div className="CenterDiv">
                    {token && action === 'logout' ? (
                        <h3>Logging Out!</h3>
                    ) : (
                        <h3>Redirecting!</h3>
                    )}
                    <CircularProgress />
                </div>
            )}
        </>
    );
}

export default User;