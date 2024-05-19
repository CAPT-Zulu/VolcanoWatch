import { useState } from 'react';
import { InputAdornment, Button, TextField } from '@mui/material';
import { Mail, Lock } from '@mui/icons-material';

// Register form component
function RegisterForm({ handleSubmit }) {
    // Create state variables for email and password error states
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Verify email function
    const verifyEmail = (email) => {
        // Basic email pattern (Based on a simplified version of RFC 5322 standard)
        // I was told using the full RFC 5322 standard is overkill for most applications
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Verify password function
    const verifyPassword = (password) => {
        // Normally I would use a more complex password pattern
        // however, this app doesn't require such complexity
        // so I'm just checking for a minimum length of 5 characters
        const passwordPattern = /^.{5,}$/;
        return passwordPattern.test(password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                label="Register new Email"
                type="text"
                name="email"
                placeholder="Enter your email"
                autoComplete="username"
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Mail />
                        </InputAdornment>
                    ),
                }}
                error={emailError}
                helperText={emailError ? 'Invalid email' : ''}
                onChange={(e) => setEmailError(!verifyEmail(e.target.value))}
            />
            <TextField
                required
                label="Create a Password"
                type="password"
                name="password"
                placeholder="Enter a password"
                autoComplete="new-password"
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                }}
                error={passwordError}
                helperText={passwordError ? 'Password must contain at least 5 characters' : ''}
                onChange={(e) => setPasswordError(!verifyPassword(e.target.value))}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={emailError || passwordError}
            >
                Create Account
            </Button>
        </form>
    );
};

export default RegisterForm;