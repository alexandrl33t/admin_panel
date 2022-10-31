import React from 'react';
import {Row} from "antd";
import Header from "./components/header";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/router";

const App = () => {


    return (
        <>
            <Row>
                <Header />
            </Row>
            <Row>
                <div style={{marginTop:20}}>
                    <React.StrictMode>
                        <RouterProvider router={router} />
                    </React.StrictMode>
                </div>

            </Row>
        </>
    )
}

export default App;