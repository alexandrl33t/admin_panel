import React from 'react';
import {Form, Modal} from "antd";
import ReleState from "../../store/ReleState";

const ConfirmReleModal = (props) => {

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
                            Вы действительно хотите добавить реле <h2>{ReleState?.new_device?.name}</h2>
                            в область <h2>{ReleState?.new_device?.area_name}</h2>
                        </p>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default ConfirmReleModal;