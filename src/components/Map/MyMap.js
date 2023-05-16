
import Map, {Marker, NavigationControl} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../../App.css';
export default function MyMap({ coords }) {
    const { latitude, longitude } = coords;

    return (
            <Map mapLib={maplibregl}
                   initialViewState={{
                     longitude: longitude,
                     latitude: latitude,
                     zoom: 14
                 }}
                   style={{width: "600px", height: "400px"}}
                   mapStyle="https://api.maptiler.com/maps/streets/style.json?key=gEzEVg0cbrHwyqDHzbit"
            >
                <NavigationControl position="top-left" />
                <Marker longitude={longitude} latitude={latitude}/>
            </Map>
    );
}