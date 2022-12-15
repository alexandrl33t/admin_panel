import React, {useEffect, useState} from 'react';
import {Menu, message} from "antd";
import {
    DownloadOutlined, EditOutlined,
    ExpandOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined, RadarChartOutlined,
    SaveOutlined, ToolOutlined,
} from "@ant-design/icons";
import toolState from "../store/toolState";
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";
import {observer} from "mobx-react-lite";

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
        imgURL : "",
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
        imgURL : "",
    }
]

let devicesExists = [
    {
        id: 1,
        name:"Sonoff Dual R2",
        points: [
            {x:100,y:8},
            {x:225,y:8},
            {x:225,y:188},
            {x:100,y:188},
        ],
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
        mark: 'R1',
        plan_id: 'someID',
        zone_id: "",
        self_type: "device",
    },
]

let devicesFromServer = [
    {
        label: 'Sonoff Dual R2',
        key: '1',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
    },
    {
        label: 'Sonoff CHH4',
        key: '2',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
    },
    {
        label: 'Tuya SW2',
        key: '3',
        icon: <RadarChartOutlined />,
        imgURL : "https://www.svgrepo.com/show/430077/security-secure-protection-25.svg",
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
        canvasStateForLoad.drawObjects(areas)
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
        })
    }

    const handleMenuClick = (e) => {
        if (e?.item?.props?.self_type === 'device') {

        }
        switch(e.key) {
            case 'load':
                loadAreas()
                setCurrent('')
                break
            case 'edit':
                message.info("Выберете инструмент")
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
                        {
                            label: 'Sonoff Dual R2',
                            key: '1',
                            icon: <RadarChartOutlined />,
                        },
                        {
                            label: 'Sonoff CHH4',
                            key: '2',
                            icon: <RadarChartOutlined />,
                        },
                        {
                            label: 'Tuya SW2',
                            key: '3',
                            icon: <RadarChartOutlined />,
                        },
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
            ]
        }
    ];

    return (
            <Menu mode="horizontal" selectedKeys={[current]} items={items} onClick={handleMenuClick}/>
    );
});

export default ToolBar;