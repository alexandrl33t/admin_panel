import React from 'react';
import {Form, Input, Modal} from "antd";

const ConfirmAreaModal = (props) => {
    const {confirmModal, setConfirmModal, saveArea} = props
    const [form] = Form.useForm();
    const hideModal = () => {
        setConfirmModal(false);
    };

    const okHandle = () =>{
        const name = form.getFieldValue("name")
        saveArea(name);
        hideModal()
    }
    return (
        <>

                <Modal
                    title="Пожалуйста, введите название области"
                    open={confirmModal}
                    onOk={okHandle}
                    onCancel={hideModal}
                    okText="Сохранить"
                    cancelText="Отмена"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="name">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

        </>
    );
};

export default ConfirmAreaModal;