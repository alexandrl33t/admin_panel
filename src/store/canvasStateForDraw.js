import {makeAutoObservable} from "mobx";
import {areaStyle} from "../tools/ToolStyle/AreaStyle";
import {imgDimensions} from "../components/CanvasBox";
import ReleState from "./ReleState";
import canvasStateForLoad from "./canvasStateForLoad";
/**
 * Канвас для создания новых областей
 */
class CanvasStateForDraw {
    canvas = null
    isActive = false
    current_item = {
        name: "",
        points:[],
    }
    closed_area = false

    original_size = {width: 0, height: 0}
    connecting_to_device = false
    current_devices = []


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
        this.ctx.strokeText(`Объединить ${ReleState.new_device?.name} с ${ReleState.root_device?.name}?`, item.points.x *imgDimensions.size_k + 30, item.points.y*imgDimensions.size_k + 30);
        this.ctx.fillText(`Объединить ${ReleState.new_device?.name} с ${ReleState.root_device?.name}?`, item.points.x *imgDimensions.size_k + 30, item.points.y*imgDimensions.size_k + 30);
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

    hoverGraph(graph){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        if (!canvasStateForLoad.filled_background){
            canvasStateForLoad.isDragging()
        }
        let angle = 360 / graph.includes.length
        let start_point = {x: graph.points.x + graph.size/2, y: graph.points.y + graph.size/2}
        let second_point = {x: start_point.x, y: start_point.y + graph.size}
        this.ctx.beginPath()
        this.ctx.lineCap = "round"

        for (let i = 0; i < graph.includes.length; i++){
            this.ctx.moveTo(start_point.x*imgDimensions.size_k, start_point.y*imgDimensions.size_k)
            const rad = Math.PI / 180 * angle * (i + 1)
            const x = start_point.x + (second_point.x - start_point.x) * Math.cos(rad) - (second_point.y - start_point.y) * Math.sin(rad)
            const y = start_point.y + (second_point.x - start_point.x) * Math.sin(rad) + (second_point.y - start_point.y) * Math.cos(rad)
            this.ctx.lineTo(x*imgDimensions.size_k, y*imgDimensions.size_k)
            if (0 <= angle && angle * (i + 1) < 90 ){
                graph.includes[i].points.x = x - graph.includes[i].size/2
                graph.includes[i].points.y = y - graph.includes[i].size/2
            } else if (90 <=angle && angle * (i + 1) < 180 ){
                graph.includes[i].points.x = x + graph.includes[i].size/2
                graph.includes[i].points.y = y + graph.includes[i].size/2
            }else if (180 <= angle && angle * (i + 1) < 270 ){
                graph.includes[i].points.x = x - graph.includes[i].size/2
                graph.includes[i].points.y = y - graph.includes[i].size/2
            }else {
                graph.includes[i].points.x = x - graph.includes[i].size/2
                graph.includes[i].points.y = y - graph.includes[i].size/2
            }
            graph.includes[i].size = graph.size * 0.8
            this.ctx.stroke()
            this.drawImg(graph.includes[i])
        }

        this.drawImg(graph)
    }

    drawImg(item){
        this.imgItem = new Image();
        this.imgItem.src = item.imgURL
        this.ctx.drawImage(this.imgItem, item.points.x * imgDimensions.size_k, item.points.y * imgDimensions.size_k, item.size * imgDimensions.size_k, item.size * imgDimensions.size_k);
    }


    setClosedArea(value){
        this.closed_area = value
    }


    reload() {
        if (ReleState.selected_device?.type === "graph") {
            this.hoverGraph(ReleState.selected_device)
        } else {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
            this.current_item = {
                name: "",
                points:[],
            }
            this.closed_area = false
        }


    }
}

export default new CanvasStateForDraw()