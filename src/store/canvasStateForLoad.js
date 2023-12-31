import {makeAutoObservable} from "mobx";
import {areaStyle} from "../tools/ToolStyle/AreaStyle";
import canvasStateForDraw from "./canvasStateForDraw";
import {imgDimensions} from "../components/CanvasBox";
import dependencesStore from "./DevicesStore";
import ReleStore from "./ReleStore";
import graphStore from "./GraphStore";
/**
 * Канвас для отрисовки готовых областей
 */
class CanvasStateForLoad {
    plan_id = null
    canvas = null
    areas = []
    ctx = null
    move = false
    delete = false
    filled_background = false
    editable_item = {
        name: "",
        points: []
    }
    delete_item = null
    selected_device = null
    move_device = false

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


    setPlanId(id) {
        this.plan_id = id
    }

    addPlanIDForAreas(id) {
        for (let i = 0; i < this.areas.length; i++) {
            this.areas[i].plan_id = id
        }
    }

    setEditableItem(item) {
        this.editable_item = item
    }

    setDelete(value) {
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

    setActive(value) {
        if (!value) {
            this.move = false
            this.delete = false
        }
    }

    drawGraphs(){
        graphStore.graphs.forEach((graph) => {
            this.imgURL = graph.imgURL
            this.img = new Image();
            this.img.src = this.imgURL;
            this.ctx.drawImage(this.img, graph.points.x * imgDimensions.size_k, graph.points.y * imgDimensions.size_k, graph.size * imgDimensions.size_k, graph.size * imgDimensions.size_k);
        })
    }

    drawAreas(items) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.areas = []
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        items.forEach((item) => {
            this.areas.push(item)
            this.setText(item)
        })
    }

    drawDevices() {
        ReleStore.reles.filter(item => !item.belongs_to_graph).forEach((device) => {
            this.imgURL = device.imgURL
            this.img = new Image();
            this.img.src = this.imgURL;
            this.ctx.drawImage(this.img, device.points.x * imgDimensions.size_k, device.points.y * imgDimensions.size_k, device.size * imgDimensions.size_k, device.size * imgDimensions.size_k);
        })
    }

    drawDependences() {
        dependencesStore.devices.forEach((device) => {
            this.imgURL = device.imgURL
            this.img = new Image();
            this.img.src = this.imgURL;
            this.ctx.drawImage(this.img, device.points.x * imgDimensions.size_k, device.points.y * imgDimensions.size_k, device.size * imgDimensions.size_k, device.size * imgDimensions.size_k);
        })
    }

    drawFreeArea(item) {
        for (let j = 0; j < item.points.length - 1; j++) {
            this.drawline(item.points[j], item.points[j + 1])
        }
        this.drawline(item.points[item.points.length - 1], item.points[0])
    }

    drawline(point1, point2) {
        this.ctx.beginPath()
        this.ctx.moveTo(point1.x * imgDimensions.size_k, point1.y * imgDimensions.size_k)
        this.ctx.lineTo(point2.x * imgDimensions.size_k, point2.y * imgDimensions.size_k)
        this.ctx.lineJoin = "round"
        this.ctx.stroke()
    }

    setText(item) {
        this.ctx.strokeStyle = "rgba(12,59,61,0.56)";
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "rgb(46,224,231)";
        this.ctx.font = `${20*imgDimensions.size_k}px Sans-serif`;
        this.ctx.fillText(item.name, (item.points[0].x + 25)*imgDimensions.size_k,  (item.points[0].y + 30)*imgDimensions.size_k);
        this.ctx.strokeText(item.name, (item.points[0].x + 25) *imgDimensions.size_k, (item.points[0].y + 30)*imgDimensions.size_k)
    }

    fillArea(item) {
        this.drawFreeArea(item)
        this.ctx.fillStyle = areaStyle.ctx.fillStyle
        const {points} = item
        if (points.length > 1) {
            let region = new Path2D();
            region.moveTo(points[0].x, points[0].y)
            for (let i = 0; i < points.length - 1; i++) {
                region.lineTo(points[i + 1].x, points[i + 1].y)

            }
            region.lineTo(points[0].x, points[0].y)
            region.closePath();
            this.ctx.fill(region);
        }
    }

    isDragging() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = areaStyle.dragging.fillStyle
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.filled_background = true
    }

    deleteArea() {
        if (this.delete_item) {
            const index = this.areas.indexOf(this.delete_item)
            this.areas.splice(index, 1)
            this.devices = []
            canvasStateForDraw.reload()
            this.reload()
        }

    }

    setDeleteItem(item) {
        this.delete_item = item
    }

    reload() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawAreas(this.areas)
            this.drawGraphs()
            this.drawDevices(ReleStore.reles)
            this.drawDependences(dependencesStore.devices)
            this.editable_item = null
        }
    }
}

export default new CanvasStateForLoad()