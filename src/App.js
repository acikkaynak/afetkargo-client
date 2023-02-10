import React from "react";
import Delivery from "./containers/Delivery";
import Login from "./containers/Login";
import Monitoring from "./containers/Monitoring";
import Sender from "./containers/Sender";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kayit" element={<Sender />} />
        <Route path="/izle" element={<Monitoring />} />
        <Route path="/teslim" element={<Delivery />} />
      </Routes>
    </Router>
  );
}

export default App;
