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
        name:"Lndry",
        points: [
            {x:225,y:7},
            {x:225,y:131},
            {x:333,y:131},
            {x:333,y:7},
        ],
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

    const editRectArea = () => {
        canvasStateForLoad.setEdit(true)
        canvasStateForDraw.setActive(false)
    }

    const tryToSave = () => {
        if (1) {

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
        </div>
    );
};

export default ToolBar;