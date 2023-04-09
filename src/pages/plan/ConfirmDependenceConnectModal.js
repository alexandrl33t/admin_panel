import React from 'react';
import {Form, Modal} from "antd";
import deviceState from "../../store/deviceState";

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
                        Вы действительно хотите подключить зависимость <h2>{deviceState?.new_device?.name}</h2>
                        к устройству <h2>{deviceState?.selected_device?.name}</h2>
                    </p>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConfirmDependenceConnectModal;