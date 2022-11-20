import React from 'react';
import {Modal} from "antd";

const DeleteAreaModal = (props) => {
    const {deleteModal, setDeleteModal, deleteArea} = props

    const hideModal = () => {
        setDeleteModal(false);
    };

    const onDelete = () =>{
        deleteArea();
        hideModal()
    }
    return (
        <>
            <Modal
                title="Вы дейтсвительно хотите удалить эту область?"
                open={deleteModal}
                onOk={onDelete}
                onCancel={hideModal}
                okText="Удалить"
                cancelText="Отмена"
            >
                <p></p>
            </Modal>
        </>
    );
};

export default DeleteAreaModal;