import {
    QuestionCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    UserOutlined,
    TableOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';
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
const MainMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div
            style={{
                width: 256,
            }}
        >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={menuItems}
            />
        </div>
    );
};
export default MainMenu;