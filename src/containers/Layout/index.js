import { Card, CardContent, Typography } from "@mui/material";
import { Fragment } from "react";

const Layout = ({ title, children }) => {
  return (
    <Card style={{ margin: "24px" }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default Layout;
