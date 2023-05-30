import React, {useState} from 'react';
import {Col, Row, Upload, message, Form} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Вы можете загрузить изображение только формата JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Изображение должно быт ьменьше 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const CreateUserAdditionalInfo = (props) => {
    const {form} = props;

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                form.setFieldValue('avatar', url)
            });
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Row>
                <Col>
                    <Form.Item
                        name="avatar"
                        label=""
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default CreateUserAdditionalInfo;