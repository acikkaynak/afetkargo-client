import { Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const CookiePolicy = () => {
  const navigate = useNavigate();

  return (
    <Grid>
      <Grid>
        
      </Grid>
      <Grid>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Geri Dön
        </Button>
      </Grid>
    </Grid>
  );
};
export default CookiePolicy;
