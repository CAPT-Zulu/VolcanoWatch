import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider, Skeleton, Typography, Grid, useTheme, useMediaQuery, Breadcrumbs, Button } from "@mui/material";
import { KeyboardReturn } from "@mui/icons-material";
// Common imports
import API from '../common/api';
// Auth context
import { AuthContext } from '../App';
// Component imports
import PopulationChart from "../components/populationChart";
import VolcanoMap from "../components/volcanoMap";

// Volcano route
function Volcano() {
    // Token from AuthContext
    const { token, setToken } = useContext(AuthContext);
    // Navigate function
    const navigate = useNavigate();

    // Volcano state variable
    const [volcano, setVolcano] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(''); // Zoom level for map
    // Get ID from URL
    const { id } = useParams();

    const theme = useTheme();
    const desktopScale = useMediaQuery(theme.breakpoints.up('md'));

    // Get volcano data
    useEffect(() => {
        // Get volcano data from API (getVolcano is passed the setToken in the event the user token has expired and needs to be removed)
        API.getVolcano(id, token, setToken)
            .then(data => { setVolcano(data); })
            .catch(() => navigate('/search')); // Navigate to search on error (Doesn't occur if token has expired)
    }, [token]);

    return (
        <div className="BlurContainer">
            {volcano ? (
                <div className="ColumnContainer FullHeight">
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h3">{volcano.name}</Typography>
                            <Breadcrumbs separator="-" aria-label="breadcrumb">
                                <Typography variant="h6">{volcano.country}</Typography>
                                <Typography variant="h6">{volcano.subregion}</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Button fullWidth variant="outlined" color="secondary" onClick={() => navigate(-1)}><KeyboardReturn />Return</Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container className="ColumnContainer CenterDiv" style={{ alignContent: (desktopScale ? '' : 'baseline') }}>
                        <Grid item xs={12} md>
                            <Typography variant="p">
                                The volcano <strong>{volcano.name}</strong>, located in <strong>{volcano.subregion}</strong>, <strong>{volcano.country}</strong>, last erupted in <strong>{volcano.last_eruption}</strong>.
                                Found in the regions of <strong>{volcano.region}</strong>, the volcano has an summit of elevation above sea level of <strong>{volcano.summit}m</strong> (<strong>{volcano.elevation}ft</strong>).
                            </Typography>
                            <Divider />
                            <Box style={{ height: '200px' }}>
                                {token ? (
                                    <PopulationChart
                                        data={volcano}
                                        onAxisClick={(e, axis) => setZoomLevel(axis.axisValue)}
                                    />
                                ) : (
                                    <Button onClick={() => navigate('/user/login')}>
                                        <Typography variant="h5">Log in to see more data</Typography>
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md style={{ height: (desktopScale ? '100%' : '300px'), minHeight: '50vh' }}>
                            <VolcanoMap
                                location={[volcano.latitude, volcano.longitude]}
                                level={zoomLevel}
                            />
                        </Grid>
                    </Grid>
                </div>
            ) : (
                // Skeleton loading
                <div className="ColumnContainer FullHeight">
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h1"><Skeleton width="250px" /></Typography>
                            <Breadcrumbs separator="-" aria-label="breadcrumb">
                                <Typography variant="h3"><Skeleton width="80px" /></Typography>
                                <Typography variant="h3"><Skeleton width="120px" /></Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item>
                            <Button fullWidth variant="outlined" color="secondary" onClick={() => navigate(-1)}><KeyboardReturn />Return</Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container className="ColumnContainer" style={{ alignContent: (desktopScale ? '' : 'baseline') }}>
                        <Grid item xs={12} md>
                            <Typography variant="h4"><Skeleton width="80%" /></Typography>
                            <Typography variant="h4"><Skeleton width="40%" /></Typography>
                            <Skeleton
                                variant="rectangular"
                                height={200}
                                width="100%"
                            />
                        </Grid>
                        <Grid item xs={12} md>
                            <Skeleton
                                variant="rectangular"
                                height={desktopScale ? '100%' : 300}
                                width="100%"
                                style={{ minHeight: '50vh' }}
                            />
                        </Grid>
                    </Grid>
                </div>
            )
            }
        </div >
    )
}

export default Volcano;
