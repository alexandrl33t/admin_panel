import React, {useState} from 'react';
import {Button, Dropdown, Menu, message, Space, Tooltip} from "antd";
import {
    AlertOutlined,
    DownloadOutlined, DownOutlined, EditOutlined,
    EnterOutlined, ExpandOutlined,
    LineOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    SaveOutlined, UserOutlined
} from "@ant-design/icons";
import toolState from "../store/toolState";
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";
import ConfirmAreaModal from "../pages/plan/ConfirmAreaModal";

const buttonStyle = {
    marginLeft: 10,
}
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
    /**
     <Tooltip placement="topLeft" title="Добавить квадратную область">
     <Button
     icon={<PlusSquareOutlined />}
     style={buttonStyle}
     onClick={addRectArea}>
     </Button>
     </Tooltip>
     <Tooltip placement="topLeft" title="Добавить произвольную область">
     <Button
     icon={<EditOutlined/>}
     style={buttonStyle}
     onClick={addFreeArea}>
     </Button>
     </Tooltip>
     <Tooltip placement="topLeft" title="Переместить область">
     <Button
     icon={<ExpandOutlined />}
     style={buttonStyle}
     onClick={moveRectArea}
     ></Button>
     </Tooltip>
     <Tooltip placement="topLeft" title="Удалить область">
     <Button
     icon={<MinusSquareOutlined />}
     style={buttonStyle}
     onClick={() => canvasStateForLoad.setDelete(true)}
     >
     </Button>
     </Tooltip>
     <Tooltip placement="topLeft" title="Сохранить план">
     <Button
     icon={<SaveOutlined />}
     style={buttonStyle}
     onClick={tryToSave}
     >
     </Button>
     </Tooltip>
     <Tooltip placement="topLeft" title="Загрузить области для данного плана">
     <Button
     icon={<AlertOutlined />}
     style={buttonStyle}
     onClick={() => console.log(1)}
     >
     Добавить устройство
     </Button>
     </Tooltip>
     <Tooltip placement="topLeft" title="Загрузить области для данного плана">
     <Button
     icon={<DownloadOutlined />}
     style={buttonStyle}
     onClick={loadAreas}
     >
     Загрузить области для данного плана
     </Button>
     </Tooltip>
     */
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const items = [
        {
            label: 'Редактировать план',
            key: 'edit',
            icon: <EditOutlined />,
            children: [
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
                {
                    label: '3rd menu item',
                    key: '3',
                    icon: <UserOutlined />,
                },
            ]
        },
        {
            label: 'Загрузить области для данного плана',
            key: 'load',
            icon: <DownloadOutlined />,
        },
    ];

    return (
            <Menu mode="horizontal" items={items}/>
    );
};

export default ToolBar;