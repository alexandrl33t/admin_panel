import {makeAutoObservable} from "mobx";

class DeviceState {
    new_device = null
    selected_device = null
    is_on_area = false
    moveDevice = false
    changing_params = false

    constructor() {
        makeAutoObservable(this)
    }

    setDevice(device) {
        this.new_device = device
    }

    setIsOnArea(value){
        this.is_on_area = value
    }

    setMoveDevice(value) {
        this.moveDevice = value
    }

    setSelectedDevice(device){
        this.selected_device = device
    }
}

export default new DeviceState()