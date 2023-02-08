import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";

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
}

export default new DependencesStore()