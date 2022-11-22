import {makeAutoObservable} from "mobx";
/**
 * Стейт курсора
 */
class CursorState {

    states = {
        default : () => {this.state = "default"},
        pointer : ()=>{this.state = "pointer"},
        crosshair: ()=>{this.state = "crosshair"},
        move: ()=>{this.state = "move"},
        grab: ()=>{this.state = "grab"},
        grabbing: ()=>{this.state = "grabbing"},
    }

    state = null


    constructor() {
        makeAutoObservable(this)
        this.state = this.states.default
    }


}

export default new CursorState()