import {makeAutoObservable} from "mobx";
import canvasStateForLoad from "./canvasStateForLoad";

class DeviceState {
    device = null
    constructor() {
        makeAutoObservable(this)
    }

    setDevice(device) {
        this.device = device
        canvasStateForLoad.addDevice(device)
    }
}

export default new DeviceState()