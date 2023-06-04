import '../../App.css';
import MainMenu from "../../components/mainMenu";
import React, {useEffect, useState} from "react";
import Objects from "../objects/Objects";
import {Col, Drawer, Row} from "antd";
import UsersPage from "../usersPage/UsersPage";
import Catalog from "../catalog/Catalog";
import {ButtonStyled} from "../../styledAntd";
import {MenuUnfoldOutlined} from "@ant-design/icons";
function HomePage(state) {
    const {bg} = state

    const [open, setOpen] = useState(false);
    // const spans = {
    //     notCollapsed: {menu:6, rightSide: 18},
    //     collapsed: {menu:1, rightSide: 23},
    // }
    // const [span, setSpan] = useState(spans.notCollapsed)

    const pages = {
        'objects' : <Objects />,
        'users' : <UsersPage />,
        'catalog': <Catalog />,
    };

    const [openedPage, setOpenedPage] = useState('objects')


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        setOpen(false);
    }, [openedPage])

    return (
        <div className={bg}>
                <Row>
                    <Col span={1}>
                        <ButtonStyled style={{margin:10}}  icon={<MenuUnfoldOutlined />} onClick={showDrawer}>
                        </ButtonStyled>
                            <Drawer title="Меню"
                                    placement='left'
                                    closable={false}
                                    onClose={onClose}
                                    open={open}
                                    >
                                <MainMenu openedPage={openedPage} setOpenedPage={setOpenedPage}/>
                            </Drawer>
                    </Col>
                    <Col span={23}>
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