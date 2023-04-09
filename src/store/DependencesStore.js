import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";
import canvasStateForDraw from "./canvasStateForDraw";
import canvasStateForLoad from "./canvasStateForLoad";

/**
 * Хранилище зависимостей
 */
class DependencesStore {

    dependences = []

    constructor() {
        makeAutoObservable(this)
    }

    addDependence(item) {
        item.type = "dependence"
        if (imgDimensions.size_k !== 1){
            item.points.x /= imgDimensions.size_k
            item.points.y /= imgDimensions.size_k
        }
        this.dependences.push(item)
    }

    deleteDependece(item) {
        const index = this.dependences.indexOf(item)
        this.dependences.splice(index, 1)
        canvasStateForDraw.reload()
        canvasStateForLoad.reload()
    }
}

export default new DependencesStore()