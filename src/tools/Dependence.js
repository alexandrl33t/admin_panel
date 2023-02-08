import AbstractDevice from "./AbstractDevice";
import canvasStateForLoad from "../store/canvasStateForLoad";

export default class Dependence extends AbstractDevice{

    is_on_item = false
    cursor_drag_point = null
    type = ""

    constructor(canvas, device) {
        super(canvas);
        this.addDevice(device)
        this.plan_id = canvasStateForLoad.plan_id
        this.type = "dependence"
        this.listen();
    }

}