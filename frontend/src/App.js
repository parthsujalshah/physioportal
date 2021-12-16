import React from 'react';
import 'antd/dist/antd.css';
import DoctorPatientExerciseDetails from "./pages/DoctorPatientExerciseDetails";
import DoctorHome from "./pages/DoctorHome";
import Login from "./pages/Login";
import PatientHome from "./pages/PatientHome";
import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div style={{
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/doctor/home" exact component={DoctorHome} />
          <Route path="/" exact component={Login} />
          {/* <Route path="/doctor/patient-exercies" exact component={DoctorPatientExerciseDetails} /> */}
          <Route path="/patient/home" exact component={PatientHome} />
          <Route path="/patient/register" exact component={PatientRegister} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
