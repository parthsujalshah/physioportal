import React from "react";
import { List, Button, Modal, Input, Form, Affix } from "antd";
import axios from "axios";
import { apiUrl, listColors } from "../constants";
import { useHistory } from "react-router-dom";

const DoctorHome = props => {
    const history = useHistory();
    const colors = listColors;

    const [data, setData] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [modal2Visible, setModal2Visible] = React.useState(false);
    const [scoreList, setScoreList] = React.useState([{
        "average_score": 24.09,
        "date_time_performed": "13r2"
    }]);
    const [top, setTop] = React.useState(10);

    React.useEffect(() => {
        axios.get(`${apiUrl}/exercise/doctor-patient-list/`, {
            headers: {
                Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
            }
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <Affix style={{
                marginLeft: "70%"
            }}>
                <Button type="primary" onClick={() => {
                    setIsModalVisible(true);
                }} danger>
                    Link New Patient
                </Button>
            </Affix>
            <Modal title="Link New Patient" visible={isModalVisible} onOk={() => {
                setIsModalVisible(false);
            }} onCancel={() => {
                setIsModalVisible(false);
            }}>
                <Form onFinish={(val) => {
                    console.log(val);
                    axios.post(`${apiUrl}/twp/`, val, {
                        headers: {
                            Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
                        }
                    }).then(res => {
                        console.log(res.data);
                    }).catch(err => console.log(err));
                }}>
                    <Form.Item label="Email" name="patient">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal visible={modal2Visible} onOk={() => setModal2Visible(false)} onCancel={() => setModal2Visible(false)}>
                <List
                    bordered
                    dataSource={scoreList}
                    renderItem={(item, index) => (
                        <List.Item style={{
                            justifyContent: "space-between",
                            display: "flex",
                            backgroundColor: colors[index % 2]
                        }}>
                            <strong><p>{item['date_time_performed']}</p></strong>
                            <p>{item['average_score']}</p>
                        </List.Item>
                    )}
                />
            </Modal>
            <List style={{ width: "50%" }}
                bordered
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item style={{
                        justifyContent: "space-between",
                        display: "flex",
                        backgroundColor: colors[index % 2]
                    }}>
                        <strong><p style={{ fontSize: 20 }}>{item['email']}</p></strong>
                        <Button onClick={() => {
                            axios.get(`${apiUrl}/exercise/doctor-patient-exercise-list/${item['id']}/`, {
                                headers: {
                                    Authorization: `Bearer Token ${localStorage.getItem('authToken')}`
                                }
                            }).then(res => {
                                console.log(res.data);
                                var l = []
                                for (var i in res.data) {
                                    var s = res.data[parseInt(i)].date_time_performed.split(":")[0];
                                    l.push({
                                        "average_score": res.data[parseInt(i)]['average_score'],
                                        "date_time_performed": s.slice(0, s.length - 3)
                                    });
                                }
                                var s = res.data[0].date_time_performed.split(":")[0];
                                console.log(s.slice(0, s.length - 3));
                                setModal2Visible(true);
                                console.log('L', l)
                                setScoreList(l);
                            }).catch(err => console.log(err));
                        }}>See Details</Button>
                    </List.Item>
                )}
            />
            <br />
            <Button onClick={() => {
                localStorage.removeItem('authToken');
                history.push('/');
            }}>Logout</Button>
        </div>
    );
};

export default DoctorHome;