import React from 'react';
import {Col, DatePicker, Form, Input, Row, Select} from "antd";

const CreateUserBaseInfo = () => {
    const rolesOptions = [
        {
            value: 'admin',
            label: 'Администратор',
        },
        {
            value: 'manager',
            label: 'Менеджер',
        },
        {
            value: 'security',
            label: 'Охрана',
        },
        {
            value: 'watcher',
            label: 'Наблюдатель',
        },
    ]
    return (
        <>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Выбор роли
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="role"
                        label=""
                        initialValue={"admin"}
                        rules={[
                            {

                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберете роль"
                            defaultActiveFirstOption={true}
                            defaultValue="admin"
                            options={rolesOptions}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Логин
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="login"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Введите логин" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Номер телефона
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="phone_number"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Введите номер" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Почта
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24}>
                    <Form.Item
                        name="mail"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Введите почту" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Пароль
                </Col>
                <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24} className="time_password">
                    <Form.Item
                        name="password"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <input type="password"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Фамилия
                </Col>
                <Col sxxl={8} xl={8} lg={12} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="sur_name"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Введите фамилию" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Имя
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="first_name"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Введите имя" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Отчество
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="middle_name"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="Введите отчество" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Дата рождения
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    <Form.Item
                        name="birth_date"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker placeholder="Введите дату рождения" style={{width: "100%"}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="create-user-titles">
                    Временный пароль
                </Col>
                <Col xxl={8} xl={8} lg={6} md={12} sm={24} xs={24} className="time_password">
                    <Form.Item
                        name="time_password"
                        label=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <input/>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default CreateUserBaseInfo;