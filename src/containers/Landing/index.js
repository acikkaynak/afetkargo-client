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
            style={{
              display: "flex",
              flexDirection:"column",
              justifyContent: "center",
              alignContent: "center",
              gap: "14px",
            }}
          >
            <Button variant="contained" onClick={()=> navigate('/login')}>Sürücüyüm</Button>
            <Button variant="contained" onClick={()=> navigate('/kayit')}>Kargo Göndermek İstiyorum</Button>
            <Button variant="contained" onClick={()=> navigate('/teslim')}>Alıcıyım</Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
