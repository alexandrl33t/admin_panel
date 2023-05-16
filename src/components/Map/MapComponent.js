
import { useState } from "react";
import MyMap from "./MyMap";
import axios from "axios";
import {Input} from "antd";

const MapComponent = () => {
    const [coords, setCorrds] = useState({
        latitude: "55.74993",
        longitude: "37.61691"
    });


    function search(input, e) {
        const url = `https://api.maptiler.com/geocoding/${input}.json?key=gEzEVg0cbrHwyqDHzbit`
        axios.get(url)
            .then(response => {
                console.log(response.data.features)
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div>
            <h2>Введите ваш адрес</h2>
            <section>
                <h2>Поиск адреса</h2>
                <Input.Search
                    placeholder="Введите адрес"
                    style={{
                        width: '600px',
                    }}
                    onSearch={(value, e) => {search(value)}}
                />
            </section>
            <MyMap coords={coords} />
        </div>
    );
};

export default MapComponent;