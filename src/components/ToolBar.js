import React, {useEffect, useState} from 'react';
import {Menu, message, Slider} from "antd";
import {
    ArrowsAltOutlined,
    EditOutlined,
    HeatMapOutlined,
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
import ReleState from "../store/ReleState";
import {imgDimensions} from "./CanvasBox";
import Dependence from "../tools/Dependence";
import ReleStore from "../store/ReleStore";

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
        imgURL : "https://www.svgrepo.com/show/15416/antenna.svg",
        mark: 'R1',
        plan_id: '1',
        zone_id: "",
    },
]

const devicesFromServer = [
    {
        label: 'Sonoff Dual R2',
        key: 'device1',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/15416/antenna.svg",
        title: 'Sonoff Dual R2',
    },
    {
        label: 'Sonoff CHH4',
        key: 'device2',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/15416/antenna.svg",
        title: 'Sonoff CHH4',
    },
    {
        label: 'Tuya SW2',
        key: 'device3',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/15416/antenna.svg",
        title: 'Tuya SW2',
    },
]

const dependencesFromServer = [
    {
        label: 'Зависимость 1',
        key: 'dependence1',
        icon: <HeatMapOutlined />,
        imgURL : "https://www.svgrepo.com/show/6947/webcam.svg",
        title: 'Зависимость 1',
    },
    {
        label: 'Зависимость 2',
        key: 'dependence2',
        icon: <HeatMapOutlined />,
        imgURL : "https://www.svgrepo.com/show/6947/webcam.svg",
        title: 'Зависимость 2',
    },
    {
        label: 'Зависимость 3',
        key: 'dependence3',
        icon: <HeatMapOutlined />,
        imgURL : "https://www.svgrepo.com/show/6947/webcam.svg",
        title: 'Зависимость 3',
    },
]
const ToolBar = observer( () => {
    const [current, setCurrent] = useState('');

    useEffect(()=>{
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

    const tryToSave = () => {
        canvasStateForLoad.areas.forEach(item => {
            console.log(item.name, item.points)
            console.log(item.plan_id)
        })
    }

    const addDevice = (device)=>{
        if (!ReleState.new_device){
            ReleState.setDevice(new Device(canvasStateForDraw.canvas, device))
            message.success(`${device.name} успешно добавлен. В правом верхнем углу плана Вы можете переместить его в нужную область.`, 5).then()
        } else
        {
            message.error(`Вы не можете добавлять новые реле, пока не закрепите ${ReleState.new_device.name} на определенной области.`, 7).then()
        }
    }

    const addDependence = (dependence) => {
        if (!ReleState.new_device){
            ReleState.setDevice(new Dependence(canvasStateForDraw.canvas, dependence))
            message.success(`${dependence.name} успешно добавлен. В правом верхнем углу плана Вы можете переместить его в нужную область.`, 5).then(
                message.info('Наведитесь на реле, к которму вы хотите подключить зависимость.', 5)
            )
        } else
        {
            message.error(`Вы не можете добавлять новые реле, пока не закрепите ${ReleState.new_device.name} на определенной области.`, 7).then()
        }
    }


    const handleMenuClick = (e) => {

        if (e.keyPath.includes('adddevice')){
            const device = {name: e.item.props.title, imgURL: e.item.props.imgURL}
            addDevice(device)
            setCurrent(e.key)
        } else if (e.keyPath.includes('movedevice')){
            setCurrent(e.key)
        }
        else if (e.keyPath.includes('adddependence')){
            if (ReleStore.reles.length === 0) {
                message.error(`Вы не можете добавлять новые реле, пока на определенной области.`, 7).then()
            } else {
                const dependence = {name: e.item.props.title, imgURL: e.item.props.imgURL}
                addDependence(dependence)
                setCurrent(e.key)
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
                // {
                //     label: 'Переместить область',
                //     key: 'move',
                //     icon: <ExpandOutlined/>,
                // },
                {
                    label: 'Удалить область',
                    key: 'delete',
                    icon: <MinusSquareOutlined />,
                },
                {
                    label: <>Масштаб плана</>,
                    key: "changeSize",
                    icon: <ArrowsAltOutlined />,
                    children: [
                        {
                            label: <Slider defaultValue={1} max={2} min={0.5} step={0.005} onChange={changePlanSize}/>,
                            key: 'sliderPlanSize',
                        },
                    ],
                }
            ]
        },
        {
            label: 'Сохранить план',
            key: 'save',
            icon: <SaveOutlined />,
        },
        {
            label: 'Реле',
            key: 'devices',
            icon: <RadarChartOutlined />,
            children: [
                {
                    label: 'Добавить реле',
                    key: 'adddevice',
                    icon: <PlusSquareOutlined />,
                    children: [
                        ...devicesFromServer
                    ]
                },
            ]
        },
        {
            label: 'Зависимости',
            key: 'dependences',
            icon: <HeatMapOutlined />,
            children: [
                {
                    label: 'Добавить зависимость',
                    key: 'adddependence',
                    icon: <PlusSquareOutlined />,
                    children: [
                        ...dependencesFromServer
                    ]
                },
            ]
        },
        // {
        //     label: 'Размер иконок',
        //     key: 'iconsize',
        //     icon: <ArrowsAltOutlined />,
        //     children: [
        //         {
        //             label: <Slider defaultValue={30} onChange={changeDeviceIconSize} />,
        //             key: 'slider',
        //         },
        //     ]
        // },
    ];

    function changeDeviceIconSize (value) {
        if (canvasStateForLoad.devices) {
            if (canvasStateForLoad.devices.length > 0){
                canvasStateForLoad.devices.forEach((device) => {
                    device.size += value - device.size
                })
                canvasStateForLoad.reload()
            }
        }

    }

    function changePlanSize(value) {
        imgDimensions.setDemensions(canvasStateForLoad.original_size.width * value, canvasStateForLoad.original_size.height * value)
        imgDimensions.setSizeK(value)
    }

    return (
        <>
            <Menu mode="horizontal" selectedKeys={[current]} items={items} onClick={handleMenuClick}/>
        </>

    );
});

export default ToolBar;