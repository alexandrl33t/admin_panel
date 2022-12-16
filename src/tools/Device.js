import AbstractDevice from "./AbstractDevice";
import canvasStateForDraw from "../store/canvasStateForDraw";
import {areaStyle} from "./ToolStyle/AreaStyle";
import canvasStateForLoad from "../store/canvasStateForLoad";

export default class Device extends AbstractDevice{

    isOnItem = false

    constructor(canvas, device) {
        super(canvas);
        this.addDevice(device)
        this.listen();
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown= this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e){

    }
    mouseDownHandler(e){
        if (this.isOnItem) {
            this.mouseDown = true
        }
    }
    mouseMoveHandler(e){
        this.currentX = e.pageX - e.target.offsetLeft- 20
        this.currentY = e.pageY - e.target.offsetTop-100
        if (!this.mouseDown){
            if (this.currentX >= this.points.x && this.currentX <= this.points.x+this.size &&
                this.currentY >= this.points.y && this.currentY <= this.points.y+this.size
            ){
                this.isOnItem = true
            }
        } else {

        }

    }
}