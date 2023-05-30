import ReactMapGL, {Marker, NavigationControl, Popup} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../../App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import ObjectStore from "../../store/ObjectStore";
import {Button} from "antd";
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
    const [popupSetMarker, setPopupSetMarker] = useState(false)
    const [mapElement, setMapElement] = useState()
    const [markerOpened, setMarkerOpened] = useState(false)

    useEffect(()=>{
        mapRef.current?.flyTo({center: [longitude, latitude]});
    }, [longitude, latitude])

    const changeState = (e) => {
        setViewport(e.viewState)
    };

    const handleClick = (e) => {
        setMapElement(e)
        if (!markerOpened) {
            setPopupSetMarker(true)
        }
    }

    const getAddressByCoords = () => {
        const url = `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=gEzEVg0cbrHwyqDHzbit`
        axios.get(url)
            .then(response => {
                if (response.data.features[0]) {
                    setAdress(response.data.features[0].place_name_ru)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const setAddressByCoords = (lng = null, lat = null) => {
        const url = `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=gEzEVg0cbrHwyqDHzbit`
        axios.get(url)
            .then(response => {
                if (response.data.features[0]) {
                setAdress(response.data.features[0].place_name_ru)
                ObjectStore.setAddress(response.data.features[0].place_name_ru)
                ObjectStore.setPosition(response.data.features[0].place_name_ru)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const markerClickHandler = (e) => {
        if (!showPopup) {
            getAddressByCoords()
            setShowPopup(true)
            setMarkerOpened(true)
        } else {
            setShowPopup(false)
            setMarkerOpened(false)
        }

    }

    const saveAddress = () => {
        setCoords({
            latitude: mapElement?.lngLat.lat,
            longitude: mapElement?.lngLat.lng,
        })
        setAddressByCoords(mapElement?.lngLat.lng, mapElement?.lngLat.lat)
        setPopupSetMarker(false)
        //TODO: отправить put запрос на обновление объекта
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
                        <div>
                            {adress}
                        </div>
                    </Popup>)}
                {popupSetMarker && (
                    <Popup longitude={mapElement?.lngLat.lng} latitude={mapElement?.lngLat.lat}
                           anchor="bottom"
                           onClose={()=>setPopupSetMarker(false)}
                           closeOnClick={false}
                    >
                        <Button onClick={saveAddress}>Установить адрес</Button>
                    </Popup>)}
                <NavigationControl position="top-left" showCompass={false}/>
                <Marker longitude={longitude} latitude={latitude} draggable={true} pitchAlignment={'viewport'} onClick={markerClickHandler}/>
            </ReactMapGL>
    );
}