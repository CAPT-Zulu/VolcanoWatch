import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Component imports
import NavBar from './components/navbar';
import MessageHandler from './components/messageHandler';

// Route imports
import Home from './routes/home';
import User from './routes/user';
import Search from './routes/search';
import Volcano from './routes/volcano';
import NotFound from './routes/notFound';

// User authentication context
export const AuthContext = createContext();

// App component
function App() {
    // Token state variable
    const [token, setToken] = useState(null);

    // Check to see if user is logged in on page load
    useEffect(() => {
        try {
            // Get token and token_expires from local storage
            const local_token = localStorage.getItem('token');
            const local_token_expires = localStorage.getItem('token_expires');

            // If token_expires has not expired, store and set the token
            if (local_token_expires > Date.now()) {
                setToken(local_token);
            } else if (local_token | local_token_expires) {
                // Otherwise, remove the token from local storage
                localStorage.removeItem('token');
                localStorage.removeItem('token_expires');
            }
        } catch (error) {
            // Log error
            console.error(error);
        }
    }, []);

    return (
        <BrowserRouter>
            {/* Authentication Context Provider */}
            <AuthContext.Provider value={{ token, setToken }}>
                {/* Navbar */}
                <NavBar />
                {/* MessageHandler */}
                <MessageHandler />
                {/* Main content */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/volcano/:id" element={<Volcano />} />
                        <Route path="/user/:action" element={<User />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </AuthContext.Provider >
        </BrowserRouter >
    )
}

export default App;