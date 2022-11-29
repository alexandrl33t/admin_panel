import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";
import DeleteAreaModal from "../pages/plan/DeleteAreaModal";
import toolState from "../store/toolState";
import ConfirmAreaModal from "../pages/plan/ConfirmAreaModal";
export const CanvasBox = observer((props) => {
    const {imageUrl} = props
    const canvasForLoadRef = useRef()
    const canvasForDrawRef = useRef()
    const [imageDimensions, setImageDimensions] = useState({});
    const [isDragging, setIsDragging] = useState(false)
    const [cursorDragPoint, setCursorDragPoint] = useState({x: 0, y: 0})
    const [deleteModal, setDeleteModal] = useState(false);
    const [confirmModal, setConfirmModal]= useState(false)

    useEffect(()=>{
        loadImage(setImageDimensions, imageUrl);
        canvasStateForLoad.setCanvas(canvasForLoadRef.current)
        canvasStateForDraw.setCanvas(canvasForDrawRef.current)
    }, [canvasForLoadRef, imageUrl])

    useEffect(()=>{
        if (canvasStateForDraw.closed_area){
            setConfirmModal(true)
        }
    }, [canvasStateForDraw.closed_area])

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

    const isOnArea = (x, y, item) => {
        if (item.points.length > 1){
            for (let i=0; i<item.points.length-1;i++){
                const x1 = item.points[i].x
                const x2 = item.points[item.points.length-1-i].x
                const x3 = item.points[i+1].x
                const y1 = item.points[i].y
                const y2 = item.points[item.points.length-1-i].y
                const y3 = item.points[i+1].y
                const a = (x1 - x) * (y2 - y1) - (x2 - x1) * (y1 - y)
                const b = (x2 - x) * (y3 - y2) - (x3 - x2) * (y2 - y)
                const c = (x3 - x) * (y1 - y3) - (x1 - x3) * (y3 - y)
                if ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)){
                    return true
                }
            }
        }
        return false
    }

    function getCursorPosition (event) {
        const rect = canvasStateForLoad.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return {x: x, y: y}
    }

    function takeObjectInCanvas(canvas, event) {
        const {x, y} = getCursorPosition(event)
        for (let i =0; i < canvasStateForLoad.areas.length; i++) {
            if (isOnArea(x, y, canvasStateForLoad.areas[i])) {
                canvasStateForDraw.setCurrentItem(canvasStateForLoad.areas[i])
                canvasStateForLoad.setEditableItem(canvasStateForLoad.areas[i])
                setIsDragging(true)
                setCursorDragPoint({x:x, y:y})
                return false
            }
            else {
                setIsDragging(false)
            }
        }
    }

    function deleteObjectInCanvas(){
        canvasStateForLoad.deleteArea()
    }

    const mouseDownHandler = (e) =>{
        if (canvasStateForLoad.move){
            takeObjectInCanvas(canvasForLoadRef.current, e)
        }
        else if (canvasStateForLoad.delete) {
            setDeleteModal(true)
        }
        else if (toolState.tool){
            canvasStateForDraw.pushToUndo(canvasForDrawRef.current?.toDataURL())
        }

    }

    const mouseUpHandler = (e) => {
        if (!isDragging){
            return
        }
        //если мышка отпустила объект во время перетаскивания
        else if (canvasStateForLoad.move && isDragging) {
                canvasStateForLoad.reload()
                canvasStateForDraw.reload()
                setIsDragging(false)
            }
    }

    const mouseMoveHandler = (e) => {
        const {x, y} = getCursorPosition(e)

        if (!canvasStateForDraw.isActive){
            if (!isDragging) {
                if (canvasStateForLoad.delete) {
                    let {x, y} = getCursorPosition(e);
                    for (let i =0; i < canvasStateForLoad.areas.length; i++)  {
                        if (isOnArea(x, y, canvasStateForLoad.areas[i])) {
                            canvasStateForLoad.setDeleteItem(canvasStateForLoad.areas[i])
                            return
                        } else {
                            canvasStateForLoad.setDeleteItem(null)
                        }
                    }
                }
            } else if (canvasStateForLoad.move && isDragging) {
                if (!canvasStateForLoad.filled_background){
                    canvasStateForLoad.isDragging()
                }
                let dx = x - cursorDragPoint.x;
                let dy = y - cursorDragPoint.y;
                canvasStateForDraw.dragArea(dx, dy)
                cursorDragPoint.x = x
                cursorDragPoint.y = y
            }
        }


    }

    const saveHandle = (name) => {
        canvasStateForDraw.current_item.name = name
        console.log(canvasStateForDraw.current_item)
        canvasStateForLoad.areas.push(canvasStateForDraw.current_item)
        canvasStateForLoad.reload()
        canvasStateForDraw.reload()
        toolState.tool = null
    }

    return (
        <>
        <div style={{marginTop:10}}>
        <div className="image_inside_canvas">
           <img src={imageUrl} alt=""/>
        </div>
                <canvas
                    className="canvas"
                    style={{
                        position:"absolute",
                        width:imageDimensions.width,
                        height:imageDimensions.height,
                        border: "hidden",
                }}
                    ref={canvasForLoadRef}
                    width={imageDimensions.width}
                    height={imageDimensions.height}/>
                <canvas
                    className="canvas"
                    style={{position:"relative"}}
                    onMouseDown={mouseDownHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseMove={mouseMoveHandler}
                    ref={canvasForDrawRef}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                />
        </div>
            <DeleteAreaModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteArea={deleteObjectInCanvas} item={canvasStateForLoad.delete_item} />
            <ConfirmAreaModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} saveArea={saveHandle}/>
        </>
    )
});