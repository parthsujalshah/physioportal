import React from "react";
import { Button, List } from "antd";
import axios from "axios";
import { apiUrl, listColors } from "../constants";
import { useHistory } from "react-router-dom";

const PatientHome = props => {

    const history = useHistory();
    const colors = listColors;

    const [list, setList] = React.useState([
        { "doctor_email": "doctor@gmail.com" }
    ]);

    React.useEffect(() => {
        axios.get(`${apiUrl}/twp/`, {
            headers: {
                Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            console.log(res.data);
            setList(res.data);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div style={{ width: "50%" }}>
            <List
                style={{
                    width: "100%",
                    padding: 20
                }}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item, index) => {
                    console.log(item);
                    return (
                        <List.Item style={{
                            backgroundColor: colors[index % 2],
                            width: "100%"
                        }}>
                            <List.Item.Meta
                                title={item['doctor_email']}
                                description="Allow this doctor to acces your exercise data"
                            />
                            <Button type="primary" onClick={() => {
                                axios.patch(`${apiUrl}/twp/${item['id']}/`, {
                                    "status": "ALLOWED"
                                }, {
                                    headers: {
                                        Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
                                    }
                                }).then(res => {
                                    console.log(res);
                                    history.push('/patient/home');
                                    axios.get(`${apiUrl}/twp/`, {
                                        headers: {
                                            Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
                                        }
                                    }).then(res => {
                                        console.log(res.data);
                                        setList(res.data);
                                    }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                            }}>Allow</Button>
                            <div style={{ marginLeft: 20 }} />
                            <Button type="primary" danger onClick={() => {
                                axios.patch(`${apiUrl}/twp/${item['id']}/`, {
                                    "status": "ALLOWED"
                                }, {
                                    headers: {
                                        Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
                                    }
                                }).then(res => {
                                    console.log(res);
                                    history.push('/patient/home');
                                    axios.get(`${apiUrl}/twp/`, {
                                        headers: {
                                            Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
                                        }
                                    }).then(res => {
                                        console.log(res.data);
                                        setList(res.data);
                                    }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                            }}>Deny</Button>
                        </List.Item>
                    )
                }}
            />
            <br />
            <Button onClick={() => {
                localStorage.removeItem('authToken');
                history.push('/');
            }}>Logout</Button>
        </div>
    );
};

export default PatientHome