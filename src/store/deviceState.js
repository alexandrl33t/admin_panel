import {makeAutoObservable} from "mobx";
import canvasStateForLoad from "./canvasStateForLoad";

class DeviceState {
    device = null
    is_on_area = false

    constructor() {
        makeAutoObservable(this)
    }

    setDevice(device) {
        this.device = device
    }

    setIsOnArea(value){
        this.is_on_area = value
    }
}

export default new DeviceState()