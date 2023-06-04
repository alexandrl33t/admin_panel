import React, {useEffect, useState} from 'react';
import '../../../App.css';
import {Col, Form, Row} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {ButtonStyled} from "../../../styledAntd";
import ObjectCommonInfoNotEdit from "./ObjectCommonInfoNotEdit";
import ObjectCommonInfoEdit from "./ObjectCommonInfoEdit";
import {useForm} from "antd/es/form/Form";
import ObjectStore from "../../../store/ObjectStore";
import {reaction} from "mobx";
import {observer} from "mobx-react-lite";

const ObjectCommonInfo = observer((props) => {
    const {newObject} = props
    const [form] = useForm()
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        if (form) {
            form.setFieldValue("address", ObjectStore.objectData.address)
        }
    }, [ObjectStore.objectData.address])

    const object = {
        number: "15f5bda5-f9c0-45de-8037-49d9df375166",
        customer: "",
        others: "",
        address: "",
        phoneNumber: "8999999999",
        email: "sdsdsds@mail.ru",
        comments: "rararara",
    }

    const onFinish = (values: any) => {
        console.log(values)
        setEdit(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const changeInfo = () => {
        setEdit(true)
    }

    return (
        <>
            <div className="object-info">
                <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                >
                <h2>
                    <Row gutter={[24, 24]}>
                        <Col span={8}>
                            Объект:
                        </Col>
                        <Col span={8}>
                            №{object.number}
                        </Col>
                        <Col span={2}>
                            <ButtonStyled onClick={changeInfo} icon={<EditOutlined />}></ButtonStyled>
                        </Col>
                    </Row></h2>
                {edit ? (
                    <ObjectCommonInfoEdit object={object}/>
                ) : (
                    <ObjectCommonInfoNotEdit object={object}/>
                )}
                </Form>
            </div>
        </>
    )

}
);
export default ObjectCommonInfo;