import {
    QuestionCircleOutlined,
    AppstoreOutlined,
    UserOutlined,
    TableOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState} from 'react';

const MainMenu = (state) => {
    const { openedPage, setOpenedPage} = state

    const [collapsed, setCollapsed] = useState(false);
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const menuItems = [
        getItem('Объекты', 'objects', <AppstoreOutlined />),
        getItem('Пользователи', 'users', <UserOutlined />),
        getItem('Каталог', 'catalog', <TableOutlined />),
        getItem('Помощь', 'help', <QuestionCircleOutlined />,)
    ];

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleClick = (e) => {
        setOpenedPage(e.key)
    };

    return (
        <>
        <div
        >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
            </Button>
            <Menu
                defaultSelectedKeys={[openedPage]}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={menuItems}
                onClick={handleClick}
            />
        </div>
    </>
    );
};
export default MainMenu;