import React from "react";
import Delivery from "./containers/Delivery";
import Login from "./containers/Login";
import Monitoring from "./containers/Monitoring";
import Sender from "./containers/Sender";
import AdminLogin from "./containers/AdminLogin";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Layout from "./containers/Layout";
import AdminDashboard from "./containers/AdminDashbord";

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />
          <Route
            path="/kayit"
            element={
              <Layout>
                <Sender />
              </Layout>
            }
          />
          <Route
            path="/izle"
            element={
              <Layout>
                <Monitoring />
              </Layout>
            }
          />
          <Route
            path="/teslim"
            element={
              <Layout>
                <Delivery />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
