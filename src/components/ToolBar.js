import React from 'react';
import {Button, Tooltip} from "antd";
import {
    EnterOutlined,
    ExpandOutlined,
    LineOutlined,
    MinusSquareOutlined,
    PlusSquareOutlined,
    SaveOutlined
} from "@ant-design/icons";
import toolState from "../store/toolState";
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import canvasState from "../store/canvasState";

const buttonStyle = {
    marginLeft: 10,
}

const saveHandle = () => {
    /**
     * В будущем в json должны храниться данные канвас и название области
     */
    const canvasContents = canvasState.canvas.toDataURL();
    const json = JSON.stringify(canvasContents);
    console.log(json)
}

const ToolBar = () => {
    return (
        <div className="toolbar">
            <Tooltip placement="topLeft" title="Добавить свободную область">
                <Button
                    icon={<LineOutlined />}
                    style={buttonStyle}
                    onClick={()=> toolState.setTool(new Line(canvasState.canvas))}
            ></Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="Добавить квадратную область">
                <Button
                    icon={<PlusSquareOutlined />}
                    style={buttonStyle}
                    onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}>
                </Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="Удалить область">
                <Button
                    icon={<MinusSquareOutlined />}
                    style={buttonStyle}>
                </Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="Отменить действие">
                <Button
                    icon={<EnterOutlined />}
                    style={buttonStyle}
                    onClick={() => canvasState.undo()}
                    >
                </Button>
            </Tooltip>
            <Tooltip placement="topLeft" title="СОхранить область">
                <Button
                    icon={<SaveOutlined />}
                    style={buttonStyle}
                    onClick={saveHandle}
                >
                </Button>
            </Tooltip>
        </div>
    );
};

export default ToolBar;