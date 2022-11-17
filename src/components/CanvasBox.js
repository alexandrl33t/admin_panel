import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Rect from "../tools/Rect";

const loadImage = (setImageDimensions, imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        setImageDimensions({
            height: img.height,
            width: img.width
        });
    };
    img.onerror = (err) => {
        console.log("img error");
        console.error(err);
    };
};

function getObjectInCanvas(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

export const CanvasBox = observer((props) => {

    const {imageUrl} = props
    const canvasRef = useRef()
    const [imageDimensions, setImageDimensions] = useState({});
    let areas = [{
        name:"",
        x: 40,
        y:13,
        width:589,
        height:180,
    }]

    useEffect(()=>{
        loadImage(setImageDimensions, imageUrl);
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Rect(canvasRef.current))
        // toolState.tool.
    }, [])

    const mouseDownHandler = (e) =>{
        getObjectInCanvas(canvasRef.current, e)
        canvasState.pushToUndo(canvasRef.current?.toDataURL())
    }

    return (
        <div>
        <div className="image_inside_canvas">
           <img src={imageUrl}/>
        </div>
        <div className="canvas">
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={imageDimensions.width} height={imageDimensions.height}/>
        </div>
        </div>
    )
});