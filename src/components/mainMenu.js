import {
    QuestionCircleOutlined,
    AppstoreOutlined,
    UserOutlined,
    TableOutlined
} from '@ant-design/icons';
import React from 'react';
import {MenuStyled} from "../styledAntd";
import {useNavigate} from "react-router-dom";
import {urls} from "../routes/urls";

const MainMenu = (props) => {
    const {openedPage, setOpenedPage} = props
    // const [collapsed, setCollapsed] = useState(false);
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

    // const toggleCollapsed = () => {
    //     if (!collapsed) {
    //         setSpan(spans.collapsed)
    //     } else {
    //         setSpan(spans.notCollapsed)
    //     }
    //     setCollapsed(!collapsed);
    // };

    const handleClick = (e) => {
        setOpenedPage(e.key)
    };

    return (
        <>
        <>
            {/*<Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>*/}
            {/*    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}*/}
            {/*</Button>*/}
            <MenuStyled
                defaultSelectedKeys={[openedPage]}
                mode="inline"
                theme="light"
                items={menuItems}
                onClick={handleClick}
            />
        </>
    </>
    );
};
export default MainMenu;