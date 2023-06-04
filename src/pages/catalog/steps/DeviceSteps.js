import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Row, Steps} from "antd";
import {InputStyled} from "../../../styledAntd";
import {useForm} from "antd/es/form/Form";
const columnsDevice= [
    {
        title: 'Тип',
        dataIndex: 'type',
    },
    {
        title: 'Мощность',
        dataIndex: 'power',
    },
    {
        title: 'Иконка',
        dataIndex: 'icon',
    },
];

const DeviceSteps = () => {

    const [form] = useForm()

    const [current, setCurrent] = useState(0)
    const [content, setContent] = useState()

    let values = []

    const refSteps = useRef()
    const next = () => {
        setCurrent((current) => current + 1);
        values.push(form.getFieldsValue(content.props.name))
    };

    const back = () => {
        setCurrent((current) => current - 1)
    };
    useEffect(()=>{
        isSensor ? setContent(stepsForSensonr[current]?.content): setContent(stepsForRele[current]?.content)
    }, [current])

    const stepsForDevice = [
        {
            title: "Тип",
            content:
                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item name="type">
                            <InputStyled />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button onClick={back} type="default" style={{color:"white"}}>Назад</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={next} type="default" style={{color:"white"}}>Далее</Button>
                    </Col>
                </Row>
        },
        {
            title: "Мощность",
            content:
                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item name="power">
                            <InputStyled />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button onClick={back} type="default" style={{color:"white"}}>Назад</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={next} type="default" style={{color:"white"}}>Далее</Button>
                    </Col>
                </Row>
        },
        {
            title: "Иконка",
            content:
                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item name="icon">
                            <InputStyled />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button onClick={back} type="default" style={{color:"white"}}>Назад</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={next} type="default" style={{color:"white"}}>Далее</Button>
                    </Col>
                </Row>
        },
    ]

    const onFinish = (values: any) => {
        const formItemsNamesDevice = [
            "type", "power", "icon"
        ]
        console.log(form.getFieldsValue(formItemsNamesDevice))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (value) => {
        setCurrent(value);
    };

    const items = columnsDevice.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    return (
        <>
            <Steps type="navigation"
                   ref={refSteps}
                   current={current}
                   className="site-navigation-steps"
                   onChange={onChange}
                   items={items}
            >
            </Steps>
            <Form initialValues={{ remember: true }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  form={form}
            >
                <div className="object-component" style={{margin:"20px auto"}}>
                    {content}
                </div>
            </Form>
        </>
    );
};

export default DeviceSteps;