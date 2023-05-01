import canvasStateForLoad from "../store/canvasStateForLoad";
import {imgDimensions} from "../components/CanvasBox";
import ReleState from "../store/ReleState";
import canvasStateForDraw from "../store/canvasStateForDraw";
import ReleStore from "../store/ReleStore";

export default class AbstractDevice{

    name = null
    plan_id = null
    area_id = null
    area_name = null
    points = null
    imgURL= null
    size = 40
    type = null
    is_on_other_device = false
    belongs_to_graph = null

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    destroyEvents() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown= null
        this.canvas.onmousemove = null
    }

    addDevice(device){
        /**
         * подсчет размера иконки изображения относительно плана. Примерное соотношение 1/4 (изображение/ср.знач.сторон областей)
         * после добавление самого изображения
         */
        let sum = 0
        let side_count = 0
        canvasStateForLoad.areas.forEach((area)=>{
            for (let i =0; i<area.points.length-1; i++){
                const v_size = Math.sqrt(
                    Math.pow(area.points[i+1].x - area.points[i].x,2)
                    +
                    Math.pow(area.points[i+1].y - area.points[i].y,2)
                )
                sum += v_size;
                side_count++;
            }
            sum += Math.sqrt(
                Math.pow(area.points[area.points.length-1].x - area.points[0].x,2)
                +
                Math.pow(area.points[area.points.length-1].y - area.points[0].y,2)
            )
            side_count++;
        })


        this.name = device.name
        this.imgURL = device.imgURL
        this.points = {x:15, y:15}
        if (sum !==0 || side_count > 0){
            this.size = sum/side_count/4
        } else this.size = 40

        this.img = new Image();
        this.img.src = this.imgURL;
        this.img.addEventListener(
            "load",
            () => {
                this.ctx.drawImage(
                    this.img,
                    this.points.x,
                    this.points.y,
                    this.size * imgDimensions.size_k,
                    this.size*imgDimensions.size_k
                );
            },
            false
        );
    }
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown= this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(){
        this.mouseDown = false
        ReleState.setIsOnArea(!!this.area_id)
    }

    mouseDownHandler(){
        if (!ReleState.new_device){
            this.destroyEvents()
        }
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
            this.is_on_item = this.currentX >= this.points.x * imgDimensions.size_k && this.currentX <= (this.points.x + this.size) * imgDimensions.size_k &&
                this.currentY >= this.points.y * imgDimensions.size_k && this.currentY <= (this.points.y + this.size) * imgDimensions.size_k;
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
                    if (this.type === "device") {
                        ReleStore.devices.forEach((device) => {
                            if (this.isOnOtherDevice(this.currentX, this.currentY, device)){
                                ReleState.set_root_device(device)
                            } else {
                                ReleState.set_root_device(null)
                            }
                        })
                    }
                    canvasStateForDraw.reload()
                    this.redraw()
                    canvasStateForDraw.hoverArea(canvasStateForLoad.areas[i])
                    break
                } else {
                    this.area_id = null
                    this.area_name = null
                    ReleState.setIsOnArea(false)
                    canvasStateForDraw.reload()
                    this.redraw()
                }
            }
        }

    }

    redraw(){
        this.ctx.clearRect(this.points.x, this.points.y, this.size * imgDimensions.size_k, this.size * imgDimensions.size_k)
        this.ctx.drawImage(this.img,  this.points.x, this.points.y, this.size  * imgDimensions.size_k, this.size * imgDimensions.size_k);
    }

    isOnArea(x, y, item) {
        if (item.points.length > 1){
            for (let i=0; i<item.points.length-1;i++){
                const x1 = item.points[i].x * imgDimensions.size_k
                const x2 = item.points[item.points.length-1-i].x * imgDimensions.size_k
                const x3 = item.points[i+1].x * imgDimensions.size_k
                const y1 = item.points[i].y * imgDimensions.size_k
                const y2 = item.points[item.points.length-1-i].y * imgDimensions.size_k
                const y3 = item.points[i+1].y * imgDimensions.size_k
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

    isOnOtherDevice(x, y, item){
        return  x >= item.points.x * imgDimensions.size_k && x <= (item.points.x + item.size) * imgDimensions.size_k &&
            y >= item.points.y * imgDimensions.size_k && y <= (item.points.y + item.size) * imgDimensions.size_k;
    }
}