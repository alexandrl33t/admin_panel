import React from 'react';
import '../../../App.css';
import {Col, Row} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {ButtonStyled} from "../../../styledAntd";

const ObjectCommonInfo= (props) => {
    const {newObject} = props

    /**
     * Ниже должны приходить данные об object
     */

    const object = {
        number: "124-312-20",
        client: "some client",
        others: "",
        address: "Tutututututu",
        phoneNumber: "8999999999",
        email: "sdsdsds@mail.ru",
        comments: "rararara",
    }



    const changeInfo = () => {
        if (newObject){
            /** Здесь должно быть заполнение, редактирование и валидация данных
             */
        }
        console.log(object)
    }

    return (
        <>
            <div className="object-info">
                <h2>
                    <Row gutter={[24, 24]}>
                        <Col span={8}>
                            Объект:
                        </Col>
                        <Col span={8}>
                            №{object.number}
                        </Col>
                        <Col span={6}></Col>
                        <Col span={2}>
                            {newObject && (
                                <ButtonStyled onClick={changeInfo} icon={<EditOutlined />}></ButtonStyled>
                            )}
                        </Col>
                    </Row></h2>
                <Row gutter={24}>
                    <Col span={8}>
                        Заказчик:
                    </Col>
                    <Col span={8}>
                        {object.client}
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        Адрес:
                    </Col>
                    <Col span={8}>
                        {object.address}
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        Номер телефона:
                    </Col>
                    <Col span={8}>
                        { object.phoneNumber}
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        E-mail:
                    </Col>
                    <Col span={8}>
                        {object.email}
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        Комментарии:
                    </Col>
                    <Col span={8}>
                        {object.comments}
                    </Col>
                </Row>
            </div>
        </>
    )

}
export default ObjectCommonInfo;