import React from 'react';
import '../../../App.css';
import {Col, Row} from "antd";

const Notifications= () => {

    // const {objectID} = props

    const notifications = [
        /**
         * Уведомления под общей информацией. Со структурой нужно определиться.
         * (приходят с бека). Запрос по id
         * */
        {
            date: "2022.10.24 17:45",
            channel: "1.3",
            text: "размыкание датчика без замка",
        },
        {
            date: "2022.15.24 17:45",
            channel: "2.1",
            text: "SAM Низкий заряд батареи",
        },
        {
            date: "2022.17.24 17:45",
            channel: "1.5",
            text: "TAH Низкий заряд батареи",
        },
    ]
    return (
        <>
            {notifications?.map((notification) =>
                <Row>
                    <Col span={6}>
                        {notification.date}
                    </Col>
                    <Col span={2}>
                        {notification.channel}
                    </Col>
                    <Col span={16}>
                        {notification.text}
                    </Col>
                </Row>
            )}
        </>
    )
}

export default Notifications;