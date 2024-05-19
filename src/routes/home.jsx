import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Divider } from '@mui/material';
// Image import to be used via inline styling
import VolcanoHeroImage from '../assets/images/VolcanoHero.webp';
// Auth context
import { AuthContext } from '../App';

// Home route
function Home() {
    // Navigate function
    const navigate = useNavigate();
    // Token from AuthContext
    const { token } = useContext(AuthContext);

    return (
        <div className='HomePage ColumnContainer'>
            {/* Page Title */}
            <div className='HeroContainer' style={{ backgroundImage: `url(${VolcanoHeroImage})` }}>
                <Typography variant='h3'>Welcome to VolcanoWatch!</Typography>
                <a href='https://unsplash.com/photos/brown-and-black-mountain-under-white-clouds-80x3QULJDN4'>Image credits - Tetiana Grypachevska</a>
            </div>
            <Divider />
            {/* Page Description */}
            <div className=''>
                <Typography variant='h6'>
                    Looking for an explosive adventure? You've come to the right place!
                    VolcanoWatch is your one-stop destination for discovering the world's most fascinating volcanoes.
                    Whether you're a lava enthusiast or just curious about the Earth's fiery wonders, we've got you covered.
                    Join us on this volcanic journey and explore the hidden secrets of the planet's molten marvels.
                </Typography>
            </div>
            {/* Search and Filter Buttons */}
            <div className='RowContainer EvenlySpaced'>
                <button className='StylisedButton' onClick={() => navigate('/search')}>
                    Click here to search for a volcano
                </button>
                {!token ? (
                    <button className='StylisedButton' onClick={() => navigate('/user/register')}>
                        Click here to create an account
                    </button>
                ) : (null)}
            </div>
        </div >
    );
}

export default Home;