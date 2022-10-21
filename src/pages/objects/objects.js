import React from 'react';
import {Checkbox, Col, Row, Select} from "antd";
import Search from "antd/es/input/Search";
import '../../App.css';
import {Option} from "antd/es/mentions";
import ShowObjects from "./showObjects";

const Objects = () => {



    const townOptions = [
        {
            key: 'msc',
            name: 'Москва',
        },
        {
            key: 'st',
            name: 'Санкт-Петербург',
        },
        {
            key: 'tla',
            name: 'Тула',
        },
    ]
    const objectTypes = [
        {
            key: 'flat',
            name: 'Квартира',
        },
        {
            key: 'house',
            name: 'Дом',
        },
        {
            key: 'ofice',
            name: 'Офис',
        },
    ]
    const quality = [
        {
            key: 'elite',
            name: 'Элитный',
        },
        {
            key: 'damaged',
            name: 'Проблемный',
        },
    ]

    const onSearch = () => {
      console.log(1)
    };

    const onChangeTown = () => {
    }


    const turnWarning = () => {

    }

    return (
        <div className="rightSide" style={{
            width: "100%",
        }}>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <Search placeholder="Искать" onSearch={onSearch} />
                </Col>
                <Col xs={8} lg={6}>
                    <Checkbox onChange={turnWarning}>Предупреждение</Checkbox>
                </Col>
                <Col xs={8} lg={4} >
                    <Select placeholder="Город" onChange={onChangeTown}>
                        {townOptions.map((town) =>
                            <Option key={town.key} value={town.name} />
                        )}

                    </Select>
                </Col>
                <Col xs={8} lg={4}>
                    <Select placeholder="Тип объекта" onChange={onChangeTown}>
                        {objectTypes.map((typeOfObject) =>
                            <Option key={typeOfObject.key} value={typeOfObject.name} />
                        )}

                    </Select>
                </Col>
                <Col xs={8} lg={4}>
                    <Select placeholder="Качество" onChange={onChangeTown}>
                        {quality.map((item) =>
                            <Option key={item.key} value={item.name} />
                        )}

                    </Select>
                </Col>
            </Row>

            <ShowObjects />
        </div>
    );
}

export default Objects;