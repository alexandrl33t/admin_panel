import AbstractDevice from "./AbstractDevice";
import canvasStateForLoad from "../store/canvasStateForLoad";
import canvasStateForDraw from "../store/canvasStateForDraw";
import deviceState from "../store/deviceState";

export default class Device extends AbstractDevice{

    is_on_item = false
    cursor_drag_point = null


    constructor(canvas, device) {
        super(canvas);
        this.addDevice(device)
        this.plan_id = canvasStateForLoad.plan_id
        this.listen();
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown= this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e){
        this.mouseDown = false
        deviceState.setIsOnArea(!!this.area_id)
    }

    mouseDownHandler(e){
        if (this.is_on_item) {
            this.mouseDown = true
            this.cursor_drag_point = {x:this.currentX, y:this.currentY}
            this.img = new Image();
            this.img.src = this.imgURL;
        }
    }
    mouseMoveHandler(e){
        this.currentX = e.pageX - e.target.offsetLeft- 20
        this.currentY = e.pageY - e.target.offsetTop-100
        if (!this.mouseDown){
            if (this.currentX >= this.points.x && this.currentX <= this.points.x+this.size &&
                this.currentY >= this.points.y && this.currentY <= this.points.y+this.size
            ){
                this.is_on_item = true
            } else {
                this.is_on_item = false
            }
        } else {
            let dx = this.currentX - this.cursor_drag_point.x;
            let dy = this.currentY - this.cursor_drag_point.y;
            this.points.x+=dx
            this.points.y+=dy
            this.cursor_drag_point.x = this.currentX
            this.cursor_drag_point.y = this.currentY
            for (let i =0; i < canvasStateForLoad.areas.length; i++) {
                if (this.isOnArea(this.currentX, this.currentY, canvasStateForLoad.areas[i])) {
                    this.area_id = canvasStateForLoad.areas[i].id
                    this.area_name = canvasStateForLoad.areas[i].name
                    canvasStateForDraw.reload()
                    this.redraw()
                    canvasStateForDraw.hoverArea(canvasStateForLoad.areas[i])
                    break
                } else {
                    this.area_id = null
                    this.area_name = null
                    deviceState.setIsOnArea(false)
                    canvasStateForDraw.reload()
                    this.redraw()
                }
            }
        }

    }

    redraw(){
        this.ctx.clearRect(this.points.x, this.points.y, this.size, this.size)
        this.ctx.drawImage(this.img, this.points.x, this.points.y, this.size, this.size);
    }

    isOnArea(x, y, item) {
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
}