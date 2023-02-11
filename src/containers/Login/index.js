import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        gap: "14px",
        maxWidth: "375px",
        margin: "10% auto",
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
        <Typography variant="h6">Giriş Yap</Typography>
      </StyledGrid>

      <StyledGrid item xs={12}>
        <TextField id="plateno" label="Plaka No" variant="outlined" fullWidth />
      </StyledGrid>

      <StyledGrid item xs={12}>
        <TextField id="password" label="Şifre" variant="outlined" fullWidth />
      </StyledGrid>

      <StyledGrid item xs={12} style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          fullWidth={true}
          style={{ textTransform: "none" }}
          onClick={() => navigate("/kayit")}
        >
          Giriş yap
        </Button>
      </StyledGrid>
    </Grid>
  );
};

export default Login;
