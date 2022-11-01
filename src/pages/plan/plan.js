import React, {useState} from 'react';
import {ButtonStyled} from "../../styledAntd";
import { Image} from "react-konva";
import camera from "../../static/img/icons/camera.png"
import { useCropper} from "./hooks/useCropper";
import useImage from "use-image"
import ReactCursorPosition from 'react-cursor-position';
import Box from "../../components/box";
import {makeStyles} from "@material-ui/core/styles";
import { boxSize} from "../../config";
import { Grid} from '@material-ui/core';
import ToolBar from "./ToolBar";

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: `calc(150 * ${boxSize + 1})`
    },
});

/* --------------------------------------------
Returns an empty grid of size (100 x 150)
----------------------------------------------- */
const initializeSheet = () => {
    const rows = [];
    // Create 100 rows
    for (let i = 0; i < 40; i++) {

        const curRow = [];
        for (let j = 0; j < 70; j++) {
            // Create 100 boxes in each row
            curRow.push({
                row: i,
                col: j,
                isWall: false
            })
        }
        // add current row to rows array
        rows.push({
            index: i,
            elements: curRow
        });

    }
    return rows;
};

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

    }


    let devices = [
    {
            id:0,
            image: <Image
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
            id:1,
            image:  <Image
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

    const src = "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png"

    const classes = useStyles();
    const [sheet, setSheet] = useState(initializeSheet);

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
                (<>
                    <Grid container>
                        <Grid item>
                            <ToolBar />
                        </Grid>
                        <Grid item xs style={{ height: 'calc(100vh - 64px)', overflow: 'scroll' }}>
                            <div id="grid-container" className={classes.container}>
                                {sheet.map((row) =>
                                    <div key={row.index}
                                         style={{
                                             whiteSpace: 'nowrap',
                                             fontSize: 0
                                         }}>

                                        {row.elements.map((box) =>
                                            <ReactCursorPosition key={box.col} style={{ display: 'inline-block' }}>
                                                <Box imageSrc={src} boxProps={box} />
                                            </ReactCursorPosition>
                                        )}

                                    </div>

                                )}

                            </div>
                        </Grid>
                    </Grid>

                    </>
                )

            }
        </>
    )
}
export default Plan