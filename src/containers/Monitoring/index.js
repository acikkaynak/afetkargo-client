import { Button, Divider, Grid, Link, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoLocation from "../GeoLocation";

function createData(
  deliveryFullname,
  deliveryPhone,
  address,
  deliveryGoogleMapsLink
) {
  return { deliveryFullname, deliveryPhone, address, deliveryGoogleMapsLink };
}

const rows = [
  createData(
    "Emirhan",
    "05553902323",
    "Bağcılar",
    "https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
  ),
  createData(
    "Demirhan",
    "05553902323",
    "Yağcılar",
    "https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
  ),
  createData(
    "Cemirhan",
    "05553902323",
    "Dağcılar",
    "https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
  ),
];

const Monitoring = () => {
  const navigate = useNavigate();

  const [senderData, setSenderData] = useState({
    code: "",
    plateNo: "",
    driverFullname: "",
    driverPhone: "",
    inventory: "",
    startAddressAddress: "",
    long: "",
    lat: "",
    googleMapsLink: "",
    endAddressList: [
      {
        deliveryFullname: "",
        deliveryPhone: "",
        address: "",
        deliveryLong: "",
        deliveryLat: "",
        deliveryGoogleMapsLink: "",
      },
    ],
    partialcount: 0,
  });

  const driverOnRoad = () => {
    //endpoint çağır
    
  }

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
      }}
    >
      <GeoLocation />
      <Grid item xs={12}>
        <Typography variant="h4">afetkargo | Lojistik İzleme</Typography>
      </Grid>

      <Divider />

      <Grid item xs={12}>
        <Typography variant="h6">Başlangıç adres bilgisi</Typography>
      </Grid>

      <Grid item xs={12}>
        <Link
          href="https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
          color="inherit"
          target={"_blank"}
        >
          Başlangıç Adresini Haritada Göster
        </Link>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "700" }}>
                  Alıcı Ad Soyad
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "700" }}>
                  Telefon No
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "700" }}>
                  Adresi
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "700" }}>
                  Adres Linki
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.deliveryFullname}
                  </TableCell>
                  <TableCell align="center">{row.deliveryPhone}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="right">
                    <Link
                      href={row.deliveryGoogleMapsLink}
                      color="inherit"
                      target={"_blank"}
                    >
                      Haritada Göster
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
      >
        <Button variant="contained" onClick={driverOnRoad}>Yola çıktım</Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "green" }}
          onClick={() => navigate("/teslim")}
        >
          Teslim Ettim
        </Button>
      </Grid>
    </Grid>
  );
};

export default Monitoring;
