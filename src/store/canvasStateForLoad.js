import {makeAutoObservable} from "mobx";
import {areaStyle} from "../tools/ToolStyle/AreaStyle";

/**
 * Канвас для отрисовки готовых областей
 */
class CanvasStateForLoad {
    canvas = null
    areas = []
    ctx = null
    current_item = {
        name:"",
        x: 0,
        y:0,
        width:0,
        height:0,
    }
    edit = false
    delete = false

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    setAreas(area){
        this.areas.push(area)
    }

    dragRect(dx, dy) {
        const {name, x, y, width, height} = this.current_item;
        this.ctx.clearRect(
            x - areaStyle.ctx.lineWidth,
            y -areaStyle.ctx.lineWidth,
            width +areaStyle.ctx.lineWidth + 1 ,
            height +areaStyle.ctx.lineWidth + 1
        );
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.fillStyle = areaStyle.ctx.fillStyle;
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        this.ctx.beginPath();
        this.ctx.rect(x + dx, y + dy, width, height);
        this.ctx.fillRect(x + dx,y + dy, width, height);
        this.ctx.fillStyle = "rgba(0,0,0,0.96)";
        this.ctx.font = 'bold 15px sans-serif';
        this.ctx.fillText(name, x + dx +15, y + dy + 25);
        this.current_item.x += dx
        this.current_item.y += dy
    }

    clearLastPosition(){
        const {name, x, y, width, height} = this.current_item;
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.fillStyle = areaStyle.ctx.fillStyle;
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillRect(x ,y, width, height);
        this.ctx.fillStyle = "rgba(0,0,0,0.96)";
        this.ctx.stroke()
        this.ctx.font = 'bold 15px sans-serif';
        this.ctx.fillText(name, x +15, y + 25);
    }

    setCurrentItem(item){
        this.current_item = item
    }

    setDelete(value){
        this.delete = value
        if (value) {
            this.edit = false
        }
    }

    setEdit(value) {
        this.edit = value
        if (value) {
            this.delete = false
        }
    }

    hoverItemDelete(){
        const {name, x, y, width, height} = this.current_item;
        this.ctx.clearRect(
            x - areaStyle.ctx.lineWidth,
            y -areaStyle.ctx.lineWidth,
            width +areaStyle.ctx.lineWidth + 1 ,
            height +areaStyle.ctx.lineWidth + 1
        );
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.fillStyle = "rgba(255,22,22,0.33)";
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        this.ctx.beginPath();
        this.ctx.rect(x - 2, y - 2, width + 4, height + 4);
        this.ctx.fillRect(x -2,y -2, width+4, height+4);
        this.ctx.stroke()
        this.ctx.fillStyle = "rgba(0,0,0,0.96)";
        this.ctx.font = 'bold 17px sans-serif';
        this.ctx.fillText(name, x - 2 +15, y -2 + 25);
    }

    unHoverItemDelete(){
        const {name, x, y, width, height} = this.current_item;
        this.ctx.clearRect(
            x -2 - areaStyle.ctx.lineWidth,
            y -2 -areaStyle.ctx.lineWidth,
            width + 4 +areaStyle.ctx.lineWidth + 1 ,
            height +4 +areaStyle.ctx.lineWidth + 1
        );
        this.ctx.strokeStyle = areaStyle.ctx.strokeStyle;
        this.ctx.fillStyle = areaStyle.ctx.fillStyle;
        this.ctx.lineWidth = areaStyle.ctx.lineWidth
        this.ctx.beginPath();
        this.ctx.rect(x + 2, y + 2, width -4, height-4);
        this.ctx.fillRect(x+ 2 ,y+ 2, width-4, height-4);
        this.ctx.stroke()
        this.ctx.fillStyle = "rgba(0,0,0,0.96)";
        this.ctx.font = 'bold 15px sans-serif';
        this.ctx.fillText(name, x + 2 +15, y+ 2 + 25);
    }

    clearArea(index){
        this.areas.splice(index, 1)
        console.log(this.areas)
        const {name, x, y, width, height} = this.current_item;
        this.ctx.clearRect(
            x - areaStyle.ctx.lineWidth,
            y -areaStyle.ctx.lineWidth,
            width +areaStyle.ctx.lineWidth + 1 ,
            height +areaStyle.ctx.lineWidth + 1
        );
        this.clearCurrentItem()
    }

    clearCurrentItem(){
        this.current_item = {
            name:"",
            x: 0,
            y:0,
            width:0,
            height:0,
        }
    }

    setActive(value){
        if (!value){
            this.edit = false
            this.delete = false
        }
    }

}

export default new CanvasStateForLoad()