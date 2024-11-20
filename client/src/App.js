import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import UserLogin from "./components/user/userLogin";
import UserRegister from "./components/user/userRegister";
import EmployeeLogin from "./components/employee/employeeLogin";
import EmployeRegister from "./components/employee/employeeRegister";
import UserDashboard from "./components/user/UserDashboard";
import EmpDashboard from "./components/employee/EmpDarshboard";
import UpdateStock from "./components/bloodbank/UpdateStock";
import UpdateHealth from "./components/bloodbank/UpdateHealth";
import Donate from "./components/layout/Donate";
import Search from "./components/bloodbank/Search";
import HandleRequest from "./components/bloodbank/HandleRequest";
//import Request from "./components/bloodbank/Request";
import HomePage from "./components/layout/HomePage";
import AboutUs from "./components/layout/AboutUs";
 import backgroundImage1 from "./assets/img/bg5.png"

//
import RequestClass from "./components/bloodbank/RequestClass";

//css
import "./App.css";

const styles = {
  header: {
    backgroundImage: `url(${backgroundImage1})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },

  content: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0.1, 0.1, 0.1, 0.1)',
    color: 'white'
  }
}

function App() {
  return (
    <div className="App" style={styles.header}>
      <div style={styles.content}>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<HomePage />} />
        <Route exact path="/homepage" element={<HomePage />} />
        <Route exact path="/home" element={<Dashboard />} />
        <Route exact path="/donate" element={<Donate />} />
        <Route exact path="/login" element={<Donate />} />
        <Route exact path="/login/usr" element={<UserLogin />} />
        <Route exact path="/login/emp" element={<EmployeeLogin />} />
        <Route exact path="/reg/usr" element={<UserRegister />} />
        <Route exact path="/reg/emp" element={<EmployeRegister />} />
        <Route exact path="/login/usr/dash" element={<UserDashboard />} />
        <Route exact path="/login/emp/dash" element={<EmpDashboard />} />
        <Route exact path="/login/emp/ub" element={<UpdateStock />} />
        <Route exact path="/login/emp/uh" element={<UpdateHealth />} />
        <Route exact path="/home/search/blood" element={<Search />} />
        <Route exact path="/request" element={<RequestClass />} />
        <Route exact path="/login/emp/hr" element={<HandleRequest />} />
        <Route exact path="/AboutUs" element={<AboutUs />} />
        {/* <Route exact path="/login/usr/dash/req" element={Request}/> */}
      </Routes>
      </div>
    </div>
  );
}

export default App;
