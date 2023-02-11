import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import registerRequest from "../../api/registerRequest";
import { Box } from "@mui/system";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleRegisterRequest = async () => {
    let data = {
      name: "string",
      surname: "string",
      email: "string",
      phone: "string",
      password: "string",
      registeryNo: "string",
      companyName: "string",
      roleId: 1,
    };
    const result = await registerRequest(data);
    console.log(result);
  };
  return (
    <>
      <Header text="Kayıt İşlemleri" />
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
          >
            <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h4">afetkargo</Typography>
            </StyledGrid>

            <StyledGrid item xs={12}>
              <Avatar sx={{ bgcolor: pink[500] }}>
                <LockIcon htmlColor="white" />
              </Avatar>
            </StyledGrid>

            <StyledGrid item xs={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h6">Kayıt Ol</Typography>
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField id="name" label="Ad" variant="outlined" fullWidth />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="surname"
                label="Soyad"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <Box component="form" onSubmit={handleSubmit}>
              <StyledGrid item xs={12}>
                <TextField
                  id="email"
                  label="E-Mail"
                  variant="outlined"
                  fullWidth
                />
              </StyledGrid>
              <StyledGrid item xs={12}>
                <TextField
                  id="phone"
                  label="Telefon No:"
                  variant="outlined"
                  fullWidth
                />
              </StyledGrid>
              <StyledGrid item xs={12}>
                <TextField
                  id="company"
                  label="Şirket Adı"
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
              <StyledGrid item xs={12}>
                <TextField
                  id="plateno"
                  label="Plaka No"
                  variant="outlined"
                  fullWidth
                />
              </StyledGrid>
              <StyledGrid item xs={12} style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  style={{ textTransform: "none" }}
                  onClick={() => handleRegisterRequest()}
                >
                  Kayıt Ol
                </Button>
              </StyledGrid>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
