import React from 'react'
import { Layout as AntdLayout } from 'antd';

const { Footer: AntdFooter } = AntdLayout;

export default function Footer() {
    return (
        <AntdFooter
            style={{
                textAlign: 'center',
            }}
        >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </AntdFooter>
    )
}
