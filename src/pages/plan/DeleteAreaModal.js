import React from 'react';
import {Modal} from "antd";
import canvasStateForLoad from "../../store/canvasStateForLoad";
import canvasStateForDraw from "../../store/canvasStateForDraw";

const DeleteAreaModal = (props) => {
    const {deleteModal, setDeleteModal, deleteArea} = props

    const hideModal = () => {
        canvasStateForLoad.reload()
        canvasStateForDraw.reload()
        setDeleteModal(false);
    };

    const onDelete = () =>{
        deleteArea();
        hideModal()
    }
    return (
        <>
            {canvasStateForLoad?.delete_item?.name && (
                <Modal
                    title="Вы дейтсвительно хотите удалить эту область?"
                    open={deleteModal}
                    onOk={onDelete}
                    onCancel={hideModal}
                    okText="Удалить"
                    cancelText="Отмена"
                >
                    <h2>
                        {canvasStateForLoad.delete_item.name}
                    </h2>
                </Modal>
            )}

        </>
    );
};

export default DeleteAreaModal;