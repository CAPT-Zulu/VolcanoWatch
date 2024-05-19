import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet';
import { icon } from 'leaflet';
import "../assets/styles/leaflet.css";
import volcano_icon from '../assets/images/VolcanoIcon.png';

// Volcano map component
function VolcanoMap({ location, level }) {
    // Reference to map container
    const mapRef = useRef(null);

    // Define population distance circles
    const circleOptions = {
        '5km': {
            radius: 2500,
            color: 'black',
            zoom: 13
        },
        '10km': {
            radius: 5000,
            color: 'red',
            zoom: 12
        },
        '30km': {
            radius: 15000,
            color: 'orange',
            zoom: 10.5
        },
        '100km': {
            radius: 50000,
            color: 'blue',
            zoom: 8.5
        },
        '': {
            radius: 0,
            color: 'red',
            zoom: 7.5
        }
    }

    // Define custom icon
    const customIcon = icon({
        iconUrl: volcano_icon,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
    });

    // Fly to selected level on map
    useEffect(() => {
        // Fly to location on map (If map is loaded)
        if (mapRef.current) {
            mapRef.current.flyTo(location, circleOptions[level].zoom);
        }
    }, [level]);


    return (
        <div className="MapContainer">
            <MapContainer
                ref={mapRef}
                center={location}
                zoom={circleOptions[level].zoom}
                style={{ height: "100%", width: "100%" }}
                aria-label="Volcano Map"
                aria-describedby="Map showing the location of the volcano and population density circles"
            >
                {/* OpenStreetMaps TileLayer */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Volcano Marker */}
                <Marker
                    position={location}
                    icon={customIcon}
                />
                {/* Population Distance Circles */}
                {level != '' ? (
                    <Circle
                        key={level}
                        center={location}
                        radius={circleOptions[level].radius}
                        fill={true}
                        fillOpacity={0.1}
                        dashArray={5}
                        color={circleOptions[level].color}
                    />
                ) : (null)}
            </MapContainer>
        </div>
    );
};

export default VolcanoMap;