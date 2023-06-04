import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Row, Table} from "antd";
import {EditOutlined, PlusSquareOutlined} from "@ant-design/icons";
import ReleSteps from "../steps/ReleSteps";
import devicesStore from "../../../store/DevicesStore";
import DeviceSteps from "../steps/DeviceSteps";

const columnsDevice = [
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

const dataSensor = [
    {
        key: '1',
        type: 'Духовой шкаф',
        power: '50',
    },
    {
        key: '2',
        type: 'Холодильник',
        power: '50',
    },
];

const DevicePage = () => {

    const [stepsVisible, setStepsVisible] = useState('')

    const steps = {
        'device': <DeviceSteps />,
    }

    useEffect(()=>{
        devicesStore.callForDevices().then()
    }, [])

    function onChange() {

    }

    function addDevice() {
        setStepsVisible('device')
    }

    const buttonIconStyle = {
        marginTop:5,
        width: "fit-content",
        height: "fit-content",
        padding: "0px 0",
        border: "hidden",
    }

    return (
        <>
            <Row style={{marginLeft:15, marginTop:15}}>
                <Col span={6}>
                    <h2>Устройства</h2>
                </Col>
                <Col span={14}>
                </Col>
                <Col span={2}>
                    <Button onClick={addDevice} style={buttonIconStyle} icon={<PlusSquareOutlined style={{fontSize:"23px"}}/>}>
                    </Button>
                </Col>
                <Col span={2}>
                    <Button  style={buttonIconStyle} icon={<EditOutlined style={{fontSize:"23px"}}/>}>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columnsDevice} dataSource={dataSensor} onChange={onChange} pagination={false} />
                </Col>
            </Row>
            <Row style={{marginTop:"30px"}}>
                <Col span={24}>
                    {steps[stepsVisible]}
                </Col>
            </Row>
        </>
    );
};

export default DevicePage;