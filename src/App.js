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
                <React.StrictMode>
                    <RouterProvider router={router} />
                </React.StrictMode>
            </Row>
        </>
    )
}

export default App;