import AbstractDevice from "./AbstractDevice";
import canvasStateForLoad from "../store/canvasStateForLoad";

export default class Device extends AbstractDevice{

    is_on_item = false
    cursor_drag_point = null


    constructor(canvas, device) {
        super(canvas);
        this.addDevice(device)
        this.plan_id = canvasStateForLoad.plan_id
        this.type = "device"
        this.listen();
    }

}