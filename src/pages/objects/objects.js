import React from 'react';
import { Checkbox, Col, Row, Select} from "antd";
import Search from "antd/es/input/Search";
import '../../App.css';
import {Option} from "antd/es/mentions";
import ShowObjects from "./showObjects";
import {PlusOutlined} from "@ant-design/icons";
import {ButtonStyled} from "../../styledAntd";
import {useNavigate} from "react-router-dom";
import {urls} from "../../routes/urls";

const Objects = () => {
    const navigateTo = useNavigate();


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

    const createObject = () => {
        navigateTo(urls.createObject)
    }

    return (
        <>
            <Row gutter={[0, 32]}>
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
                <Col xs={4} lg={2}>
                    <ButtonStyled type="primary" icon={<PlusOutlined />} onClick={createObject}>
                            Добавить объект
                    </ButtonStyled>
                </Col>
            </Row>
                <ShowObjects/>
    </>
    );
}

export default Objects;