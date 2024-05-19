// api.js
import { toast } from 'react-toastify';

// API address
const address = "http://4.237.58.241:3000/"

// API class
class API {
    // Login request
    static async login(email, password, setToken) {
        // Try catch block to handle errors
        try {
            // Make request to login endpoint
            const response = await fetch(address + 'user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if response is successful
            if (response.ok) {
                // Parse response
                const data = await response.json();
                // Set token and token expiration in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('token_expires', (Date.now() + data.expires_in * 1000));
                // Set token
                setToken(data.token);
                // Send success message
                toast.success('Login successful');
            } else {
                // Otherwise, attempt to parse the error then throw it with a message
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }
        } catch (error) {
            // Send error message and return
            console.log(error.message);
            toast.error(error.message || 'Login failed');
            return error;
        }
    }

    // Register request
    static async register(email, password, setToken) {
        try {
            // Make request to register endpoint
            const response = await fetch(address + 'user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if response is successful
            if (response.ok) {
                // Parse response
                await response.json();
                // Send success message
                toast.success('Registration successful');
                // Login the user after successful registration
                await this.login(email, password, setToken);
            } else {
                // Otherwise, attempt to parse the error then throw it with a message
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }
        } catch (error) {
            // Send error message and return
            toast.error(error.message || 'Registration failed');
            return error;
        }
    }

    // Logout method
    static logout(setToken) {
        // Clear token
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires');
        // Send success message
        toast.success('Logged out');
    }

    // Get list of countries 
    static async getCountries() {
        try {
            // Make request to countries endpoint
            const response = await fetch(address + 'countries');

            // Check if response is successful
            if (response.ok) {
                // Parse response
                const data = await response.json();
                return data;
            } else {
                // Otherwise, attempt to parse the error then throw it with a message
                const error = await response.json();
                throw new Error(error.message || 'Failed to get countries');
            }
        } catch (error) {
            // Send error message and throw error
            toast.error(error.message || 'Failed to get countries');
            throw error;
        }
    }

    // Get list of volcanoes based on country and population within a certain range
    static async getVolcanoes(country, populatedWithin = '') {
        try {
            // Make request to volcanoes endpoint with query parameters
            const response = await fetch(address + 'volcanoes?' + new URLSearchParams({
                country: country,
                populatedWithin: populatedWithin,
            }));

            // Check if response is successful
            if (response.ok) {
                // Parse response
                const data = await response.json();
                return data;
            } else {
                // Otherwise, attempt to parse the error then throw it with a message
                const error = await response.json();
                throw new Error(error.message || 'Failed to get volcanoes');
            }
        } catch (error) {
            // Send error message and throw error
            toast.error(error.message || 'Failed to get volcanoes');
            throw error;
        }
    }

    // Get details of a specific volcano 
    // (Passed setToken in case of token expiration, 
    // I do note that user logout should probably be handled in a different way but, 
    // this is a simple example and I didn't want the higher component to have to handle it)
    static async getVolcano(id, token, setToken) {
        try {
            // Make request to volcano endpoint with volcano ID and optional token
            const response = await fetch(address + 'volcano/' + id, {
                headers: {
                    'accept': 'application/json',
                    ...(token ? { 'Authorization': 'Bearer ' + token } : {}),
                },
            });

            // Check if response is successful
            if (response.ok) {
                // Parse response
                const data = await response.json();
                return data;
            } else {
                // Otherwise, attempt to parse the error then throw it with a message
                const error = await response.json();
                throw new Error(error.message || 'Failed to get volcano');
            }
        } catch (error) {
            // If the error is invalid token, logout the user and don't throw the error
            if (error.message === 'JWT token has expired') {
                toast.error('Session expired, please login again');
                this.logout(setToken); // Pass setToken to logout method
            } else {
                // Send error message
                toast.error(error.message || 'Failed to get volcano');
                // Throw error
                throw error;
            }
        }
    }
}

export default API;
