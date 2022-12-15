import Tool from "./Tool";
import {areaStyle} from "./ToolStyle/AreaStyle";
import canvasStateForDraw from "../store/canvasStateForDraw";
import canvasStateForLoad from "../store/canvasStateForLoad";

export default class Line extends Tool{
    last_anchor = null
    start_position = null
    ended_area = false
    close_area = false
    points = []

    constructor(canvas) {
        super(canvas);
        canvasStateForDraw.setClosedArea(false)
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.listen()
        this.ctx.strokeStyle = areaStyle.draw.strokeStyle;
        this.ctx.lineWidth = areaStyle.draw.lineWidth;
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown= this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e){
        if (this.last_anchor && !this.close_area) {
            this.draw(e.pageX - e.target.offsetLeft- 20, e.pageY - e.target.offsetTop-100)
        }
    }
    mouseDownHandler(e){
        if (!canvasStateForDraw.isActive){
            return;
        }
        if (!this.ended_area){
            this.currentX = e.pageX - e.target.offsetLeft- 20
            this.currentY = e.pageY - e.target.offsetTop-100
            this.last_anchor = {x: this.currentX, y: this.currentY}
            if (!this.start_position){
                this.start_position = {x: this.currentX, y: this.currentY}
            }
            this.ctx.moveTo(this.currentX, this.currentY )
            this.points.push({x: this.currentX, y: this.currentY})
            this.saved = this.canvas.toDataURL()
        } else {
            this.fillArea()
            canvasStateForDraw.current_item.points = this.points
            this.close_area = true
            canvasStateForDraw.setClosedArea(true)
            canvasStateForDraw.setActive(false)
            canvasStateForLoad.setActive(true)
            this.last_anchor = null
            this.points = []
            this.destroyEvents()
        }

    }
    mouseMoveHandler(e){
        let x = e.pageX - e.target.offsetLeft- 20
        let y = e.pageY - e.target.offsetTop-100
        if (this.close_area && canvasStateForDraw.closed_area && !canvasStateForDraw.isActive){
            return
        }
        if (this.last_anchor) {
            if (Math.abs(this.start_position.x-x) < 10 && Math.abs(this.start_position.y-y) <10){
                this.ended_area = true
                this.draw(this.start_position.x, this.start_position.y)
            } else {
                this.ended_area = false
                this.draw(x, y)
            }
        }
    }

    draw(x,y) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY )
            this.ctx.lineTo(x, y)
            this.ctx.lineJoin = "round"
            this.ctx.stroke()
        }.bind(this)
    }

    fillArea(){
        this.ctx.fillStyle = areaStyle.draw.fillStyle
        if (this.points.length > 1){
            let region = new Path2D();
            region.moveTo(this.points[0].x, this.points[0].y)
            for (let i=0; i<this.points.length-1;i++){
                region.lineTo(this.points[i+1].x, this.points[i+1].y)

            }
            region.lineTo(this.points[0].x, this.points[0].y)
            region.closePath();
            this.ctx.fill(region);
        }
    }

}