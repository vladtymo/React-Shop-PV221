import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { accountsService } from '../server/accounts';
import { tokensService } from '../server/tokens';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Success:', values);

        const res = await accountsService.login(values);

        if (res.status !== 200) {
            message.console.error("Something went wrong!");
            return;
        }

        tokensService.save(res.data);
        message.success("Your logged in successfully!");
        navigate(-1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1 style={center}>Login Form</h1>
            <Form
                name="basic"
                style={{
                    maxWidth: 400,
                    margin: "auto"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={center}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    style={center}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
}