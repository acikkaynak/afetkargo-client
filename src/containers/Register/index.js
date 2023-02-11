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
import Header from "../../components/Header";
import registerRequest from "../../api/registerRequest";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      surname: data.get("surname"),
      phone: data.get("phone"),
      plate: data.get("plateno"),
      company: data.get("company"),
      roleId: 1,
      registeryNo: "",
    };
    handleRegisterRequest(formData);
  };
  const handleRegisterRequest = async (data) => {
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
            component="form"
            onSubmit={handleSubmit}
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
              <TextField
                name="name"
                id="name"
                label="Ad"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="surname"
                name="surname"
                label="Soyad"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>

            <StyledGrid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="E-Mail"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="phone"
                name="phone"
                label="Telefon No:"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="company"
                name="company"
                label="Şirket Adı"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Şifre"
                variant="outlined"
                fullWidth
              />
            </StyledGrid>
            <StyledGrid item xs={12}>
              <TextField
                id="plateno"
                name="plateno"
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
                type="submit"
              >
                Kayıt Ol
              </Button>
            </StyledGrid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
