import React from 'react';
import {ButtonStyled} from "../../styledAntd";
import camera from "../../static/img/icons/camera.png"
import useImage from "use-image"
import { Grid} from '@material-ui/core';
import {CanvasBox} from "../../components/CanvasBox";

const Plan = (props) => {
    const {newObject} = props
    const [image] = useImage(camera, "NONE");


    const imageUrl = "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png";


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
                (<div style={{marginTop: 50}}>
                        <Grid container spacing={4}>
                            <Grid item xs>s
                                <div id="grid-container">
                                    <CanvasBox imageUrl={imageUrl} />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )

            }
        </>
    )
}
export default Plan