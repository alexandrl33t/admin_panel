import React from 'react';
import '../../App.css';
import {Col, Row, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {urls} from "../../routes/urls";

function ShowObjects() {
    // const getObjecyts = () => {
    //     /**
    //      * здесь должны с сервера возвращаться объекты со всеми необходимыми полями
    //      * (пока сделал статический массив для проверки компонента)
    //      * **/
    //     return
    // }
    //временно
    /**
     * Нужно доработать систему, чтобы подгоняла изображение по фиксированному размеру.
     * **/
    const objects = [
        {
            id: "12GTS1234",
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://salon.ru/storage/thumbs/gallery/273/272772/5000_5000_s257.jpg',
        },
        {
            id: "55GDSD1S34",
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://if.cdnstroy.ru/fveqh3lncrbw5_1cqwhsl/top-10-neudachnyh-planirovok-kvartir-v-novostroykah-foto-1.jpeg',
        },
        {
            id: "23DSAGTS5554",
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://s0.rbk.ru/v6_top_pics/media/img/5/00/756281448063005.jpg',
        },
        {
            id: "12GTSD2334",
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://pr-flat.ru/upload/medialibrary/306/306d8b91f396e2b02d6bbbf7b8445a4a.jpg',
        },
        {
            id: "12DSSS1333",
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://s0.rbk.ru/v6_top_pics/media/img/5/60/756281458904605.jpg',
        },
        {
            id: "11AKMSD2346",
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://www.only-remontkvartir.ru/upload/iblock/29a/29a4d01f9562c66633757f0a921b56c2.jpg',
        },

    ]




    return (
        <div style={{marginTop: "20px"}}>
            <Row gutter={[24, 24]}>
                {objects?.map((object) =>

                    <Col span={8}>
                        <div className="objectBox">
                        <div className="innerBorder">
                        <Row>
                            <div className="object-pic">
                                <div className="picSmaller">
                                    <img className="absolute" src={object.src} alt="Нет фото"/>
                                </div>
                            </div>
                        </Row>
                        </div>
                        <Row style={{margin:"5px 5px 5px 0", color:"black", padding:"10px 10px 2px 5px"}}>
                            <Col span={22} style={{marginTop:5}}>
                                {object.fullAdress}
                            </Col>
                            <Col span={2}>
                                <div className="info">
                                    <Tooltip title="Информация об объекте">
                                        <a href={urls.objectDetails(object.id)}><InfoCircleOutlined height={15} style={{fontSize:"25px"}} /></a>
                                    </Tooltip>
                                </div>
                            </Col>

                        </Row>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default ShowObjects;