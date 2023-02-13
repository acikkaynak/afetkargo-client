import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        style={{
          display: "flex",
          gap: "24px",
          padding: "24px",
          maxWidth: "500px",
        }}
      >
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 700 }}>Afet Kargo Nedir?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 500 }}>
            Afetkargo, afet bölgesine yardım için gönderilen kargoya ait taşıtın
            gönderici firma ve alıcılar tarafından takip edilmesine olanak
            sağlar.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 700 }}>
            Afetkargo nasıl çalışır?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 500 }}>
            Gönderici firma yardım için gönderdiği taşıta dair plaka, taşıdığı
            envanter, kalkış noktası ve varış noktası bilgilerini panel
            üzerinden girer. Sürücü yola çıktığında afetkargo sitesi üzerinden
            yola çıktığı bilgisini girer ve siteyi tarayıcı üzerinde açık tutar.
            Bu sayede sürücünün konum bilgisi gönderici ve alıcı tarafından
            anlık olarak takip edilir. Sürücü varış noktasına ulaşıp teslim
            ettiğinde bu bilgiyi sisteme girer. Varış noktasındaki alıcı da
            kargoyu teslim aldığı ve envanterin eksiksiz olduğu bilgilerini
            sisteme girerek teyit eder. Varış noktasına ulaşan tır ve envantere
            ait liste, envanter dağıtımı yapacak motorkuryeler tarafından
            görüntülenir.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Typography
            sx={{ fontWeight: 700 }}
            onClick={() => navigate("/cerez-politikasi")}
          >
            Çerez Politikası
          </Typography>
          <Typography
            sx={{ fontWeight: 700 }}
            onClick={() => navigate("/gizlilik-politikasi")}
          >
            Gizlilik Politikası
          </Typography>
          <Typography
            sx={{ fontWeight: 700 }}
            onClick={() => navigate("/kvkk-aydinlatma-metni")}
          >
            Aydınlatma Metni
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
