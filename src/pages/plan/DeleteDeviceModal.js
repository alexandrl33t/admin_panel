import React from 'react';
import canvasStateForLoad from "../../store/canvasStateForLoad";
import {Modal} from "antd";
import deviceState from "../../store/deviceState";

const DeleteDeviceModal = (props) => {
    const {deleteModal, setDeleteModal, deleteDevice, deleteDependence} = props

    const hideModal = () => {
        setDeleteModal(false)
    };

    const onDelete = () =>{
        if (deviceState.selected_device) {
            if (deviceState.selected_device.type === 'device') {
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
                Вы действительно хотите удалить {deviceState?.selected_device?.name}
            </h2>
        </Modal>
    );
};

export default DeleteDeviceModal;