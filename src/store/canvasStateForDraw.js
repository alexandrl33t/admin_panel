import {makeAutoObservable} from "mobx";
import {areaStyle} from "../tools/ToolStyle/AreaStyle";
import {imgDimensions} from "../components/CanvasBox";
import deviceState from "./deviceState";
/**
 * Канвас для создания новых областей
 */
class CanvasStateForDraw {
    canvas = null
    isActive = false
    undolist =[]
    current_item = {
        name: "",
        points:[],
    }
    closed_area = false

    original_size = {width: 0, height: 0}
    //коэффициент масштаба плана
    size_k = 1

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
    }
    setCurrentItem(item){
        this.current_item = item
    }

    setActive(value){
        this.isActive = value
    }
    drawFreeArea(item){
        for (let j =0; j < item.points.length -1;j++){
            this.drawline(item.points[j], item.points[j+1])
        }
        this.drawline(item.points[item.points.length-1], item.points[0])
    }

    drawline(point1, point2){
        this.ctx.beginPath()
        this.ctx.moveTo(point1.x * imgDimensions.size_k, point1.y * imgDimensions.size_k)
        this.ctx.lineTo(point2.x * imgDimensions.size_k, point2.y* imgDimensions.size_k)
        this.ctx.lineJoin = "round"
        this.ctx.stroke()
        this.ctx.closePath();
    }
    setText(item){
        this.ctx.strokeStyle = "rgba(12,59,61,0.56)";
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "rgb(46,224,231)";
        this.ctx.font = `${20*imgDimensions.size_k}px Sans-serif`;
        this.ctx.fillText(item.name, item.points[0].x *imgDimensions.size_k + 30, item.points[0].y*imgDimensions.size_k + 30);
        this.ctx.strokeText(item.name, item.points[0].x *imgDimensions.size_k + 30, item.points[0].y*imgDimensions.size_k + 30)
    }


    toolBeforeGraphCreated(item){
        this.ctx.strokeStyle = "rgba(12,59,61,0.56)";
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "rgb(46,224,231)";
        this.ctx.font = `${20*imgDimensions.size_k}px impact`;
        this.ctx.strokeText(`Объединить ${deviceState.new_device?.name} с ${deviceState.root_device?.name}?`, item.points.x *imgDimensions.size_k + 30, item.points.y*imgDimensions.size_k + 30);
        this.ctx.fillText(`Объединить ${deviceState.new_device?.name} с ${deviceState.root_device?.name}?`, item.points.x *imgDimensions.size_k + 30, item.points.y*imgDimensions.size_k + 30);
    }

    fillArea(item){
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        const {points} = item
        if (points.length > 1){
            let region = new Path2D();
            region.moveTo(points[0].x*imgDimensions.size_k, points[0].y*imgDimensions.size_k)
            for (let i=0; i<points.length-1;i++){
                region.lineTo(points[i+1].x*imgDimensions.size_k, points[i+1].y*imgDimensions.size_k)

            }
            region.lineTo(points[0].x*imgDimensions.size_k, points[0].y*imgDimensions.size_k)
            region.closePath();
            this.ctx.fill(region);
        }
    }

    fillAreaForDrag(item){
        this.drawFreeArea(item)
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
        this.ctx.fillStyle = "rgba(58,225,255,0.25)"
        const {points} = item
        if (points.length > 1){
            let region = new Path2D();
            region.moveTo(points[0].x*imgDimensions.size_k, points[0].y*imgDimensions.size_k)
            for (let i=0; i<points.length-1;i++){
                region.lineTo(points[i+1].x*imgDimensions.size_k, points[i+1].y*imgDimensions.size_k)

            }
            region.lineTo(points[0].x*imgDimensions.size_k, points[0].y*imgDimensions.size_k)
            region.closePath();
            this.ctx.fill(region);
        }
    }

    dragArea(dx, dy) {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        this.current_item.points.forEach(point => {
            point.x += dx
            point.y += dy
        })
        this.drawFreeArea(this.current_item)
        this.fillArea(this.current_item)
        this.setText(this.current_item)
    }

    drawAreaDelete(item){
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.ctx.strokeStyle = this.ctx.strokeStyle = "#ff0000"
        this.ctx.lineWidth = 0
        this.drawFreeArea(item)
        this.fillArea(item)
        this.setText(item)
    }

    hoverArea(item){
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
        this.drawFreeArea(item)
    }

    hoverDevice(device){
        this.ctx.fillStyle = areaStyle.device.fillStyle
        this.ctx.lineWidth = areaStyle.device.lineWidth
        this.ctx.strokeStyle = areaStyle.device.strokeStyle
        this.ctx.beginPath()
        this.ctx.fillStyle = "rgba(126,10,10,0.96)";
        this.ctx.font = `${15*imgDimensions.size_k}px impact`;
        this.ctx.fillText(device.name, (device.points.x + device.size/2) * imgDimensions.size_k, (device.points.y+ device.size+15) * imgDimensions.size_k);
    }


    setClosedArea(value){
        this.closed_area = value
    }


    reload() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.current_item = {
            name: "",
            points:[],
        }
        this.closed_area = false
    }
}

export default new CanvasStateForDraw()