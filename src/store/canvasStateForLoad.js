import {makeAutoObservable} from "mobx";
import {areaStyle} from "../tools/ToolStyle/AreaStyle";
import canvasStateForDraw from "./canvasStateForDraw";

/**
 * Канвас для отрисовки готовых областей
 */
class CanvasStateForLoad {
    canvas = null
    areas = []
    ctx = null
    current_item = {
        name:"",
        points: []
    }
    move = false
    delete = false
    filled_background = false
    editable_item = {
        name:"",
        points: []
    }
    already_reloaded = false

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    addArea(area){
        this.areas.push(area)
    }

    setCurrentItem(item){
        this.current_item = item
    }

    setEditableItem(item){
        this.editable_item=item
        this.areas.splice(this.areas.indexOf(item), 1)
    }

    setDelete(value){
        this.delete = value
        if (value) {
            this.move = false
        }
    }

    setEdit(value) {
        this.move = value
        if (value) {
            this.delete = false
        }
    }

    hoverItemDelete(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.drawFreeArea(this.current_item)
        this.fillArea(this.current_item);
        this.setText(this.current_item)
    }

    unHoverItemDelete(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.drawObjects(this.areas)
    }

    clearArea(index){
        this.areas.splice(index, 1)

        this.clearCurrentItem()
    }

    clearCurrentItem(){
        this.current_item = {
            name:"",
            points: [],
        }
    }

    setActive(value){
        if (!value){
            this.move = false
            this.delete = false
        }
    }

    drawObjects(items){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.areas = []
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        items.forEach((item) => {
            this.areas.push(item)
            this.drawFreeArea(item)
            this.setText(item)
        })
    }

    drawFreeArea(item){
        for (let j =0; j < item.points.length -1;j++){
            this.drawline(item.points[j], item.points[j+1])
        }
        this.drawline(item.points[item.points.length-1], item.points[0])
    }

    drawline(point1, point2){
        this.ctx.beginPath()
        this.ctx.moveTo(point1.x, point1.y )
        this.ctx.lineTo(point2.x, point2.y)
        this.ctx.lineJoin = "round"
        this.ctx.stroke()
    }
    setText(item){
        this.ctx.fillStyle = "rgba(0,0,0,0.96)";
        this.ctx.font = 'bold 15px sans-serif';
        this.ctx.fillText(item.name, item.points[0].x + 15, item.points[0].y+ 15);
    }

    fillArea(item){
        const {points} = item

        if (points.length > 1){
            for (let i=0; i<points.length-1;i++){
                this.ctx.beginPath()
                this.ctx.moveTo(points[i].x, points[i].y)
                this.ctx.lineTo(points[points.length-1-i].x, points[points.length-1-i].y)
                this.ctx.lineTo(points[i+1].x, points[i+1].y)
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }

    isDragging(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = areaStyle.dragging.fillStyle
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
        this.filled_background = true
    }


    reload(){
        if (this.move){
            this.areas.push(canvasStateForDraw.current_item)
        }
        console.log(this.areas)
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.drawObjects(this.areas)
        this.filled_background = false
        this.editable_item=null
        this.clearCurrentItem()
    }




}

export default new CanvasStateForLoad()