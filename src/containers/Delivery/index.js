import { useState, useEffect } from "react";
import styled from "styled-components";
import "../../../src/index.css"

import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const StyledMarker = styled(Marker)`
`;

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

const Delivery = () => {
  const [age, setAge] = useState("");
  const DEFAULT_CENTER = [41.018646, 28.945409];

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [senderData, setSenderData] = useState({
    code: "",
    plateNo: "07GG056",
    driverFullname: "Özge",
    driverPhone: "05334443322",
    startAddressAddress: "Saray, 07400 Alanya/Antalya",
    inventory: "Keski aleti",
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
      <Grid item xs={12}>
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={13}
          scrollWheelZoom={false}
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <StyledMarker position={DEFAULT_CENTER} id="marker-wrapper" >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </StyledMarker>
        </MapContainer>
      </Grid>

      <Divider />
      <Grid item xs={12}>
        <TextField
          value={senderData.plateNo}
          id="plateno"
          label="Plaka No"
          variant="outlined"
          fullWidth
          disabled={true}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          value={senderData.driverFullname}
          id="driverFullname"
          label="Sürücü Adı Soyadı"
          variant="outlined"
          fullWidth
          disabled={true}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          value={senderData.driverPhone}
          id="driverPhone"
          label="Sürücü Telefon No"
          variant="outlined"
          fullWidth
          disabled={true}
        />
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
        <TextField
          value={senderData.inventory}
          id="inventory"
          label="Envanterler"
          variant="outlined"
          fullWidth
          multiline={true}
          rows={5}
          disabled={true}
        />
      </Grid>
      <Divider />

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
                <TableCell align="right" style={{ fontWeight: "700" }}>
                  Adresi
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
                  <TableCell align="right">{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Divider />

      <Grid
        item
        xs={12}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <Typography variant="h6">Teslimat Durumu</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Durumu</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Teslim alındı, envanter tam.</MenuItem>
            <MenuItem value={20}>Teslim alındı, envanter eksik.</MenuItem>
            <MenuItem value={30}>Teslim alınmadı.</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="deliveryNote"
          label="Teslim Açıklaması"
          variant="outlined"
          multiline={true}
          rows={3}
          fullWidth
        />

        <Button variant="contained">Teslimatı Bildir</Button>
      </Grid>
    </Grid>
  );
};

export default Delivery;
