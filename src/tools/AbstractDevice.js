import canvasStateForLoad from "../store/canvasStateForLoad";

export default class AbstractDevice{

    name = null
    plan_id = null
    area_id = null
    points = null
    imgURL= null
    size = 40

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
         * подсчет размера иконки изображения относительно плана. Примерное соотношение 1/3 (изображение/ср.знач.сторон областей)
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
            this.size = sum/side_count/3
        } else this.size = 40

        this.img = new Image();
        this.img.src = this.imgURL;
        this.img.addEventListener(
            "load",
            () => {
                this.ctx.drawImage(this.img, this.points.x, this.points.y, this.size, this.size);
            },
            false
        );
    }
}