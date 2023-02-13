import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import driverLoginRequest from "../../api/driverLoginRequest";
import Header from "../../components/Header";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const KVKKGrid = styled(Grid)`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  box-shadow: 0px 0px 2px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24);
  padding: 20px 40px;
  gap: 20px;
`;

const Login = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = {
      plateNo: data.get("plate").toUpperCase(),
      driverPassword: data.get("password").toUpperCase()
    };
    const result = await driverLoginRequest(formData);
    if (result?.code === 200) {
      localStorage.setItem("afetkargo_surucu", JSON.stringify(result?.data));
      localStorage.setItem("afetkargo_surucu_info", JSON.stringify(formData));
      navigate("/izle");
    } else {
      setShowMessage(true);
      setMessage(result?.message ?? "Beklenmedik bir hata oluştu.");
    }
    console.log(result);
  };
  return (
    <>
      <Header text="Şoför Girişi" />
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
            component="form"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "14px",
            }}
          >
            <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h4">afetkargo</Typography>
            </StyledGrid>

            <StyledGrid item xs={12}>
              <Avatar sx={{ bgcolor: "#000" }}>
                <LockIcon htmlColor="white" />
              </Avatar>
            </StyledGrid>

            <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h6">Giriş Yap</Typography>
            </StyledGrid>

            <StyledGrid item xs={12}>
              <TextField
                id="plateno"
                name="plate"
                label="Plaka No"
                variant="outlined"
                fullWidth
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </StyledGrid>

            <StyledGrid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Şifre"
                variant="outlined"
                fullWidth
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </StyledGrid>

            {showMessage ? (
              <StyledGrid item xs={12}>
                <Alert severity="error" sx={{ width: "100%" }}>
                  {message}
                </Alert>
              </StyledGrid>
            ) : null}

            <StyledGrid item xs={12} style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                fullWidth={true}
                style={{ textTransform: "none" }}
                type="submit"
              >
                Giriş yap
              </Button>
            </StyledGrid>
            <StyledGrid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                fullWidth={true}
                onClick={() => navigate(-1)}
              >
                Anasayfaya Dön
              </Button>
            </StyledGrid>
          </Grid>
        </CardContent>

      </Card>
      <KVKKGrid>
        <span><a href="/driver-kvkk" target={"_blank"}>KVKK Aydınlatma metnini</a> okudum ve kabul ediyorum.</span>
        <Button variant="contained">Kabul Et</Button>
      </KVKKGrid>
    </>
  );
};

export default Login;
