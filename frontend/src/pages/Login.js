import React from "react";
import { Form, Input, Button, Card } from 'antd';
import axios from "axios";
import { apiUrl } from "../constants";
import { useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post(`${apiUrl}/auth/users/login/`, {
            "user": values
        })
            .then(res => {
                console.log(res.data);
                localStorage.setItem("authToken", res.data.user.token);
                localStorage.setItem("userType", res.data.user.userType);
                if (res.data.user.userType === 'PATIENT') {
                    history.push('/patient/home');
                } else {
                    history.push('/doctor/home');
                }
            })
            .catch(err => console.log(err))
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
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name={'email'}
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
                    <Button onClick={() => {
                        history.push('/patient/register');
                    }}>
                        Create New Patient Account
                    </Button>
                </Form.Item>
            </Form>
        </Card >
    );
};

export default Login;