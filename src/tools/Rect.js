import Tool from "./Tool";

export default class Rect extends Tool{

    area = {
        name:"",
        x: 0,
        y:0,
        width:0,
        height:0,
    }

    ctxProps = {
        strokeStyle : 'blue',
        fillStyle : "rgba(244,199,199,0.33)",
        lineWidth : 5,
    }

    constructor(canvas) {
        super(canvas);
        this.ctx.strokeStyle = this.ctxProps.strokeStyle;
        this.ctx.fillStyle = "rgba(244,199,199,0.33)";
        this.ctx.lineWidth = 5;
        this.listen();
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown= this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e){
        this.mouseDown = false;
    }
    mouseDownHandler(e){
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft- 20;
        this.startY = e.pageY - e.target.offsetTop-115;
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e){
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft- 20;
            let currentY = e.pageY - e.target.offsetTop-115 ;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height);
        }
    }

    draw(x,y, w, h) {
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x,y,w,h);
            this.ctx.fillRect(x, y, w, h);
            this.ctx.stroke();
            this.setArea(x, y, w, h)
    }

    setArea(x, y, w, h){
        this.area.x=x;
        this.area.y=y;
        this.area.width=w;
        this.area.height = h;
    }

    drawFromData(item){
       const {name, x, y, width, height} = item;
        this.setArea(x,y,width,height);
        this.area.name = name;
        this.ctx.beginPath();
        this.ctx.rect(x,y,width,height);
        this.ctx.fillRect(x,y,width,height);
        this.ctx.stroke();
    }
}