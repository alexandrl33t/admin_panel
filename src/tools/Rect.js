import Tool from "./Tool";

export default class Rect extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen();
        this.ctx.strokeStyle = 'blue';
        this.ctx.fillStyle = "rgba(244,199,199,0.33)";
        this.ctx.lineWidth = 5
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown= this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e){
        this.mouseDown = false
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft- 20;
        this.startY = e.pageY - e.target.offsetTop-115;
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft- 20;
            let currentY = e.pageY - e.target.offsetTop-115 ;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x,y, w, h) {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x,y,w,h)
            this.ctx.fillRect(x, y, w, h);
            this.ctx.stroke()
    }
}