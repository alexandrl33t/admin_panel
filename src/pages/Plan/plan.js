import React from 'react';
import {ButtonStyled} from "../../styledAntd";

const Plan = (props) => {
    const {newObject} = props


    const styleButton = {
        alignContent:"center",
        width:"100%",
        height:"100%",
        marginTop:"6%",
        position:"absolute",
        textAlign:"center",
    }

    return (
        <>
            {newObject ?
                (
                    <div style={styleButton}>
                        <ButtonStyled >Создать план</ButtonStyled>
                    </div>
                ) :
                (
                    <div>Hello</div>
                )

            }
        </>
    )
}
export default Plan