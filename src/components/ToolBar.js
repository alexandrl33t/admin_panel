import React, {useState} from 'react';
import {Menu, message} from "antd";
import {
    DownloadOutlined, EditOutlined,
    ExpandOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    SaveOutlined, ToolOutlined,
} from "@ant-design/icons";
import toolState from "../store/toolState";
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";

let areas = [
    {
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
const ToolBar = () => {
    const [current, setCurrent] = useState('');

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
        {
            label: 'Загрузить области для данного плана',
            key: 'load',
            icon: <DownloadOutlined />,
        },
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
    ];

    return (
            <Menu mode="horizontal" selectedKeys={[current]} items={items} onClick={handleMenuClick}/>
    );
};

export default ToolBar;