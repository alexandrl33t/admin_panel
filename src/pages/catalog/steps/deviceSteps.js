import React, {useState} from 'react';
import {Button, Col, Form, Row, Steps} from "antd";
import {InputStyled} from "../../../styledAntd";
const { Step } = Steps;
const DeviceSteps = (props) => {

    const [current, setCurrent] = useState(0)

    const {columns, isSensor} = props

    const next = () => {
        setCurrent((current) => current + 1);
    };

    const stepsForSensonr = {
        0: <>
            <Form.Item name="manufacturer">
                    <Row gutter={24}>
                        <Col span={20}>
                            <InputStyled />
                        </Col>
                        <Col span={4}>
                            <Button onClick={next} type="default" style={{color:"white"}}>Далее</Button>
                        </Col>
                    </Row>
            </Form.Item>
        </>,
        1: <>
            <Form.Item name="model">

            </Form.Item>
        </>,
        2: <>
            <Form.Item name="type">

            </Form.Item>
        </>,
        3: <>
            <Form.Item name="compatibility">

            </Form.Item>
        </>,
        4: <>
            <Form.Item name="protocol">

            </Form.Item>
        </>,
        5: <>
            <Form.Item name="icon">

            </Form.Item>
        </>,
    }

    const stepsForRele = {
        0: <>
            <Form.Item name="manufacturer">

            </Form.Item>
        </>,
        1: <>
            <Form.Item name="model">

            </Form.Item>
        </>,
        2: <>
            <Form.Item name="power">

            </Form.Item>
        </>,
        3: <>
            <Form.Item name="channelAmmount">

            </Form.Item>
        </>,
        4: <>
            <Form.Item name="protocol">

            </Form.Item>
        </>,
        5: <>
            <Form.Item name="control">

            </Form.Item>
        </>,
        6: <>
            <Form.Item name="sensor">

            </Form.Item>
        </>,
        7: <>
            <Form.Item name="icon">

            </Form.Item>
        </>,
    }



    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Form initialValues={{ remember: true }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off">
                <Steps type="navigation"
                       current={current}
                       className="site-navigation-steps"
                >
                    {columns.map((item) =>
                        <>
                            <Step title={item.title}/>
                        </>
                    )}
                </Steps>
                <div className="object-component" style={{margin:"20px auto"}}>
                    {isSensor ?
                        stepsForSensonr[current] :
                        stepsForRele[current]
                    }
                </div>

            </Form>

        </>
    );
}

export default DeviceSteps;