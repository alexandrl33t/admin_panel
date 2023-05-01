import React, {useEffect, useRef, useState} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "@pbe/react-yandex-maps";

const YMapComponent = () => {
    const ymaps = React.useRef(null);
    const [newCoords, setNewCoords] = useState([55.7001, 37.5689]);
    const ref = useRef();
    const ref2 = useRef();
    const [address, setAddress] = useState("");
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const API_KEY = "c72dc69b-b42b-495c-a0bf-eb27a9fa3719";
    useEffect(() => {
        (async () => {
            try {
                if (value) {
                    const res = await fetch(
                        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value}`
                    );
                    const data = await res.json();
                    const collection = data.response.GeoObjectCollection.featureMember.map(
                        (item) => item.GeoObject
                    );
                    setOptions(() => collection);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [value]);
    const onMapClick = (event) =>
    {
        const coords = event.get("coords");
        setNewCoords(() => coords);

        ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
                firstGeoObject.getLocalities().length
                    ? firstGeoObject.getLocalities()
                    : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                firstGeoObject.getPremiseNumber()
            ]
                .filter(Boolean)
                .join(", ");
            ref.current.getMap().hint.open(coords, newAddress);
            setAddress(() => newAddress);
            setValue(() => newAddress);
        })
    }
    return (
            <YMaps
                query={{
                    load: "package.full",
                    apikey: API_KEY
                }}>
                <div className="object-component-up">
                    <Map defaultState={{ center: [55.70, 37.57], zoom: 18}} width={"80%"} height={400}
                         instanceRef={ref2}
                         onLoad={(e) => {
                             ymaps.current = e;
                         }}
                         onClick={onMapClick}
                    >
                        <Placemark
                            instanceRef={ref}
                            geometry={newCoords}
                            options={{
                                iconImageSize: [30, 30],
                                draggable: true,
                                preset: "islands#yellowDotIcon",
                                hideIconOnBalloonOpen: false,
                                openEmptyHint: true
                            }}
                            key={`https://img.icons8.com/ios-filled/2x/marker-${1}.png`}
                            properties={{
                                iconContent: "+",
                                hintContent: address
                            }}
                        />
                        <ZoomControl options={{ float: "right" }} />
                    </Map>
                </div>
            </YMaps>
    );
};

export default YMapComponent;