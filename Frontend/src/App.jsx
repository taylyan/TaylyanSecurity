import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Devices from "./components/Devices";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddUser from "./components/AddUser";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import axios from "axios";
import AddDevice from "./components/AddDevice";
import EditDevice from "./components/EditDevice";
import DeleteDevice from "./components/DeleteDevice";
import ThingSpeakData from "./components/Thingspeak";
import DeviceCard from "./components/DeviceCard";
import Footer from "./components/Footer"
import About from "./components/About"
import Contact from "./components/Contact";

function App() {
  const [role, setRole] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
    .then(res => {
      if(res.data.login) {
        setRole(res.data.role)
      } else {
       setRole('') 
      }
      console.log(res)
    }).catch(err => console.log(err))
  }, [])
  return (
    <BrowserRouter>
      <Navbar role = {role}/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/devices" element={<Devices role = {role}/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login setRoleVar = {setRole}/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/thingspeak" element={<ThingSpeakData />}></Route>
        <Route path="/adduser" element={<AddUser />}></Route>
        <Route path="/logout" element={<Logout setRole = {setRole}/>}></Route>
        <Route path="/adddevice" element={<AddDevice />}></Route>
        <Route path="/device/:id" element={<EditDevice />}></Route>
        <Route path="/delete/:id" element={<DeleteDevice />}></Route>
        <Route path="/email" element={<DeviceCard />}></Route>

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
