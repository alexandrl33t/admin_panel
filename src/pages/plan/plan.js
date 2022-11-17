import React from 'react';
import {ButtonStyled} from "../../styledAntd";
import camera from "../../static/img/icons/camera.png"
import useImage from "use-image"
import {CanvasBox} from "../../components/CanvasBox";
import ToolBar from "../../components/ToolBar";

const Plan = (props) => {
    const {newObject} = props
    const [image] = useImage(camera, "NONE");


    const imageUrl = "https://wpmedia.roomsketcher.com/content/uploads/2022/03/31095248/blue-green-2d-floor-plan.jpg";


    const styleButton = {
        alignContent: "center",
        width: "100%",
        height: "100%",
        marginTop: "6%",
        position: "absolute",
        textAlign: "center",
    }
    return (
        <>
            {newObject ?
                (
                    <div style={styleButton}>
                        <ButtonStyled>Создать план</ButtonStyled>
                    </div>
                ) :
                (<div style={{marginTop: 5}}>
                                    <ToolBar />
                                    <CanvasBox imageUrl={imageUrl}/>
                    </div>
                )

            }
        </>
    )
}
export default Plan