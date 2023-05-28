import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";
import canvasStateForDraw from "./canvasStateForDraw";
import canvasStateForLoad from "./canvasStateForLoad";

/**
 * Хранилище зависимостей
 */
class DevicesStore {

    devices = []

    constructor() {
        makeAutoObservable(this)
    }

    addDevice(item) {
        item.type = "dependence"
        if (imgDimensions.size_k !== 1){
            item.points.x /= imgDimensions.size_k
            item.points.y /= imgDimensions.size_k
        }
        this.devices.push(item)
    }

    deleteDevices(item) {
        const index = this.devices.indexOf(item)
        this.devices.splice(index, 1)
        canvasStateForDraw.reload()
        canvasStateForLoad.reload()
    }

    callForDevices = async () => {
         await fetch(`http://96890a116fb0.sn.mynetname.net:8000/api/device`)
            .then(response => response.json())
             .then(data => {
                 this.devices = data
                 console.log(this.devices)
             })
             .catch(err => console.log(err))
    }

}

export default new DevicesStore()