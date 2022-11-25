import React, {useState} from 'react';
import {Button, message, Tooltip} from "antd";
import {
    DownloadOutlined, EditOutlined,
    EnterOutlined, ExpandOutlined,
    LineOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    SaveOutlined
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
    },
    {
    name:"Guest",
    points: [
        {x:100,y:189},
        {x:800,y:189},
        {x:800,y:400},
        {x:100,y:400},
    ],
    },
]
const ToolBar = () => {
    const [confirmModal, setConfirmModal]= useState(false)

    const saveHandle = (name) => {
        canvasStateForDraw.current_item.name = name
        areas.push(canvasStateForDraw.current_item)
        canvasStateForDraw.reload()
        canvasStateForLoad.drawObjects(areas)
    }

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

    const editRectArea = () => {
        canvasStateForLoad.setEdit(true)
        canvasStateForDraw.setActive(false)
    }

    const tryToSave = () => {
        if (canvasStateForDraw.current_item.points.length > 2) {
            setConfirmModal(true)
        } else {
            message.error("Ошибка. Область не нарисована.")
        }
    }

    return (
        <div className="toolbar">
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
                    onClick={editRectArea}
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
            <Tooltip placement="topLeft" title="Отменить действие">
                <Button
                    icon={<EnterOutlined />}
                    style={buttonStyle}
                    onClick={() => canvasStateForDraw.undo()}
                    >
                </Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="Сохранить область">
                <Button
                    icon={<SaveOutlined />}
                    style={buttonStyle}
                    onClick={tryToSave}
                >
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
            <ConfirmAreaModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} saveArea={saveHandle}/>
        </div>
    );
};

export default ToolBar;