import '../../App.css';
import Header from "../../components/header";
import MainMenu from "../../components/mainMenu";
import React, {useState} from "react";
import Objects from "../objects/objects";
import {Col, Row} from "antd";
function HomePage() {

    const pages = {
        'objects' : <Objects />,
    };

    const [openedPage, setOpenedPage] = useState('objects')

    return (
        <>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col span={6}>
                    <MainMenu openedPage={openedPage} setOpenedPage={setOpenedPage}/>
                </Col>
                <Col span={18}>
                    {pages[openedPage]}
                </Col>
            </Row>

        </>
    );
}

export default HomePage;