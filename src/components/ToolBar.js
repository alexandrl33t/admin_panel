import React from 'react';
import {Button, Tooltip} from "antd";
import {EnterOutlined, ExpandOutlined, LineOutlined, MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import toolState from "../store/toolState";
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import canvasState from "../store/canvasState";

const buttonStyle = {
    marginLeft: 10,
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
            <Tooltip placement="topLeft" title="Выделить область">
                <Button
                    icon={<ExpandOutlined />}
                    style={buttonStyle}>
                </Button>
            </Tooltip>
        </div>
    );
};

export default ToolBar;