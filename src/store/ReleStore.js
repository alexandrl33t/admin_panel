import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";
import canvasStateForDraw from "./canvasStateForDraw";
import canvasStateForLoad from "./canvasStateForLoad";

/**
 * Хранилище реле
 */
class ReleStore {

    devices = []

    constructor() {
        makeAutoObservable(this)
    }


    addDevice(item){
        item.type = "device"
        if (imgDimensions.size_k !== 1){
            item.points.x /= imgDimensions.size_k
            item.points.y /= imgDimensions.size_k
        }
        this.devices.push(item)
    }

    deleteDevice(item) {
        const index = this.devices.indexOf(item)
        this.devices.splice(index, 1)
        canvasStateForDraw.reload()
        canvasStateForLoad.reload()
    }

}

export default new ReleStore()