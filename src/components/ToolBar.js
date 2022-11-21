import React from 'react';
import {Button, Tooltip} from "antd";
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
import {areaStyle} from "../tools/ToolStyle/AreaStyle";

const buttonStyle = {
    marginLeft: 10,
}
const areas = [{
    name:"Bathroom",
    x: 100,
    y:8,
    width:125,
    height:180,
}]
const ToolBar = () => {

    const saveHandle = () => {
        const area = toolState.tool.area;
        // const json = JSON.stringify(canvasContents);
        console.log(area)
    }

    function loadAreas(){
        const canvas = canvasStateForLoad.canvas
        const ctx = canvasStateForLoad.canvas.getContext('2d')
        areas.map((item)=>{
            ctx.strokeStyle = areaStyle.ctx.strokeStyle;
            ctx.fillStyle = areaStyle.ctx.fillStyle;
            ctx.lineWidth = areaStyle.ctx.lineWidth;
            ctx.beginPath();
            const {name, x, y, width, height} = item;
            ctx.rect(x,y,width,height);
            ctx.fillRect(x,y,width,height);
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,0.96)";
            ctx.font = 'bold 15px sans-serif';
            ctx.fillText(name, x+15, y+25);
            ctx.save()
            canvasStateForLoad.setAreas(item)
        })
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
            <Tooltip placement="topLeft" title="Редактировать область">
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
                    onClick={saveHandle}
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