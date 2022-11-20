import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";
import {areaStyle} from "../tools/ToolStyle/AreaStyle";
import DeleteAreaModal from "../pages/plan/DeleteAreaModal";

export const CanvasBox = observer((props) => {
    const {imageUrl} = props
    const canvasForLoadRef = useRef()
    const canvasForDrawRef = useRef()
    const [imageDimensions, setImageDimensions] = useState({});
    const [isDragging, setIsDragging] = useState(false)
    const [cursorDragPoint, setCursorDragPoint] = useState({x: 0, y: 0})
    const [deleteModal, setDeleteModal] = useState(false);
    useEffect(()=>{
        loadImage(setImageDimensions, imageUrl);
        canvasStateForLoad.setCanvas(canvasForLoadRef.current)
        canvasStateForDraw.setCanvas(canvasForDrawRef.current)
    }, [canvasForLoadRef, imageUrl])

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
        const itemTop = item.y
        const itemRight = item.x + item.width
        const itemBottom = item.y + item.height
        const itemLeft = item.x
        if (x > itemLeft && x < itemRight && y > itemTop && y < itemBottom){
            return true
        } else {
            return false
        }
    }

    function getCursorPosition (event) {
        const rect = canvasStateForLoad.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return {x: x, y: y}
    }

    function takeObjectInCanvas(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const {x, y} = getCursorPosition(event)
        const areas = canvasStateForLoad.areas
        areas.forEach((item) => {
            if (isOnArea(x, y, item)) {
                setIsDragging(true)
                setCursorDragPoint({x:x, y:y})
                canvasStateForLoad.setCurrentItem(item)
                return
            }
            else {
                setIsDragging(false)
            }
        })
    }


    const deleteArea = () => {
        canvasStateForLoad.unHoverItemDelete()
        const index = canvasStateForLoad.areas.indexOf(canvasStateForLoad.current_item)
        canvasStateForLoad.clearArea(index)
    }

    const mouseDownHandler = (e) =>{
        if (canvasStateForLoad.edit){
            takeObjectInCanvas(canvasForLoadRef.current, e)
        }
        else if (canvasStateForLoad.delete) {
            setDeleteModal(true)
        }
        else {
            canvasStateForDraw.pushToUndo(canvasForDrawRef.current?.toDataURL())
        }

    }

    const mouseUpHandler = (e) => {
        if (!isDragging){
            return
        } else {
            canvasStateForLoad.clearLastPosition()
        }
        setIsDragging(false)
    }

    const mouseMoveHandler = (e) => {
        const {x, y} = getCursorPosition(e)
        if (!canvasStateForDraw.isActive){
            if (!isDragging) {
                if (canvasStateForLoad.delete) {
                    let {x, y} = getCursorPosition(e);
                    canvasStateForLoad.areas.forEach((item) => {
                        if (isOnArea(x, y, item)) {
                            canvasStateForLoad.setCurrentItem(item)
                            canvasStateForLoad.hoverItemDelete()
                            return
                        } else {
                            canvasStateForLoad.unHoverItemDelete()
                        }
                    })
                }
            } else if (canvasStateForLoad.edit) {
                let dx = x - cursorDragPoint.x;
                let dy = y - cursorDragPoint.y;
                canvasStateForLoad.dragRect(dx, dy)
                cursorDragPoint.x = x
                cursorDragPoint.y = y
            }
        }


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
            <DeleteAreaModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteArea={deleteArea} />
        </>
    )
});