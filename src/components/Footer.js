import { Grid, Typography } from "@mui/material";

const Footer = () => {
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

        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 700 }}>
            Afetkargo’ya nasıl kayıt olabilirim?
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 500 }}>Gönderici olarak..</Typography>
          <Typography sx={{ fontWeight: 500 }}>Sürücü olarak..</Typography>
          <Typography sx={{ fontWeight: 500 }}>Alıcı olarak..</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
