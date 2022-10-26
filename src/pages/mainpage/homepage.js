import '../../App.css';
import MainMenu from "../../components/mainMenu";
import React, {useState} from "react";
import Objects from "../objects/objects";
import {Col, Row} from "antd";
import UsersPage from "../usersPage/usersPage";
function HomePage(state) {
    const {bg} = state
    const spans = {
        notCollapsed: {menu:6, rightSide: 18},
        collapsed: {menu:1, rightSide: 23},
    }
    const [span, setSpan] = useState(spans.notCollapsed)

    const pages = {
        'objects' : <Objects />,
        'users' : <UsersPage />,
    };

    const [openedPage, setOpenedPage] = useState('objects')

    return (
        <div className={bg}>
                <Row gutter={[24, 24]}>
                    <Col span={span.menu}>
                        <div >
                        <MainMenu setSpan={setSpan} spans={spans} openedPage={openedPage} setOpenedPage={setOpenedPage}/>
                        </div>
                    </Col>
                    <Col span={span.rightSide}>
                        <div className="right-side" style={{
                        width: "100%",
                    }}>
                            {pages[openedPage]}
                        </div>
                    </Col>
                </Row>
        </div>
    );
}

export default HomePage;