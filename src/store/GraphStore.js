import {makeAutoObservable} from "mobx";
import {imgDimensions} from "../components/CanvasBox";

/**
 * Хранилище графов
 */
class GraphStore {

    graphs = []

    constructor() {
        makeAutoObservable(this)
    }

    addGraph(item) {
        item.type = "graph"
        if (imgDimensions.size_k !== 1){
            item.points.x /= imgDimensions.size_k
            item.points.y /= imgDimensions.size_k
        }
        this.graphs.push(item)
    }
}

export default new GraphStore()