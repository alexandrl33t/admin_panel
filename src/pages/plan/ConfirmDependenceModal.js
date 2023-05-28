import React from 'react';
import {Form, Modal} from "antd";
import ReleState from "../../store/ReleState";

const ConfirmDependenceModal = (props) => {
    const {confirmModal, setConfirmModal, save} = props
    const [form] = Form.useForm();
    const hideModal = () => {
        setConfirmModal(false);
    };

    const okHandle = () =>{
        setConfirmModal(false);
        if (ReleState?.new_device){
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
                            Вы действительно хотите добавить зависимость <strong>{ReleState?.new_device?.name}</strong> в область <strong>{ReleState?.new_device?.area_name}</strong>
                        </p>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ConfirmDependenceModal;