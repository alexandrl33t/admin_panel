import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";

/**
 * Хранилище устройств
 */
class DevicesStore {

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

}

export default new DevicesStore()