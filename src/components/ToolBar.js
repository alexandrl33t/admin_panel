import React, {useEffect, useState} from 'react';
import {Menu, message, Slider} from "antd";
import {
    ArrowsAltOutlined,
    EditOutlined,
    ExpandOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined, RadarChartOutlined,
    SaveOutlined, ToolOutlined,
} from "@ant-design/icons";
import toolState from "../store/toolState";
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import Device from "../tools/Device";
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";
import {observer} from "mobx-react-lite";
import deviceState from "../store/deviceState";

let areas = [
    {
        id: 1,
        name:"Bathroom",
        points: [
            {x:100,y:8},
            {x:225,y:8},
            {x:225,y:188},
            {x:100,y:188},
        ],
        plan_id: '1',
    },
    {
        id: 2,
        name:"Lndry",
        points: [
            {x:225,y:7},
            {x:225,y:131},
            {x:333,y:131},
            {x:333,y:7},
        ],
        plan_id: '1',
    }
]

const devicesExists = [
    {
        id: 1,
        name:"Sonoff Dual R2",
        points: [
            {x:140,y:30},
        ],
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
        mark: 'R1',
        plan_id: '1',
        zone_id: "",
    },
]

const devicesFromServer = [
    {
        label: 'Sonoff Dual R2',
        key: '1',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
        self_type: "device",
        title: 'Sonoff Dual R2',
    },
    {
        label: 'Sonoff CHH4',
        key: '2',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
        self_type: "device",
        title: 'Sonoff CHH4',
    },
    {
        label: 'Tuya SW2',
        key: '3',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
        self_type: "device",
        title: 'Tuya SW2',
    },
]
const ToolBar = observer( () => {
    const [current, setCurrent] = useState('');

    useEffect(()=>{
        console.log(toolState.tool)
        if (!toolState.tool){
            setCurrent('')
        }
    }, [toolState?.tool])

    useEffect(() => {
        if (canvasStateForLoad.canvas){
            loadAreas()
        }
    }, [canvasStateForLoad?.canvas])

    function loadAreas(){
        canvasStateForLoad.drawAreas(areas)
    }

    const addRectArea = () => {
        toolState.setTool(new Rect(canvasStateForDraw.canvas))
        canvasStateForDraw.setActive(true)
        canvasStateForLoad.setActive(false)
    }

    const addFreeArea = () => {
        toolState.setTool(new Line(canvasStateForDraw.canvas))
        canvasStateForDraw.setActive(true)
        canvasStateForLoad.setActive(false)
    }

    const moveRectArea = () => {
        toolState.setTool(null)
        canvasStateForLoad.setEdit(true)
        canvasStateForDraw.setActive(false)
    }

    const tryToSave = () => {
        canvasStateForLoad.areas.forEach(item => {
            console.log(item.name, item.points)
            console.log(item.plan_id)
        })
    }

    const addDevice = (device)=>{
        if (!deviceState.device){
            deviceState.setDevice(new Device(canvasStateForDraw.canvas, device))
            message.success(`${device.name} успешно добавлен. В правом верхнем углу плана Вы можете переместить его в нужную область.`, 5).then()
        } else
        {
            message.error(`Вы не можете добавлять новые устройства, пока не закрепите ${deviceState.device.name} на определенной области.`, 7).then()
        }
    }

    const handleMenuClick = (e) => {
        if (e?.item?.props?.self_type === 'device') {
            if (e.keyPath.includes('adddevice')){
                const device = {name: e.item.props.title, imgURL: e.item.props.imgURL}
                addDevice(device)
            }
        }
        switch(e.key) {
            case 'load':
                loadAreas()
                setCurrent('')
                break
            case 'edit':
                message.info("Выберете инструмент").then(()=>{})
                break
            case 'addrect':
                addRectArea()
                setCurrent(e.key)
                break
            case 'addfree':
                addFreeArea()
                setCurrent(e.key)
                break
            case 'move':
                moveRectArea()
                setCurrent(e.key)
                break
            case 'delete':
                canvasStateForLoad.setDelete(true)
                setCurrent(e.key)
                break
            case 'save':
                tryToSave()
                setCurrent('')
                break
            default:
                break
        }
    };

    const items = [
        // {
        //     label: 'Загрузить области для данного плана',
        //     key: 'load',
        //     icon: <DownloadOutlined />,
        // },
        {
            label: 'Редактировать план',
            key: 'edit',
            icon: <ToolOutlined />,
            children: [
                {
                    label: 'Добавить квадратную область',
                    key: 'addrect',
                    icon: <PlusSquareOutlined />,
                },
                {
                    label: 'Добавить произвольную область',
                    key: 'addfree',
                    icon: <EditOutlined/>,
                },
                {
                    label: 'Переместить область',
                    key: 'move',
                    icon: <ExpandOutlined/>,
                },
                {
                    label: 'Удалить область',
                    key: 'delete',
                    icon: <MinusSquareOutlined />,
                },
            ]
        },
        {
            label: 'Сохранить план',
            key: 'save',
            icon: <SaveOutlined />,
        },
        {
            label: 'Устройства',
            key: 'devices',
            icon: <RadarChartOutlined />,
            children: [
                {
                    label: 'Добавить устройство',
                    key: 'adddevice',
                    icon: <PlusSquareOutlined />,
                    children: [
                        ...devicesFromServer
                    ]
                },
                {
                    label: 'Переместить устройство',
                    key: 'movedevice',
                    icon: <ExpandOutlined/>,
                },
                {
                    label: 'Удалить устройство',
                    key: 'deletedevice',
                    icon: <MinusSquareOutlined />,
                },
                {
                    label: 'Размер иконок',
                    key: 'iconsize',
                    icon: <ArrowsAltOutlined />,
                    children: [
                        {
                            label: <Slider defaultValue={30} onChange={onChangeSlider} />,
                            key: 'slider',
                        },
                    ]
                },
            ]
        }
    ];

    function onChangeSlider (value) {
        if (deviceState.device){
            deviceState.device.size += value - deviceState.device.size
            deviceState.device.redraw()
        }
        if (canvasStateForLoad.devices.length > 0){
            canvasStateForLoad.devices.forEach((device) => {
                device.size += value - device.size
            })
            canvasStateForLoad.reload()
        }
    }

    return (
            <Menu mode="horizontal" selectedKeys={[current]} items={items} onClick={handleMenuClick}/>
    );
});

export default ToolBar;