import React, { useEffect, useState } from 'react'
import { Layout as AntdLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, ProductOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = AntdLayout;

const menuItems = [
    {
        key: "/",
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />
    },
    {
        key: "/products",
        label: <Link to="/products">Products</Link>,
        icon: <ProductOutlined />
    },
    {
        key: "/orders",
        label: <Link to="/orders">Orders</Link>,
        icon: <UnorderedListOutlined />
    },
    {
        key: "/about",
        label: <Link to="/about">About</Link>,
        icon: <InfoCircleOutlined />
    }
]

export default function Header() {

    let location = useLocation();

    const [current, setCurrent] = useState(location.pathname);

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    return (
        <AntdHeader
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[current]}
                items={menuItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
            </Menu>
        </AntdHeader>
    )
}
