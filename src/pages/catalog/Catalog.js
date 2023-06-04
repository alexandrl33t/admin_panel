import React, {useState} from 'react';
import {Col, Menu, Row} from "antd";
import '../../App.css';
import {MenuProps} from "antd";
import {RelePage} from "./upperMenu/RelePage";
import DevicePage from "./upperMenu/DevicePage";

const Catalog = () => {

    const [current, setCurrent] = useState('relePage');

    const pages = {
        'relePage' : <RelePage />,
        'devicePage': <DevicePage />,
    };

    const items: MenuProps['items'] = [
        {
            label: 'Тип оборудования',
            key: 'relePage',
        },
        {
            label: 'Типы потребителей',
            key: 'devicePage',
        },
        {
            label: 'Категории объектов',
            key: 'objectCategory',
        },
    ]
    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
    };

    return (
        <>
            <Row gutter={[0, 32]}>
                <Col span={24}>
                    <Menu onClick={onClick} defaultSelectedKeys={[current]} selectedKeys={[current]} mode="horizontal" items={items} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="right-side" style={{
                        width: "100%",
                    }}>
                        {pages[current]}
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Catalog;