import React from 'react';
import { Layout as AntdLayout, theme } from 'antd';
import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

const { Content } = AntdLayout;

export default function Layout() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AntdLayout className='Layout'>
            <Header />

            <Content
                className='main'
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

            <Footer />
        </AntdLayout>
    )
}
