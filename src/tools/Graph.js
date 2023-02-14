import canvasStateForLoad from "../store/canvasStateForLoad";
import {imgDimensions} from "../components/CanvasBox";
import deviceState from "../store/deviceState";

/**
 * Создается, когда устройства накладываются друг на друга.
 */
export default class Graph{

    name = null
    plan_id = null
    area_id = null
    area_name = null
    points = null
    imgURL= null
    size = 40
    type = null
    includes = []

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.imgURL = "https://www.svgrepo.com/show/500066/bulletin-board.svg"
        this.plan_id = deviceState.root_device.plan_id
        this.points = Object.assign({}, deviceState.root_device.points);
        this.area_id = deviceState.root_device.area_id
        this.pushDevice(deviceState.root_device)
        this.pushDevice(deviceState.new_device)
        this.draw()
    }

    destroyEvents() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown= null
        this.canvas.onmousemove = null
    }

    draw(){
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
        deviceState.setIsOnArea(!!this.area_id)
    }

    mouseDownHandler(){
        if (!deviceState.new_device){
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

        }

    }

    redraw(){
        this.ctx.clearRect(this.points.x, this.points.y, this.size * imgDimensions.size_k, this.size * imgDimensions.size_k)
        this.ctx.drawImage(this.img,  this.points.x, this.points.y, this.size  * imgDimensions.size_k, this.size * imgDimensions.size_k);
    }

    pushDevice(device){
        this.includes.push(device)
    }

}