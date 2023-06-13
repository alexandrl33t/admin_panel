import React, {useEffect} from 'react';
import { Checkbox, Col, Row, Select, message} from "antd";
import Search from "antd/es/input/Search";
import '../../App.css';
import {Option} from "antd/es/mentions";
import ShowObjects from "./ShowObjects";
import {PlusOutlined} from "@ant-design/icons";
import {ButtonStyled} from "../../styledAntd";
import {useNavigate} from "react-router-dom";
import {urls} from "../../routes/urls";
import ObjectStore from "../../store/ObjectStore";
import {observer} from "mobx-react-lite";
import appGlobalStore from "../../store/AppGlobalStore";

const Objects = observer(() => {
    const navigateTo = useNavigate();

    useEffect(()=>{
        appGlobalStore.setUserIsAuth(true)
        ObjectStore.getObjectsAsync()
            .then(() => {
                if (ObjectStore.status === "error") {
                    message.error("Не удалось загрузить объекты.")
                }
            })
        }, [])
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
        <div className="content">
            <Row gutter={[24, 24]}>
                <Col xxl={6} xl={6} lg={6} md={6} sm={0} xs={0}>

                </Col>
                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Search placeholder="Искать" onSearch={onSearch} />
                </Col>
                <Col xxl={6} xl={6} lg={6} md={10} sm={0} xs={0}>

                </Col>
                <Col xxl={4} xl={4} lg={4} md={10} sm={0} xs={0}>

                </Col>
                <Col xxl={3} xl={3} lg={6} md={6} sm={12} xs={12}>
                    <Checkbox onChange={turnWarning}>Предупреждение</Checkbox>
                </Col>
                <Col xxl={3} xl={3} lg={6} md={6} sm={12} xs={12}>
                    <Select placeholder="Город" onChange={onChangeTown}>
                        {townOptions.map((town) =>
                            <Option key={town.key} value={town.name} />
                        )}

                    </Select>
                </Col>
                <Col xxl={3} xl={3} lg={6} md={6} sm={12} xs={12}>
                    <Select placeholder="Тип объекта" onChange={onChangeTown}>
                        {objectTypes.map((typeOfObject) =>
                            <Option key={typeOfObject.key} value={typeOfObject.name} />
                        )}

                    </Select>
                </Col>
                <Col xxl={3} xl={3} lg={6} md={6} sm={12} xs={12}>
                    <Select placeholder="Качество" onChange={onChangeTown}>
                        {quality.map((item) =>
                            <Option key={item.key} value={item.name} />
                        )}

                    </Select>
                </Col>
                <Col xxl={3} xl={3} lg={6} md={6} sm={12} xs={12}>
                    <ButtonStyled type="primary" icon={<PlusOutlined />} onClick={createObject}>
                            Добавить объект
                    </ButtonStyled>
                </Col>
            </Row>
                <ShowObjects/>
    </div>
    );
}
)

export default Objects;