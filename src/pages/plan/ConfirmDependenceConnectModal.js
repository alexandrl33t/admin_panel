import React from 'react';
import {Form, Modal} from "antd";
import ReleState from "../../store/ReleState";

const ConfirmDependenceConnectModal = (props) => {
    const {confirmModal, setConfirmModal, connectFunc} = props
    const [form] = Form.useForm();

    const hideModal = () => {
        setConfirmModal(false);
    };

    const okHandle = () =>{
        setConfirmModal(false);
        connectFunc()
    }

    return (
        <Modal
            title="Подтверждение подключения зависимости"
            open={confirmModal}
            onOk={okHandle}
            onCancel={hideModal}
            okText="Сохранить"
            cancelText="Отмена"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="device">
                    <p>
                        Вы действительно хотите подключить зависимость <strong>{ReleState?.new_device?.name}</strong> к реле <strong>{ReleState?.selected_device?.name}</strong>
                    </p>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConfirmDependenceConnectModal;