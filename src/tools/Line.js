import Tool from "./Tool";

export default class Line extends Tool{
    constructor(canvas) {
        super(canvas);
        this.listen()
        this.ctx.strokeStyle = 'blue'
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
        this.currentX = e.pageX - e.target.offsetLeft- 20
        this.currentY = e.pageY - e.target.offsetTop-115
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY )
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft- 20, e.pageY - e.target.offsetTop-115)
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
            this.ctx.stroke()
        }.bind(this)
    }
}