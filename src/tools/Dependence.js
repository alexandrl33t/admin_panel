import AbstractDevice from "./AbstractDevice";
import canvasStateForLoad from "../store/canvasStateForLoad";
import ReleState from "../store/ReleState";
import canvasStateForDraw from "../store/canvasStateForDraw";
import ReleStore from "../store/ReleStore";
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

        if (!this.belongs_to && !ReleState.connecting_dependence){
            this.currentX = e.pageX - e.target.offsetLeft- 20
            this.currentY = e.pageY - e.target.offsetTop-100
            ReleState.connecting_dependence = true
            this.ctx = canvasStateForDraw.ctx
        }
        this.mouseDown = false
        ReleState.setIsOnArea(!!this.area_id)

    }

    mouseMoveHandler(e) {
        if (!ReleState.connecting_dependence){
            super.mouseMoveHandler(e);
        } else {
            let current_x = e.pageX - e.target.offsetLeft- 20
            let current_y = e.pageY - e.target.offsetTop-100
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            ReleStore.reles.filter(item => !item.belongs_to_graph).forEach(device => {
                if (this.isOnItem(current_x, current_y, device)){
                    canvasStateForDraw.hoverDevice(device)
                    ReleState.setSelectedDevice(device)
                } else {
                    this.ctx.fillStyle = areaStyle.ctx.fillStyle
                    this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
                    this.ctx.lineWidth = areaStyle.ctx.lineWidth
                    ReleState.setSelectedDevice(null)
                }
            })
            canvasStateForDraw.drawline({x: this.currentX, y: this.currentY}, {x: current_x, y: current_y})
        }
    }

    mouseDownHandler(e) {
        if (!ReleState.connecting_dependence){
            super.mouseDownHandler();
        } else {
            if (ReleState.selected_device){
                this.belongs_to = ReleState.selected_device
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