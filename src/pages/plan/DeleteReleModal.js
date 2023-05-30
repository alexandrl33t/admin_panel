import React from 'react';
import canvasStateForLoad from "../../store/canvasStateForLoad";
import {Modal} from "antd";
import ReleState from "../../store/DeviceState";

const DeleteReleModal = (props) => {
    const {deleteModal, setDeleteModal, deleteDevice, deleteDependence} = props

    const hideModal = () => {
        setDeleteModal(false)
    };

    const onDelete = () =>{
        if (ReleState.selected_device) {
            if (ReleState.selected_device.type === 'device') {
                deleteDevice()

            } else {
                deleteDependence()
            }
        }
        setDeleteModal(false)
    }
    return (
        <Modal
            title="Подтверждение"
            open={deleteModal}
            onOk={onDelete}
            onCancel={hideModal}
            okText="Удалить"
            cancelText="Отмена"
        >
            <h2>
                Вы действительно хотите удалить {ReleState?.selected_device?.name}
            </h2>
        </Modal>
    );
};

export default DeleteReleModal;