import React from 'react';
import {Form, Modal} from "antd";
import deviceState from "../../store/deviceState";
import canvasStateForLoad from "../../store/canvasStateForLoad";

const ConfirmDeviceModal = (props) => {

    const {confirmModal, setConfirmModal, save} = props
    const [form] = Form.useForm();
    const hideModal = () => {
        setConfirmModal(false);
    };

    const okHandle = () =>{
        setConfirmModal(false);
        if (deviceState?.device){
            save()
        }
    }
    return (
        <>

            <Modal
                title="Подтверждение"
                open={confirmModal}
                onOk={okHandle}
                onCancel={hideModal}
                okText="Сохранить"
                cancelText="Отмена"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="device">
                        <p>
                            Вы действительно хотите добавить устройство <h2>{deviceState?.device?.name}</h2>
                            в область <h2>{deviceState?.device?.area_name}</h2>
                        </p>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default ConfirmDeviceModal;