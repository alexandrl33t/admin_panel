import Tool from "./Tool";
import {areaStyle} from "./ToolStyle/AreaStyle";
import canvasStateForDraw from "../store/canvasStateForDraw";

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
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.lineWidth = areaStyle.ctx.lineWidth;
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown= this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e){
        if (this.last_anchor && !this.close_area) {
            this.draw(e.pageX - e.target.offsetLeft- 20, e.pageY - e.target.offsetTop-115)
        }
    }
    mouseDownHandler(e){
        if (this.close_area) {
            return
        }
        if (!this.ended_area){
            this.currentX = e.pageX - e.target.offsetLeft- 20
            this.currentY = e.pageY - e.target.offsetTop-115
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
        }

    }
    mouseMoveHandler(e){
        let x = e.pageX - e.target.offsetLeft- 20
        let y = e.pageY - e.target.offsetTop-115
        if (this.close_area){
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
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        let closest_canvas_angle = {x:0, y:0}
        let min_dist = 9999999999999
        if (this.points.length > 1){
            for (let i=0; i<this.points.length-1;i++){
                //доделать расстояние до прямой и сравнить с расстоянием до конкретной точки
                canvasStateForDraw.canvas_points.forEach((point)=>{
                    const d = Math.sqrt(Math.pow(Math.abs(point.x - this.points[i].x)) + Math.pow(Math.abs(point.y - this.points[i].y)))
                    if (d < min_dist){
                        min_dist = d
                        closest_canvas_angle = {x:point.x, y:point.y }
                    }
                })


                this.ctx.beginPath()
                this.ctx.moveTo(this.points[i].x, this.points[i].y)
                this.ctx.lineTo(this.points[this.points.length-1-i].x, this.points[this.points.length-1-i].y)
                this.ctx.lineTo(this.points[i+1].x, this.points[i+1].y)
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }

}