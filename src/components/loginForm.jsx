import { InputAdornment, Button, TextField, Tooltip } from '@mui/material';
import { Mail, Lock } from '@mui/icons-material';

// Login form component (Doesn't require pre-validation)
function LoginForm({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                label="Account Email"
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
            />
            <TextField
                required
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                }}
            />
            <Tooltip title="That's a shame." placement="left" arrow>
                <p>Forgot password? </p>
            </Tooltip>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
            >
                Login
            </Button>
        </form>
    );
}

export default LoginForm;