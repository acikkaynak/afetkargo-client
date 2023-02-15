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
    // TODO: Add endpoint implementation
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    setShowMessage(true);
    setMessage("Beklenmedik bir hata oluştu.");
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "14px",
            }}
            component="form"
            onSubmit={handleSubmit}
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
                id="username"
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="password"
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
