import React, {useState} from 'react';
import {ButtonStyled} from "../../styledAntd";
import {CanvasBox} from "../../components/CanvasBox";
import ToolBar from "../../components/ToolBar";
import {Col, Row} from "antd";

const Plan = (props) => {
    const {newObject} = props
    const [showUploadButton, setShowUploadButton] = useState(false)
    const plan = {
        id: 1,
        name: 'ExamplePlan',
        url: "https://wpmedia.roomsketcher.com/content/uploads/2022/03/31095248/blue-green-2d-floor-plan.jpg"
    }


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
            {showUploadButton ? (
                <>

                </>
                ) :
                ( <>
                    {newObject ?
                        (
                            <div style={styleButton}>
                                <ButtonStyled onClick={() => {setShowUploadButton(true)}}>Создать план</ButtonStyled>
                            </div>
                        ) :
                        (<div style={{marginTop: 5}}>
                                <Row gutter={[24, 24]}>
                                    <Col span={24}>
                                        <ToolBar />
                                    </Col>
                                </Row>
                                <CanvasBox plan={plan}/>

                            </div>
                        )}
                    </>
                )
            }

        </>
    )
}
export default Plan