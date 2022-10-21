import React from 'react';
import '../../App.css';
import {Col, Row} from "antd";

function ShowObjects() {

    // const getObjects = () => {
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
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://salon.ru/storage/thumbs/gallery/273/272772/5000_5000_s257.jpg',
        },
        {
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://if.cdnstroy.ru/fveqh3lncrbw5_1cqwhsl/top-10-neudachnyh-planirovok-kvartir-v-novostroykah-foto-1.jpeg',
        },
        {
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://s0.rbk.ru/v6_top_pics/media/img/5/00/756281448063005.jpg',
        },
        {
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://pr-flat.ru/upload/medialibrary/306/306d8b91f396e2b02d6bbbf7b8445a4a.jpg',
        },
        {
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://s0.rbk.ru/v6_top_pics/media/img/5/60/756281458904605.jpg',
        },
        {
            type: 'flat',
            fullAdress: 'г.Москва, ул. Тутуту, д.3, кв.7',
            src: 'https://www.only-remontkvartir.ru/upload/iblock/29a/29a4d01f9562c66633757f0a921b56c2.jpg',
        },

    ]




    return (
        <div style={{marginTop: 20}}>
            <Row gutter={[24, 24]}>
                {objects?.map((object) =>
                    <Col span={8}>
                        <Row>
                            <div className="objectPic">
                                <div className="picSmaller">
                                    <img className="absolute" src={object.src} alt="Нет фото"/>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            {object.fullAdress}
                        </Row>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default ShowObjects;