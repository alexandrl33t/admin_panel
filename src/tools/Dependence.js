import AbstractDevice from "./AbstractDevice";
import canvasStateForLoad from "../store/canvasStateForLoad";
import deviceState from "../store/deviceState";
import canvasStateForDraw from "../store/canvasStateForDraw";
import devicesStore from "../store/DevicesStore";
import {imgDimensions} from "../components/CanvasBox";
import {areaStyle} from "./ToolStyle/AreaStyle";

export default class Dependence extends AbstractDevice{

    is_on_item = false
    cursor_drag_point = null
    belongs_to = null

    constructor(canvas, device) {
        super(canvas);
        this.addDevice(device)
        this.plan_id = canvasStateForLoad.plan_id
        this.type = "dependence"
        this.listen();
    }

    mouseUpHandler(e){

        if (!this.belongs_to && !deviceState.connecting_dependence){
            this.currentX = e.pageX - e.target.offsetLeft- 20
            this.currentY = e.pageY - e.target.offsetTop-100
            deviceState.connecting_dependence = true
            this.ctx = canvasStateForDraw.ctx
        }
        this.mouseDown = false
        deviceState.setIsOnArea(!!this.area_id)

    }

    mouseMoveHandler(e) {
        if (!deviceState.connecting_dependence){
            super.mouseMoveHandler(e);
        } else {
            let current_x = e.pageX - e.target.offsetLeft- 20
            let current_y = e.pageY - e.target.offsetTop-100
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            devicesStore.devices.filter(item => !item.belongs_to_graph).forEach(device => {
                if (this.isOnItem(current_x, current_y, device)){
                    canvasStateForDraw.hoverDevice(device)
                    deviceState.setSelectedDevice(device)
                } else {
                    this.ctx.fillStyle = areaStyle.ctx.fillStyle
                    this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
                    this.ctx.lineWidth = areaStyle.ctx.lineWidth
                    deviceState.setSelectedDevice(null)
                }
            })
            canvasStateForDraw.drawline({x: this.currentX, y: this.currentY}, {x: current_x, y: current_y})
        }
    }

    mouseDownHandler(e) {
        if (!deviceState.connecting_dependence){
            super.mouseDownHandler();
        } else {
            if (deviceState.selected_device){
                this.belongs_to = deviceState.selected_device
            }
        }
    }

    isOnItem (x, y, item) {
        if (item?.points){
            if (x >= item.points.x * imgDimensions.size_k
                && y >= item.points.y * imgDimensions.size_k
                && x<= (item.points.x + item.size) * imgDimensions.size_k
                && y <=(item.points.y + item.size) * imgDimensions.size_k)
                return true
        }
        return false
    }
}