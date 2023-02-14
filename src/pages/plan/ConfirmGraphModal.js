import React, {useState} from 'react';
import {Form, Input, message, Modal} from "antd";
const ConfirmGraphModal = (props) => {

    const [nameConfirm, setNameConfirm] = useState(false)
    const {confirmModal, setConfirmModal, createGraph, form} = props


    const okHandle = () => {
        setConfirmModal(false)
        setNameConfirm(true)
    }

    const okName = () => {
        if (!form.getFieldValue("graphName")){
            message.error("Пожалуйста, введите название графа")
            return
        }
        createGraph();
        setNameConfirm(false)
    }

    return (
        <>
            <Modal
                title="Подтверждение"
                open={confirmModal}
                onOk={okHandle}
                onCancel={() => {
                    setConfirmModal(false)
                }}
                okText="Сохранить"
                cancelText="Отмена"
            >
                        <p>
                            Вы хотите объединить устройства на плане?
                        </p>
            </Modal>
            <Modal
                title="Введите название графа"
                open={nameConfirm}
                onOk={okName}
                onCancel={() => {
                    setNameConfirm(false)
                }}
                okText="Сохранить"
                cancelText="Отмена"
            >
                <Form.Item name="graphName">
                    <Input placeholder="Название графа" />
                </Form.Item>
            </Modal>
        </>
    );
};

export default ConfirmGraphModal;