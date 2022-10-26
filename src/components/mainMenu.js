import {
    QuestionCircleOutlined,
    AppstoreOutlined,
    UserOutlined,
    TableOutlined, MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import { Button} from 'antd';
import React, { useState} from 'react';
import {MenuStyled} from "../styledAntd";

const MainMenu = (state) => {
    const { openedPage, setOpenedPage, setSpan, spans} = state

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
        getItem('Пользователи', 'users', <UserOutlined  />),
        getItem('Каталог', 'catalog', <TableOutlined />),
        getItem('Помощь', 'help', <QuestionCircleOutlined />,)
    ];

    const toggleCollapsed = () => {
        if (!collapsed) {
            setSpan(spans.collapsed)
        } else {
            setSpan(spans.notCollapsed)
        }
        setCollapsed(!collapsed);
    };

    const handleClick = (e) => {
        setOpenedPage(e.key)
    };

    return (
        <>
        <div
            id="menuContainter">
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <MenuStyled
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