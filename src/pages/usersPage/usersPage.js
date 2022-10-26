import React from 'react';
import {Col, Row} from "antd";
import Search from "antd/es/input/Search";
import '../../App.css';
import ShowObjects from "../objects/showObjects";

const UsersPage = () => {



    const onSearch = () => {
        console.log(1)
    };


    return (
        <>
            <Row gutter={[0, 32]}>
                <Col span={24}>
                    <Search placeholder="Искать" onSearch={onSearch} />
                </Col>

            </Row>

            <ShowObjects />
        </>
    );
}

export default UsersPage;