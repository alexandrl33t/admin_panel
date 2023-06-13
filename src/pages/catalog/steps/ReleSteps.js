import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Row, Steps, message} from "antd";
import {InputStyled} from "../../../styledAntd";
import {useForm} from "antd/es/form/Form";
const { Step } = Steps;
const ReleSteps = (props) => {
    const [form] = useForm()

    const [current, setCurrent] = useState(0)
    const [content, setContent] = useState()
    const {columns, isSensor, setVisible} = props
    const [values, setValues] = useState([])

    const refSteps = useRef()
    const next = () => {
        setCurrent((current) => current + 1);
        console.log(form.getFieldValue(content))
        // setValues((current) => [...current,form.getFieldsValue(content.props.name)])
    };

    const back = () => {
        setCurrent((current) => current - 1)
    };
    useEffect(()=>{
        isSensor ? setContent(stepsForSensonr[current]?.content): setContent(stepsForRele[current]?.content)
    }, [current])

    useEffect(()=>{
        setCurrent(0)
    }, [columns])

    const stepsForSensonr = [
        {
            title: columns[0].title,
               content:
                    <Row gutter = {24} >
                    <Col span = {10}>
                        <Form.Item name="manufacturer">
                                <InputStyled />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                    <Button onClick={next} type="default" style={{color: "white"}}>Далее</Button>
                    </Col>
                    </Row>
        },
        {
            title: columns[1].title,
            content:

                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item name="modelSensor">
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
            title: columns[2].title,
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
            title: columns[3].title,
            content:
                        <Row gutter={24}>
                            <Col span={10}>
                                <Form.Item name="compatibility">
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
            title: columns[4].title,
            content:
                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item name="protocol">
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
            title: columns[5].title,
            content:
                <Row gutter={24}>
                            <Col span={10}>
                                <Form.Item name="iconSensor">

                                </Form.Item>
                            </Col>
                            <Col span={2}>
                            <Button htmlType="submit">
                                Добавить
                            </Button>
                            </Col>
                </Row>
        },
    ]

    const stepsForRele = [
        {
            title: columns[0].title,
            content:
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item name="manufacturer">
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
            title: columns[1].title,
            content:
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item name="modelRele">
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
            title: columns[2].title,
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
            title: columns[3].title,
            content:
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item name="channelAmmount">
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
            title: columns[4].title,
            content:
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item name="protocolRele">
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
            title: columns[5].title,
            content:
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item name="control">
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
            title: columns[6]?.title,
            content:
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item name="sensor">
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
            title: columns[7]?.title,
            content:
                <Row gutter={24}>
                    <Col span={4}>
                        <Form.Item name="iconRele">

                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType="submit">
                            Добавить
                        </Button>
                    </Col>
                </Row>
        }
    ]



    const onFinish = (values: any) => {
        const formItemsNamesSensor = [
            "manufacturer", "modelSensor", "type", "compatibility",
            "protocol"
        ]
        const formItemsNamesRele = [
            "manufacturer", "modelRele", "power",
            "channelAmmount", "protocolRele", "control", "sensor"
        ]
        console.log(form.getFieldsValue(isSensor ? formItemsNamesSensor : formItemsNamesRele))
        setVisible(false)
        message.success('Устройство успешно добавлено')

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (value) => {
        setCurrent(value);
        isSensor ? setContent(stepsForSensonr[current]?.content): setContent(stepsForRele[current]?.content)
    };

    const items = columns.map((item) => ({
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
}

export default ReleSteps;