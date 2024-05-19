import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import important_cat_img from '../assets/images/cat_bandwidth.webp';

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="CenterDiv">
            <Typography variant="h1">
                404
            </Typography>
            <div className="BlurContainer">
                <div style={{ display: "flex", padding: "15px", justifyContent: "space-evenly" }}>
                    <Typography variant="h3">
                        We couldn't find the page you were looking for.
                    </Typography>
                    <img src={important_cat_img} alt="A photo of my cat" className="ImportantCatImg" />
                </div>
                <br />
                <button className="StylisedButton" onClick={() => navigate('/')} >
                    <Typography>
                        Return Home
                    </Typography>
                </button>
            </div>
        </div>
    );
};

export default NotFound;