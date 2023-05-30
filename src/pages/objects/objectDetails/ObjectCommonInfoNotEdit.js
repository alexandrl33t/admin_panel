import React from 'react';
import {Col, Row} from "antd";
import ObjectStore from "../../../store/ObjectStore";

const ObjectCommonInfoNotEdit = (props) => {
    const {object} = props;
    return (
        <>
            <Row gutter={24}>
                <Col span={8}>
                    Заказчик:
                </Col>
                <Col span={8}>
                    {object?.customer}
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    Адрес:
                </Col>
                <Col span={8}>
                    {ObjectStore.objectData?.address}
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    Номер телефона:
                </Col>
                <Col span={8}>
                    { object?.phoneNumber}
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    E-mail:
                </Col>
                <Col span={8}>
                    {object?.email}
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    Комментарии:
                </Col>
                <Col span={8}>
                    {object?.comments}
                </Col>
            </Row>
        </>
    );
};

export default ObjectCommonInfoNotEdit;