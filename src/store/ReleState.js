import {makeAutoObservable} from "mobx";

class ReleState {
    new_device = null
    selected_device = null
    is_on_area = false
    moveDevice = false
    changing_params = false
    graph_selected = false
    //параметры для графа
    root_device = null
    connecting_dependence = false
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

    set_root_device(device){
        this.root_device = device
    }


    reload(){
        this.new_device = null
        this.selected_device = null
        this.is_on_area = false
        this.moveDevice = false
        this.changing_params = false
        this.root_device = null
        this.connecting_dependence = false
    }
}

export default new ReleState()