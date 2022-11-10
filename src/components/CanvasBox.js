import React, {useEffect, useRef} from 'react';

export const CanvasBox = (props) => {

    const {imageUrl} = props

    const canvasRef = useRef(null)

    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas){
            return
        }
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const context = canvas.getContext('2d');
        if(!context){
            return;
        }
        context.fillRect(0,0,100,100)
    }, [])

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    )
}