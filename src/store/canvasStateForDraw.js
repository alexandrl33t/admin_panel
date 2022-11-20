import {makeAutoObservable} from "mobx";
/**
 * Канвас для создания новых областей
 */
class CanvasStateForDraw {
    canvas = null
    isActive = false
    undolist =[]

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToUndo(data){
        this.undolist.push(data)
    }
    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undolist.length > 0){
            let dataUrl = this.undolist.pop()
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
              ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        }
    }

    setActive(value){
        this.isActive = value
    }


}

export default new CanvasStateForDraw()