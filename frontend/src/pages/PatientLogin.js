import React from "react";
import { Form, Input, Button, Card } from 'antd';

const PatientLogin = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card style={{
            backgroundColor: "#f5f5f5",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "50%"
        }}>
            <Form>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
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

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={() =>
                        console.log("here")
                    }>
                        Create New Account
                    </Button>
                </Form.Item>
            </Form>
        </Card >
    );
};

export default PatientLogin;