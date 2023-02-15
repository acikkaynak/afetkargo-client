import Footer from "../../components/Footer";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header text="afetkargo" />
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: "14px",
          maxWidth: "375px",
          margin: "10% auto",
        }}
      >
        <CardContent>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: "14px",
            }}
          >
            <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h4">afet kargo</Typography>
            </StyledGrid>

            <StyledGrid item xs={12}>
              <Avatar sx={{ bgcolor: "#000" }}>
                <LocalShippingIcon htmlColor="white" />
              </Avatar>
            </StyledGrid>

            <Button
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Sürücüyüm
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/delivery-login")}
            >
              Alıcıyım
            </Button>
            <Divider />

            <Button variant="contained" onClick={() => navigate("/kayit")}>
              Kargo Göndermek İstiyorum
            </Button>
            <Button variant="contained" onClick={() => navigate("/admin")}>
              İzleyiciyim
            </Button>
          </Grid>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default Login;
