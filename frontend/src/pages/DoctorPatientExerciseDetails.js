import React from "react";
import { List, Button } from "antd";
import { listColors } from "../constants";

const DoctorPatientExerciseDetails = props => {

    const colors = listColors;
    const [data, setData] = React.useState(["temp"]);

    React.useEffect(() => {
        setData([
            { "date_time_performed": "rn3rn", "average_score": 26.08 },
            { "date_time_performed": "rn3rn", "average_score": 26.08 },
        ]);
    }, []);

    return (
        <List style={{ width: "50%" }}
            bordered
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item style={{
                    justifyContent: "space-between",
                    display: "flex",
                    backgroundColor: colors[index % 2]
                }}>
                    <strong><p>{item['date_time_performed']} - {item['date_time_performed']}</p></strong>
                    <p>{item['average_score']}</p>
                </List.Item>
            )}
        />
    );
};

export default DoctorPatientExerciseDetails;