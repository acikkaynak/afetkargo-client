import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid, Typography
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";

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
              <Typography variant="h4">afetkargo</Typography>
            </StyledGrid>

            <StyledGrid item xs={12}>
              <Avatar sx={{ bgcolor: pink[500] }}>
                <ContactSupportIcon htmlColor="white" />
              </Avatar>
            </StyledGrid>

            <Button variant="contained" onClick={() => navigate("/login")}>
              Sürücüyüm
            </Button>
            <Button variant="contained" onClick={() => navigate("/kayit")}>
              Kargo Göndermek İstiyorum
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/delivery-login")}
            >
              Alıcıyım
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
