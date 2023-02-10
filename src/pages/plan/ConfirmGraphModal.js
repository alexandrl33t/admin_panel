import React from 'react';
import {Modal} from "antd";
const ConfirmGraphModal = (props) => {
    const {confirmModal, setConfirmModal, createGraph} = props

    return (
        <>
            <Modal
                title="Подтверждение"
                open={confirmModal}
                onOk={createGraph}
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

        </>
    );
};

export default ConfirmGraphModal;