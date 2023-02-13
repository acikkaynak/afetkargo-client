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
import Register from "./containers/Register";
import Landing from "./containers/Landing";
import DeliveryLogin from "./containers/DeliveryLogin";
import DriverKvkk from "./containers/DriverKvkk";
import ReceiverKvkk from "./containers/ReceiverKvkk";
import ReactGA from "react-ga";
import CookiePolicy from "./containers/CookiePolicy";
import KvkkPolicy from "./containers/KvkkPolicy";

const TRACKING_ID = process.env.REACT_APP_GA_CODE;

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

function App() {
  ReactGA.initialize(TRACKING_ID);

  return (
    <Wrapper>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/" element={<Landing />} />
        <Route path="/delivery-login" element={<DeliveryLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route path="/register" element={<Register />} />
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
        <Route
          path="/driver-kvkk"
          element={
            <Layout>
              <DriverKvkk />
            </Layout>
          }
        />
        <Route
          path="/receiver-kvkk"
          element={
            <Layout>
              <ReceiverKvkk />
            </Layout>
          }
        />
        <Route
          path="/cerez-politikasi"
          element={
            <Layout>
              <CookiePolicy />
            </Layout>
          }
        />
        <Route
          path="/kvkk-aydinlatma-metni"
          element={
            <Layout>
              <KvkkPolicy />
            </Layout>
          }
        />
        <Route
          path="/gizlilik-politikasi"
          element={
            <Layout>
              <KvkkPolicy />
            </Layout>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
