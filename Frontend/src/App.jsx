import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Order from "./components/Order";
import axios from "axios";


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order></Order>} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
