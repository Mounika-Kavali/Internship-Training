import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/HomePage/Home";
import Services from "./components/ServicesPage/Services";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ServiceDetails from './components/ServicesPage/ServiceDetails'
import Payment from "./components/ServicesPage/Payment";
class App extends Component {
  render() {
    return (
      <>
      
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Registration" element={<RegistrationForm />}>
            {/* <Route path="/login/forgot-password" element={<ForgotPassword />} /> */}
          </Route>
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="home" element={<Home />}>
            <Route path="services" element={<Services />}>
              {/* <Route path="service-details" element={<ServiceDetails/>}></Route> */}
            </Route>
            <Route path="about-us" element={<AboutUs />}></Route>
            <Route path="contact-us" element={<ContactUs />}></Route>
          </Route>
          <Route path="/home/services/service-detailz" element={<ServiceDetails/>}/>
          <Route path="/home/services/service-detailz/payment" element={<Payment/>}/>
          
        </Routes>
      </>
    );
  }
}

export default App;
