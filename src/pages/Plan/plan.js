import React from 'react';
import {ButtonStyled} from "../../styledAntd";
import {Layer, Stage, Image} from "react-konva";
import camera from "../../static/img/icons/camera.png"
import { useCropper} from "./hooks/useCropper";
import useImage from "use-image"
import { Portal } from 'react-konva-utils';

/**
 * Возможно нужно переделать с React Drag & Drop:
 * https://tproger.ru/translations/dran-n-drop-with-react/
 * https://habr.com/ru/company/kts/blog/647241/#2
 * */
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

const Plan = (props) => {

    const {newObject} = props
    const [image] = useImage(camera, "NONE");

    const USER_IMAGE_LAYER = {
        width: 50,
        height: 50
        // width: 1162,
        // height: 1155,
    };

    const MASK_LAYER = {
        width: 624,
        height: 591,
    };
    let {
        zoom,
        x,
        y,
        imageRef,
    } = useCropper({
        image: image,
        layer: USER_IMAGE_LAYER,
        maskLayer: MASK_LAYER
    });

    const deleteObject = () =>{
        image.src=""
    }


    let devices = [
    {
        id: <Image
            ref={imageRef}
            image={image}
            x={x}
            y={y}
            draggable
            scaleX={zoom}
            scaleY={zoom}
            onDblClick={deleteObject}
        />,
    },
    {
        id:  <Image
            ref={imageRef}
            image={image}
            x={x}
            y={y}
            draggable
            scaleX={zoom}
            scaleY={zoom}
            onDblClick={deleteObject}
        />,
    },
]

    const addDevice = () => {

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
                                        <Portal enabled={true} selector=".top-layer">
                                            {devices.map((device) =>
                                                device.id
                                            )}
                                        </Portal>
                                        <PlanImage src={src} />
                                    </Layer>
                                        <Layer name="top-layer" />
                                </Stage>
                                <ButtonStyled onClick={addDevice}>Добавить устройство</ButtonStyled>
                            </div>
                )

            }
        </>
    )
}
export default Plan