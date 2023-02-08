import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";
import DeleteAreaModal from "../pages/plan/DeleteAreaModal";
import toolState from "../store/toolState";
import ConfirmAreaModal from "../pages/plan/ConfirmAreaModal";
import deviceState from "../store/deviceState";
import ConfirmDeviceModal from "../pages/plan/ConfirmDeviceModal";
import {Button, Col, Divider, Form, Input, Row, Slider, Tooltip} from "antd";
import {observable} from "mobx";
import dependencesStore from "../store/DependencesStore";
import devicesStore from "../store/DevicesStore";
import ConfirmDependenceModal from "../pages/plan/ConfirmDependenceModal";


export const imgDimensions = observable(
    {
        width: 600,
        height: 800,
        size_k: 1,
        setDemensions(width, height) {
            this.width = width
            this.height = height
        },

        setSizeK(value){
            this.size_k = value
        },

        getWidth(){
            return this.width
        },
        getHeight(){
            return this.height
        },
    }
    );
export const CanvasBox = observer((props) => {
    const [form] = Form.useForm();
    const {plan} = props;
    const canvasForLoadRef = useRef();
    const canvasForDrawRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [cursorDragPoint, setCursorDragPoint] = useState({x: 0, y: 0});
    const [deleteModal, setDeleteModal] = useState(false);
    const [confirmModal, setConfirmModal]= useState(false);
    const [confirmDeviceModal, setConfirmDeviceModal] = useState(false);
    const [confirmDependenceModal, setConfirmDependenceModal] = useState(false)
    const [deviceEdit, setDeviceEdit] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0})

    useEffect(()=>{
        loadImage(plan.url);
        canvasStateForLoad.addPlanIDForAreas(plan.id)
        canvasStateForLoad.setPlanId(plan.id)
        canvasStateForLoad.setCanvas(canvasForLoadRef.current)
        canvasStateForDraw.setCanvas(canvasForDrawRef.current)
    }, [canvasForLoadRef, plan.url])

    useEffect(()=>{
        if (canvasStateForDraw.closed_area){
            setConfirmModal(true)
        }
    }, [canvasStateForDraw.closed_area])

    useEffect(()=>{
        if (deviceState.is_on_area){
            if (deviceState.new_device.type === "device"){
                setConfirmDeviceModal(true)
            } else if (deviceState.new_device.type === "dependence"){
                setConfirmDependenceModal(true)
            }

        }
    }, [deviceState.is_on_area])

    useEffect(()=>{
        canvasStateForLoad.reload()
    }, [imgDimensions.size_k])

    const loadImage = (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imgDimensions.setDemensions(
                img.width,
                img.height,
            );
            canvasStateForLoad.original_size.width = img.width
            canvasStateForLoad.original_size.height = img.height
            canvasStateForDraw.original_size.width = img.width
            canvasStateForDraw.original_size.height = img.height
        };
        img.onerror = (err) => {
            console.log("img error");
            console.error(err);
        };
    };

    const isOnArea = (x, y, item) => {
        if (item.points.length > 1){
            for (let i=0; i<item.points.length-1;i++){
                const x1 = item.points[i].x * imgDimensions.size_k
                const x2 = item.points[item.points.length-1-i].x* imgDimensions.size_k
                const x3 = item.points[i+1].x* imgDimensions.size_k
                const y1 = item.points[i].y* imgDimensions.size_k
                const y2 = item.points[item.points.length-1-i].y* imgDimensions.size_k
                const y3 = item.points[i+1].y* imgDimensions.size_k
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

    const isOnDevice = (x, y, item) => {
        if (item?.points){
            if (x >= item.points.x * imgDimensions.size_k
                && y >= item.points.y * imgDimensions.size_k
                && x<= (item.points.x + item.size) * imgDimensions.size_k
                && y <=(item.points.y + item.size) * imgDimensions.size_k)
            return true
        }
        return false
    }

    function getCursorPosition (event) {
        const rect = canvasStateForLoad.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setCursorPosition({x:x, y:y})
    }

    function takeObjectInCanvas() {
        for (let i =0; i < canvasStateForLoad.areas.length; i++) {
            if (isOnArea(cursorPosition.x, cursorPosition.y, canvasStateForLoad.areas[i])) {
                canvasStateForDraw.setCurrentItem(canvasStateForLoad.areas[i])
                canvasStateForLoad.setEditableItem(canvasStateForLoad.areas[i])
                setIsDragging(true)
                setCursorDragPoint({x:cursorPosition.x, y:cursorPosition.y})
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

    const mouseDownHandler = () =>{
        if (deviceState.new_device || toolState.tool) {
            return;
        }
        if (canvasStateForLoad.move){
            takeObjectInCanvas()
        }
        else if (canvasStateForLoad.delete) {
            setDeleteModal(true)
        }
        else if (deviceState.selected_device){
            form.setFieldValue("nameInput", deviceState.selected_device.name)
            form.setFieldValue("iconSize", deviceState.selected_device.size)
            setDeviceEdit(!deviceEdit)
        }

    }

    const mouseUpHandler = () => {
        if (deviceState.new_device || toolState.tool) {
            return;
        }
        if (!isDragging){

        }
        //если мышка отпустила объект во время перетаскивания
        else if (canvasStateForLoad.move && isDragging) {
                canvasStateForLoad.move =false
                canvasStateForLoad.reload()
                canvasStateForDraw.reload()
                setIsDragging(false)
            }
    }

    const mouseMoveHandler = (e) => {
        getCursorPosition(e)
        if (deviceState.new_device || toolState.tool) {
            canvasStateForLoad.setActive(false)
            return;
        }

        if (!canvasStateForDraw.isActive){
            if (!isDragging) {
                    for (let i =0; i < canvasStateForLoad.areas.length; i++)  {
                        if (isOnArea(cursorPosition.x, cursorPosition.y, canvasStateForLoad.areas[i])) {
                            if (canvasStateForLoad.delete){
                                canvasStateForDraw.reload()
                                canvasStateForLoad.setDeleteItem(canvasStateForLoad.areas[i])
                                canvasStateForDraw.drawAreaDelete(canvasStateForLoad.areas[i])
                                if (!canvasStateForLoad.filled_background){
                                    canvasStateForLoad.isDragging()
                                }
                                return
                            }
                            else if (canvasStateForLoad.move){

                                canvasStateForDraw.reload()
                                canvasStateForDraw.fillAreaForDrag(canvasStateForLoad.areas[i])
                                return;
                            } else {

                                canvasStateForDraw.reload()
                                canvasStateForDraw.hoverArea(canvasStateForLoad.areas[i])
                                for (let i =0; i < devicesStore.devices.length; i++){
                                    if (isOnDevice(cursorPosition.x, cursorPosition.y, devicesStore.devices[i])){
                                        canvasStateForDraw.hoverDevice(devicesStore.devices[i])
                                        deviceState.setSelectedDevice(devicesStore.devices[i])
                                        return;
                                    } else {
                                        for (let i =0; i < dependencesStore.dependences.length; i++){
                                            if (isOnDevice(cursorPosition.x, cursorPosition.y, dependencesStore.dependences[i])){
                                                canvasStateForDraw.hoverDevice(dependencesStore.dependences[i])
                                                deviceState.setSelectedDevice(dependencesStore.dependences[i])
                                                return;
                                            }
                                            else {
                                                deviceState.setSelectedDevice(null)
                                                return;
                                            }
                                        }
                                    }

                                }
                                return;
                            }
                        } else {

                            canvasStateForLoad.setDeleteItem(null)
                            if (canvasStateForLoad.filled_background){
                                canvasStateForLoad.reload()
                            }
                            canvasStateForDraw.reload()
                        }
                    }

            } else if (canvasStateForLoad.move && isDragging) {

                if (!canvasStateForLoad.filled_background){
                    canvasStateForLoad.isDragging()
                }
                let dx = cursorPosition.x- cursorDragPoint.x;
                let dy = cursorPosition.y - cursorDragPoint.y;
                canvasStateForDraw.dragArea(dx / imgDimensions.size_k, dy / imgDimensions.size_k)
                cursorDragPoint.x = cursorPosition.x
                cursorDragPoint.y = cursorPosition.y
            }
        }


    }

    const saveHandle = (name) => {
        canvasStateForDraw.current_item.name = name
        canvasStateForLoad.areas.push(canvasStateForDraw.current_item)
        canvasStateForLoad.addPlanIDForAreas(plan.id)
        canvasStateForLoad.reload()
        canvasStateForDraw.reload()
        toolState.setTool(null)
    }

    const saveDevicesHandle = () => {
        if (deviceState.new_device.type === "device"){
            devicesStore.addDevice(deviceState.new_device)
        } else if (deviceState.new_device.type === "dependence") {
            dependencesStore.addDependence(deviceState.new_device)
        }
        deviceState.setDevice(null)
        canvasStateForLoad.reload()
        canvasStateForDraw.reload()
    }

    const changeIconSize = (value) => {
        if (deviceState.selected_device){
            deviceState.selected_device.size += value - deviceState.selected_device.size
            canvasStateForLoad.reload()
            canvasStateForDraw.reload()
        }
    }

    const changeDeviceName = () =>{
        let name = form.getFieldValue("nameInput")
        if (deviceState.selected_device && name.length > 1){
            deviceState.selected_device.name = name
        }
    }

    const saveDeviceParams = () => {
        setDeviceEdit(false)
    }

    let sliderStyle = {

    }

    let imgStyle = {
        width:imgDimensions.getWidth(),
        height: imgDimensions.getHeight(),
    }

    let firstCanvasStyle = {
        position:"absolute",
        width:imgDimensions.getWidth(),
        height:imgDimensions.getHeight(),
        border: "hidden",
    }

    return (
        <>
            {deviceEdit && (
                <Form
                    form={form}
                >
                <div style={sliderStyle}>
                    <Divider orientation="left">
                            <Tooltip title="Изменить название">
                                <Form.Item name="nameInput">
                                    <Input placeholder="Введите название" onChange={changeDeviceName} />
                                </Form.Item>
                            </Tooltip>
                    </Divider>
                    <Row gutter={24}>
                        <Col span={4}>
                            Размер иконки
                            <Form.Item name="iconSize">
                                <Slider onChange={changeIconSize}/>
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Button type="primary" onClick={saveDeviceParams}>
                                Сохранить
                            </Button>
                        </Col>
                    </Row>
                </div>
                </Form>
            )}
        <div style={{marginTop:10}}>
        <div className="image_inside_canvas" style={imgStyle}>
           <img src={plan.url} style={imgStyle} alt=""/>
        </div>
                <canvas
                    className="canvas"
                    style={firstCanvasStyle}
                    ref={canvasForLoadRef}
                    width={imgDimensions.getWidth()}
                    height={imgDimensions.getHeight()}
                />
                <canvas
                    className="canvas"
                    style={{position:"relative"}}
                    onMouseDown={mouseDownHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseMove={mouseMoveHandler}
                    ref={canvasForDrawRef}
                    width={imgDimensions.getWidth()}
                    height={imgDimensions.getHeight()}
                />
        </div>
            <DeleteAreaModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} deleteArea={deleteObjectInCanvas}/>
            <ConfirmAreaModal confirmModal={confirmModal} setConfirmModal={setConfirmModal} saveArea={saveHandle}/>
            <ConfirmDeviceModal confirmModal={confirmDeviceModal} setConfirmModal={setConfirmDeviceModal} save={saveDevicesHandle}/>
            <ConfirmDependenceModal confirmModal={confirmDependenceModal} setConfirmModal={setConfirmDependenceModal} save={saveDevicesHandle}/>
        </>
    )
});