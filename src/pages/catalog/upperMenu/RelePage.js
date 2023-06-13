import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Row, Table, message} from "antd";
import {ColumnsType} from "antd/es/table";
import {Component} from "react";
import {EditOutlined, PlusSquareOutlined} from "@ant-design/icons";
import ReleSteps from "../steps/ReleSteps";
import devicesStore from "../../../store/DevicesStore";
import {observer} from "mobx-react-lite";

const columnsSensor = [
    {
        title: 'Производитель',
        dataIndex: 'manufacturer',
    },
    {
        title: 'Модель',
        dataIndex: 'model',
    },
    {
        title: 'Тип',
        dataIndex: 'type',
    },
    {
        title: 'Совместимость',
        dataIndex: 'compatibility',
    },
    {
        title: 'Протокол',
        dataIndex: 'protocol',
    },
    {
        title: 'Иконка',
        dataIndex: 'icon',
    },
];

const columnsRele = [
    {
        title: 'Производитель',
        dataIndex: 'manufacturer',
    },
    {
        title: 'Модель',
        dataIndex: 'model',
    },
    {
        title: 'Мощность',
        dataIndex: 'power',
    },
    {
        title: 'Кол-во каналов',
        dataIndex: 'channelAmmount',
    },
    {
        title: 'Протокол',
        dataIndex: 'protocol',
    },
    {
        title: 'Контроль нагрузки',
        dataIndex: 'control',
    },
    {
        title: 'Сенсор',
        dataIndex: 'sensor',
    },
    {
        title: 'Иконка',
        dataIndex: 'icon',
    },
];

let dataSensor: DataTypeSensor[] = [
    {
        key: '1',
        manufacturer: 'Sonoff',
        model: 'DS18B0',
        type: 'Температурный',
        compatibility: 'TH10/16',
        protocol: 'Проводной',
    },
    {
        key: '2',
        manufacturer: 'Sonoff',
        model: 'SZNB-DM',
        type: 'Температура/Влажность',
        compatibility: <Checkbox defaultChecked={true} disabled />,
        protocol: 'Zegbee',
    },
];
const dataRele: DataTypeRele [] = [
    {
        key: '1',
        manufacturer: 'Sonoff',
        model: 'R2 Dual',
        power: '16A',
        channelAmmount: '1',
        protocol: 'Wi-Fi',
        control:'None',
        sensor:'None',
        icon:'',
    },
    {
        key: '2',
        manufacturer: 'Sonoff',
        model: 'TH16',
        power: '16A',
        channelAmmount: '2',
        protocol: 'Wi-Fi',
        control:<Checkbox defaultChecked={true} disabled />,
        sensor:<Checkbox defaultChecked={true} disabled />,
        icon:'',
    },
];

export const RelePage = observer(() => {

    const [stepsVisible, setStepsVisible] = useState('')
    const [columns, setColumns] = useState(columnsSensor)
    const [vissible, setVisible] = useState(true)
    const steps = {
        'device': <ReleSteps columns={columns} setVisible={setVisible} isSensor={true} />,
        'rele': <ReleSteps columns={columns} setVisible={setVisible} />,
    }

    useEffect(()=>{
        devicesStore.callForDevices().then()
    }, [])

    function onChange() {

    }

    function addDevice() {
        setVisible(true)
        setColumns(columnsSensor)
        setStepsVisible('device')
    }

    function addRele() {
        setVisible(true)
        setColumns(columnsRele)
        setStepsVisible('rele')
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
                    <h2>Сенсоры</h2>
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
                    <Table columns={columnsSensor} dataSource={dataSensor} onChange={onChange} pagination={false} />
                </Col>
            </Row>

            <Row style={{marginLeft:15, marginTop:20}}>
                <Col span={6}>
                    <h2>Реле</h2>
                </Col>
                <Col span={14}>
                </Col>
                <Col span={2}>
                    <Button onClick={addRele} style={buttonIconStyle} icon={<PlusSquareOutlined style={{fontSize:"23px"}}/>}>
                    </Button>
                </Col>
                <Col span={2}>
                    <Button style={buttonIconStyle} icon={<EditOutlined style={{fontSize:"23px"}}/>}>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columnsRele} dataSource={dataRele} onChange={onChange} pagination={false} />
                </Col>
            </Row>
            {vissible && <Row style={{marginTop:"30px"}}>
                <Col span={24}>
                    {steps[stepsVisible]}
                </Col>
            </Row>}
        </>
    );
});