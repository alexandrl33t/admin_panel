
import {useRef, useState} from "react";
import MyMap from "./MyMap";
import axios from "axios";
import {Input, Select} from "antd";

const MapComponent = () => {
    const [options, setOptions] = useState([])
    const [coords, setCoords] = useState({
        latitude: "55.74993",
        longitude: "37.61691"
    });


    const onSearch = (input) => {
        const url = `https://api.maptiler.com/geocoding/${input}.json?key=gEzEVg0cbrHwyqDHzbit`
        axios.get(url)
            .then(response => {
                let opt= []
                response.data.features.forEach(item => {
                    opt.push({value: item.place_name_ru, label: item.place_name_ru, center: item.center})
                })
                setOptions(opt)
            })
            .catch(error => {
                console.error(error);
            });
    }
    const onSelect = (value, option) => {
        setCoords({
            latitude: option.center[1],
            longitude: option.center[0]
        })
    }

    return (
        <div>
            <h2>Поиск адреса</h2>
            <section style={{marginBottom: 5}}>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onSelect={onSelect}
                    style={{
                        width: '600px',
                    }}
                    options={options}
                    autoClearSearchValue={false}
                />
            </section>
            <MyMap coords={coords} setCoords={setCoords} />
        </div>
    );
};

export default MapComponent;