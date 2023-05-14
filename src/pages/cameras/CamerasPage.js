import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import {Col, Row} from "antd";

const CamerasPage = () => {
    const [size, setSize] = useState({width: 250, height: 200})

    return (
        <div className="content-under-menu">
         <div className="camera">
             <ReactPlayer
                 url="http://96890a116fb0.sn.mynetname.net:9555"
                 controls
                 width={size.width}
                 height={size.height}
             />
         </div>
            <div className="camera">
                <ReactPlayer
                    url="<https://www.youtube.com/watch?v=dQw4w9WgXcQ>"
                    controls
                    width={size.width}
                    height={size.height}
                />
            </div>
            <div className="camera">
                <ReactPlayer
                    url="<https://www.youtube.com/watch?v=dQw4w9WgXcQ>"
                    controls
                    width={size.width}
                    height={size.height}
                />
            </div>
            <div className="camera">
                <ReactPlayer
                    url="<https://www.youtube.com/watch?v=dQw4w9WgXcQ>"
                    controls
                    width={size.width}
                    height={size.height}
                />
            </div>
            <div className="camera">
                <ReactPlayer
                    url="<https://www.youtube.com/watch?v=dQw4w9WgXcQ>"
                    controls
                    width={size.width}
                    height={size.height}
                />
            </div>
            <div className="camera">
                <ReactPlayer
                    url="<https://www.youtube.com/watch?v=dQw4w9WgXcQ>"
                    controls
                    width={size.width}
                    height={size.height}
                />
            </div>
        </div>
    );
};

export default CamerasPage;