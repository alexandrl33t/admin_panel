import React, {useState} from 'react';
import '../App.css';
import {ButtonStyled} from "../styledAntd";
import {
    CaretLeftOutlined, ControlOutlined, FileTextOutlined,
    UnorderedListOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {urls} from "../routes/urls";
import ObjectCommonInfo from "../pages/objects/objectDetails/objectCommonInfo";
import {Col, Image, Menu, Row} from "antd";
import type { MenuProps } from 'antd';
import Plan from "../pages/plan/plan";
import Notifications from "../pages/objects/objectDetails/notifications";
const ObjectComponent = (props) => {
    const {bg, newObject} = props
    const [current, setCurrent] = useState('plan');
    const navigateTo = useNavigate()


    const items: MenuProps['items'] = [
        {
            label: 'План',
            key: 'plan',
            icon: <UnorderedListOutlined />,
        },
        {
            label: 'Камеры',
            key: 'cams',
            icon: <VideoCameraOutlined />,
        },
        {
            label: 'Настройка',
            key: 'setting',
            icon: <ControlOutlined />,
        },
        {
            label: 'Сценарий',
            key: 'scene',
            icon: <FileTextOutlined />,
        },
    ]

    const subComponents = {
        'plan': <Plan newObject={newObject} />
    }

    const map = "https://evg-crystal.ru/800/600/https/turistigid.com/wp-content/uploads/2018/03/kapitoliy-na-karte-vashingtona.png"
    const goHome = () => {
        navigateTo(urls.home)
    }
    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className={bg} style={{marginTop:10, marginLeft:"20px", marginRight:"20px"}}>
            <ButtonStyled onClick={goHome} type="default" icon={<CaretLeftOutlined/>}>HOME</ButtonStyled>
            <div className="object-component">
                <Row>
                    <Col span={12}>
                        <div className="object-component-up">
                            <Row gutter={[24,24]}>
                                <Col span={24}>
                                    <div className="object-common-info">
                                        <ObjectCommonInfo newObject={newObject} />
                                    </div>

                                </Col>
                            </Row>
                            {!newObject && (
                                <Row gutter={[24,24]}>
                                    <Col span={24}>
                                        <div className="object-common-info" style={{marginTop:"20px"}}>
                                            {!newObject && (
                                                <Notifications />
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="object-component-up">
                            <div className="map"><Image src={map} /></div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    </Col>

                </Row>
                    <Row>
                        {subComponents[current]}
                    </Row>
            </div>
        </div >
    )

}
export default ObjectComponent;