import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import ObjectStore from "../../../store/ObjectStore";

const ObjectCommonInfoEdit = (props) => {

    const {object} = props;

    return (
        <>
            <Row gutter={24}>
                <Col span={8}>
                    Заказчик:
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="customer"
                        rules={[{ required: false }]}
                        initialValue={object?.customer}
                    >
                        <Input placeholder="Заказчик" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    Адрес:
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="address"
                        rules={[{ required: false }]}
                        initialValue={ObjectStore.objectData?.address}
                    >
                        <Input placeholder="Адрес" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    Номер телефона:
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="phone_number"
                        rules={[{ required: false }]}
                        initialValue={object?.phoneNumber}
                    >
                        <Input placeholder="Номер телефона" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    E-mail:
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="email"
                        rules={[{ required: false }]}
                        initialValue={object?.email}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    Комментарии:
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="comment"
                        rules={[{ required: false }]}
                        initialValue={object?.comments}
                    >
                        <Input placeholder="Комментарий" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button type="primary" htmlType="submit">
                                    <span className="create-user-button">
                                        Сохранить
                                    </span>
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default ObjectCommonInfoEdit;