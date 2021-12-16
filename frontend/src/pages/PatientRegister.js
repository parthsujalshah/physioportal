import React from "react";
import { Form, Input, Button, Card } from 'antd';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../constants";

const PatientRegister = () => {
    const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post(`${apiUrl}/auth/users/register/`, {
            "user": {
                "email": values.email,
                "password": values.password,
                "userType": "PATIENT",
            }
        })
            .then(res => {
                console.log(res.data.user);
                localStorage.setItem('authToken', res.data.user.token);
                localStorage.setItem('userType', res.data.user.userType);
                history.push('/patient/home');
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

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={() => {
                        history.push('/');
                    }}>
                        Login with Exisiting Account
                    </Button>
                </Form.Item>
            </Form>
        </Card >
    );
};

export default PatientRegister;