import Tool from "./Tool";
import {areaStyle} from "./ToolStyle/AreaStyle";
import canvasStateForDraw from "../store/canvasStateForDraw";

export default class Rect extends Tool{

    area = {
        name:"",
        x: 0,
        y:0,
        width:0,
        height:0,
    }

    constructor(canvas) {
        super(canvas);
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.fillStyle = areaStyle.ctx.fillStyle;
        this.ctx.lineWidth = areaStyle.ctx.lineWidth;
        this.listen();
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown= this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e){
        this.mouseDown = false;
    }
    mouseDownHandler(e){
        if (!canvasStateForDraw.isActive){
            return
        }
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.fillStyle = areaStyle.ctx.fillStyle;
        this.ctx.lineWidth = areaStyle.ctx.lineWidth;
        this.startX = e.pageX - e.target.offsetLeft- 20;
        this.startY = e.pageY - e.target.offsetTop-115;
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e){
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft- 20;
            let currentY = e.pageY - e.target.offsetTop-115 ;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height);
        }
    }

    draw(x,y, w, h) {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x,y,w,h);
            this.ctx.fillRect(x, y, w, h);
            this.ctx.stroke();
            this.setArea(x, y, w, h)
    }

    setArea(x, y, w, h){
        this.area.x=x;
        this.area.y=y;
        this.area.width=w;
        this.area.height = h;
    }
}