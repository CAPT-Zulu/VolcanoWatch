import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { MenuOutlined, HomeOutlined, SearchOutlined, AccountCircleOutlined } from '@mui/icons-material';
// Auth context
import { AuthContext } from '../App';

// Navbar component
function Navbar() {
    // Token from AuthContext
    const { token } = useContext(AuthContext);
    // Create state variables
    const [menuState, setMenuState] = useState(null);

    // Handle click event
    const handleClick = (event) => {
        setMenuState(event.currentTarget);
    };

    // Menu doesn't close when its parent is hidden causing the menu to loose its anchor
    // This could be fixed with MediaQueries.
    return (
        <AppBar position="static" className='navbar'>
            <Toolbar>
                {/* Title */}
                <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }} sx={{ flexGrow: 1 }}>
                    VolcanoWatch
                </Typography>

                {/* Desktop scaling */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Button color="inherit" component={Link} to="/">
                        <HomeOutlined />
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/search">
                        <SearchOutlined />
                        Search
                    </Button>
                    {token ? (
                        <Button color="primary" component={Link} to="/user/logout">
                            <AccountCircleOutlined />
                            Logout
                        </Button>
                    ) : (
                        <Button color="primary" component={Link} to="/user/login" >
                            <AccountCircleOutlined />
                            Sign in
                        </Button>
                    )}
                </Box>
                {/* Phone scaling */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {/* Hamburger menu */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-describedby='Open and closes the menu'
                        onClick={(event) => handleClick(event)}
                    >
                        <MenuOutlined />
                    </IconButton>

                    {/* Menu contents */}
                    <Menu
                        anchorEl={menuState}
                        open={Boolean(menuState)}
                        onClose={() => setMenuState(null)}
                    >
                        <MenuItem component={Link} to="/" onClick={() => setMenuState(null)}>
                            <HomeOutlined />
                            Home
                        </MenuItem>
                        <MenuItem component={Link} to="/search" onClick={() => setMenuState(null)}>
                            <SearchOutlined />
                            Search
                        </MenuItem>
                        {token ? (
                            <MenuItem component={Link} to="/user/logout" onClick={() => setMenuState(null)}>
                                <AccountCircleOutlined />
                                Logout
                            </MenuItem>
                        ) : (
                            <MenuItem component={Link} to="/user/login" onClick={() => setMenuState(null)}>
                                <AccountCircleOutlined />
                                Sign in
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar >
    );
}

export default Navbar;
