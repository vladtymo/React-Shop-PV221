import React from 'react';
import { Breadcrumb, Layout as AntdLayout, Menu, theme } from 'antd';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const { Header, Content, Footer } = AntdLayout;

const items = [
    {
        index: 0,
        label: "Home"
    },
    {
        index: 1,
        label: "Products"
    },
    {
        index: 2,
        label: "Orders"
    }
];

export default function Layout() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AntdLayout>
            <Header
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
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >

                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        marginTop: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </AntdLayout>
    )
}
