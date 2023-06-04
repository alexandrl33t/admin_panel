import React, {useRef, useState} from 'react';
import '../../../App.css';
import {ButtonStyled} from "../../../styledAntd";
import {
    CaretLeftOutlined, ControlOutlined, FileTextOutlined,
    UnorderedListOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {urls} from "../../../routes/urls";
import ObjectCommonInfo from "./ObjectCommonInfo";
import {Col, Image, Menu, Row} from "antd";
import type { MenuProps } from 'antd';
import Plan from "../../plan/Plan";
import Notifications from "./notifications";
import MapComponent from "../../../components/Map/MapComponent";
import CamerasPage from "../../cameras/CamerasPage";
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
            key: 'camera',
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
        'plan': <Plan newObject={newObject} />,
        'camera': <CamerasPage/>,
    }

    const goHome = () => {
        navigateTo(urls.objects)
    }
    const onClick: MenuProps['onClick'] = e => {
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
                        <MapComponent />
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