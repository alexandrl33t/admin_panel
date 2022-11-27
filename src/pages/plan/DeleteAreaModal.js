import React from 'react';
import {Modal} from "antd";

const DeleteAreaModal = (props) => {
    const {deleteModal, setDeleteModal, deleteArea, item} = props

    const hideModal = () => {
        setDeleteModal(false);
    };

    const onDelete = () =>{
        deleteArea();
        hideModal()
    }
    return (
        <>
            {item?.name && (
                <Modal
                    title="Вы дейтсвительно хотите удалить эту область?"
                    open={deleteModal}
                    onOk={onDelete}
                    onCancel={hideModal}
                    okText="Удалить"
                    cancelText="Отмена"
                >
                    <h2>
                        {item.name}
                    </h2>
                </Modal>
            )}

        </>
    );
};

export default DeleteAreaModal;