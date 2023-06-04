import React from 'react';
import {Button, Col, Form, Row} from "antd";
import CreateUserBaseInfo from "./CreateUserBaseInfo";
import CreateUserAdditionalInfo from "./CreateUserAdditionalInfo";
import {CaretLeftOutlined} from "@ant-design/icons";
import {ButtonStyled} from "../../../styledAntd";
import {urls} from "../../../routes/urls";
import {useNavigate} from "react-router-dom";

const CreateUserPage = () => {
    const [form] = Form.useForm();
    const navigateTo = useNavigate()
    const onFinish = (values) => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };

    const goHome = () => {
        navigateTo(urls.objects)
    }
    return (
        <div className="content">
            <ButtonStyled className="button-home" onClick={goHome} type="default" icon={<CaretLeftOutlined/>}>HOME</ButtonStyled>
            <h1>Добавление пользователя</h1>
            <Form
            form={form}
            onFinish={onFinish}
            name="create-user"
            >
            <Row className="create-user-form">
                <Col xxl={10} xl={10} lg={6} md={12} sm={24} xs={24}>
                    <CreateUserBaseInfo />
                    <Row style={{marginTop: 10}}>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    <span className="create-user-button">
                                        Добавить пользователя
                                    </span>
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <CreateUserAdditionalInfo form={form}/>
                </Col>
            </Row>
            </Form>
        </div>
    );
};

export default CreateUserPage;