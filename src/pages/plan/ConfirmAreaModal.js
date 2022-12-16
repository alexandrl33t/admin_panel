import React from 'react';
import {Form, Input, Modal, message} from "antd";
import canvasStateForDraw from "../../store/canvasStateForDraw";
import toolState from "../../store/toolState";

const ConfirmAreaModal = (props) => {
    const {confirmModal, setConfirmModal, saveArea} = props
    const [form] = Form.useForm();
    const hideModal = () => {
        toolState.setTool(null)
        canvasStateForDraw.reload()
        setConfirmModal(false);
    };

    const okHandle = () =>{
        toolState.setTool(null)
        const name = form.getFieldValue("name")
        if (name){
            saveArea(name);
            hideModal()
        } else {
            message.error("Пожалуйста, введите название области.").then(()=>{})
        }

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