import React from 'react';
import {ButtonStyled} from "../../styledAntd";
import {Layer, Stage, Image, Group} from "react-konva";
import {VideoCameraOutlined} from "@ant-design/icons";

class PlanImage extends React.Component {

    state = {
        image: null
    };
    componentDidMount() {
        const image = new window.Image();
        image.src = this.props.src;
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            this.setState({
                image: image
            });
        };
    }

    render() {
        return <Image image={this.state.image} />;
    }
}
class CameraImage extends React.Component {
    render() {
        return <VideoCameraOutlined />
    }
}

const Plan = (props) => {
    const {newObject} = props

    let camerasArray = []
    for (let i = 1; i <= 10; i++) {
        camerasArray.push()
    }
    const src = "https://images.edrawmax.com/examples/apartment-floor-plan/example4.png"
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
                            <div className="container">
                                <ButtonStyled>Редактировать план</ButtonStyled>
                                <Stage width={1000} height={800}>
                                    <Layer>
                                        <PlanImage src={src} />
                                    </Layer>
                                    <Layer>
                                        <Group draggable>
                                            {
                                                camerasArray.map((item) =>
                                                    <CameraImage /> //доделать прорисовку камер
                                                )
                                            }
                                        </Group>
                                    </Layer>

                                </Stage>
                            </div>
                )

            }
        </>
    )
}
export default Plan