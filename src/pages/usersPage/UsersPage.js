import React from 'react';
import {Col, Row} from "antd";
import Search from "antd/es/input/Search";
import { Table} from 'antd';
import '../../App.css';
import {ButtonStyled} from "../../styledAntd";
import {PlusOutlined} from "@ant-design/icons";
import {urls} from "../../routes/urls";
import {useNavigate} from "react-router-dom";
// import {useNavigate} from "react-router-dom";

const UsersPage = () => {
    const navigateTo = useNavigate();
    const data = [
        {
            key: '1',
            login: 'jhonee',
            role: 'Administrator',
            surname: 'Brown',
            name: 'John',
            patronymic: 'Сергеевич',
            birth: '20.03.1992',
        },
        {
            key: '2',
            login: 'Someee32',
            role: 'Manager',
            surname: 'White',
            name: 'Walter',
            patronymic: 'Heizenbergovich',
            birth: '20.03.1970',
        },
        {
            key: '3',
            login: 'soul',
            role: 'Observer',
            surname: 'Soul',
            name: 'Goodman',
            patronymic: 'Advokatovich',
            birth: '20.03.1922',
        },
    ];

    const columns = [
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
            render: (text) => <a href="/#">{text}</a>,
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отчество',
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birth',
            key: 'birth',
        },
    ]

    const onSearch = () => {
        console.log(1)
    };

    const createUser = () => {
        navigateTo(urls.createUser)
    }

    return (
        <>
            <Row gutter={[0, 32]}>
                <Col span={24}>
                    <Search placeholder="Искать" onSearch={onSearch} />
                </Col>

            </Row>

            <Row style={{marginTop: 20}} gutter={[24,24]}>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                </Col>
            </Row>
            <Row style={{marginTop: 20}}  gutter={[24,24]}>
                <Col span={4}>
                    <ButtonStyled icon={<PlusOutlined />} onClick={createUser}>Добавить пользователя</ButtonStyled>
                </Col>
            </Row>
        </>
    );
}

export default UsersPage;