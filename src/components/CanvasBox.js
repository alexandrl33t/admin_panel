import React, {useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";


export const CanvasBox = observer((props) => {

    const {imageUrl, width, height} = props
    const canvasRef = useRef()

    useEffect(()=>{
        canvasState.setCanvas(canvasRef.current)
    }, [])

    const mouseDownHandler = () =>{
        canvasState.pushToUndo(canvasRef.current.toDataUrl())
    }

    return (
        <>
        <div className="image_inside_canvas">
           <img src={imageUrl}/>
        </div>
        <div className="canvas">
            <canvas onMouseDown={()=> mouseDownHandler()} ref={canvasRef} width={1000} height={800}/>
        </div>
        </>
    )
});