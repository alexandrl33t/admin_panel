import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";
import canvasStateForDraw from "./canvasStateForDraw";
import canvasStateForLoad from "./canvasStateForLoad";

/**
 * Хранилище реле
 */
class ReleStore {

    reles = []

    constructor() {
        makeAutoObservable(this)
    }

    addRele(item){
        item.type = "device"
        if (imgDimensions.size_k !== 1){
            item.points.x /= imgDimensions.size_k
            item.points.y /= imgDimensions.size_k
        }
        //подсчет вектора
        // if (this.devices.length > 0) {
        //     for (let i =0; i< this.devices.length; i++) {
        //         if (this.devices[i].belongs_to_graph) {
        //             continue;
        //         }
        //         let vector = {
        //             x: Math.abs(this.devices[i].points.x - item.points.x),
        //             y: Math.abs(this.devices[i].points.y - item.points.y)
        //         }
        //         vector.lenght = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
        //         if (vector.lenght < 100) {
        //
        //         }
        //     }
        // }

        this.reles.push(item)
    }

    deleteRele(item) {
        const index = this.reles.indexOf(item)
        this.reles.splice(index, 1)
        canvasStateForDraw.reload()
        canvasStateForLoad.reload()
    }

}

export default new ReleStore()