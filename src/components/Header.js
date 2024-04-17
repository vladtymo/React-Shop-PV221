import React from 'react'
import { Layout as AntdLayout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, ProductOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = AntdLayout;

export default function Header() {
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
                defaultSelectedKeys={['2']}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <Menu.Item key="1">
                    <HomeOutlined />
                    <span>Home</span>
                    <Link to="/" />
                </Menu.Item>
                <Menu.Item key="2">
                    <ProductOutlined />
                    <span>Products</span>
                    <Link to="/products" />
                </Menu.Item>
                <Menu.Item key="3">
                    <UnorderedListOutlined />
                    <span>Orders</span>
                    <Link to="/orders" />
                </Menu.Item>
                <Menu.Item key="4">
                    <InfoCircleOutlined />
                    <span>About</span>
                    <Link to="/about" />
                </Menu.Item>
            </Menu>
        </AntdHeader>
    )
}
