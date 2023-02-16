import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";
import adminLoginRequest from "../../api/adminLoginRequest";
import jwtDecode from "jwt-decode";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const result = await adminLoginRequest(formData);

    if (result?.code == 200) {
      console.log("local storage yazılan =>", JSON.stringify(result?.data));
      localStorage.setItem("afetkargo_user", JSON.stringify(result?.data));
      navigate("/admin-dashboard");
    } else {
      setShowMessage(true);
      setMessage(result?.message ?? "Beklenmedik bir hata oluştu.");
    }
  };

  return (
    <>
      <Header text="Admin Girişi" />
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
                id="email"
                name="email"
                label="E-posta"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Şifre"
                variant="outlined"
                fullWidth
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
                onClick={() => navigate("/")}
              >
                Anasayfaya Dön
              </Button>
            </StyledGrid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
