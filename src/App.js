import React from "react";
import Delivery from "./containers/Delivery";
import Login from "./containers/Login";
import Monitoring from "./containers/Monitoring";
import Sender from "./containers/Sender";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Layout from "./containers/Layout";

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
          <Route
            path="/kayit"
            element={
              <Layout title="Lojistik Bildirimi">
                <Sender />
              </Layout>
            }
          />
          <Route path="/izle" element={<Monitoring />} />
          <Route path="/teslim" element={<Delivery />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
