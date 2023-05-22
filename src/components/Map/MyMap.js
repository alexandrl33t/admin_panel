import ReactMapGL, {Marker, NavigationControl, Popup} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../../App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
export default function MyMap(props) {
    const {coords, setCoords } = props
    const { latitude, longitude } = coords;
    const mapRef = useRef(null)
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 10
    });
    const [showPopup, setShowPopup] = useState(false);
    const [adress, setAdress] = useState('')
    const [markerClicked, setMarkerClicked] = useState(false)


    useEffect(()=>{
        mapRef.current?.flyTo({center: [longitude, latitude]});
    }, [longitude, latitude])

    const changeState = (e) => {
        setViewport(e.viewState)
    };

    const handleClick = (e) => {
        setCoords({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
        })
    }
    const markerClickHandler = (e) => {
        if (!showPopup) {
            const url = `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=gEzEVg0cbrHwyqDHzbit`
            axios.get(url)
                .then(response => {
                    let add = ''
                    response.data.features.forEach(item => {
                        add += item.text_ru + ', '
                    })
                    setAdress(add)
                })
                .catch(error => {
                    console.error(error);
                });
            setShowPopup(true)
        } else {
            setShowPopup(false)
        }

    }

    return (
            <ReactMapGL
                {...viewport}
                ref={mapRef}
                mapLib={maplibregl}
               initialViewState={
                    {...viewport}
                 }
                onZoom={changeState}
                onRotate={changeState}
                onDrag={changeState}
                onClick={handleClick}
                 style={{width: "600px", height: "400px"}}
                 mapStyle="https://api.maptiler.com/maps/fa3455ef-48d0-4b05-a0ba-d8f516811220/style.json?key=gEzEVg0cbrHwyqDHzbit"
            >
                {showPopup && (
                    <Popup longitude={longitude} latitude={latitude}
                           anchor="bottom"
                           onClose={markerClickHandler}
                           closeOnClick={false}
                    >
                        {adress}
                    </Popup>)}
                <NavigationControl position="top-left" showCompass={false}/>
                <Marker longitude={longitude} latitude={latitude} draggable={true} pitchAlignment={'viewport'} onClick={markerClickHandler}/>
            </ReactMapGL>
    );
}