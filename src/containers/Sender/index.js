import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";

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

const Sender = () => {
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
        <TextField id="plateno" label="Plaka No" variant="outlined" fullWidth />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="driverFullname"
          label="Sürücü Adı Soyadı"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="driverPhone"
          label="Sürücü Telefon No"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="startAddressAddress"
          label="Başlangıç Adresi"
          variant="outlined"
          fullWidth
          multiline={true}
          rows={2}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="outlined" startIcon={<LocationOnIcon />}>
          Konum
        </Button>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="googleMapsLink"
          label="Map Link"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        <Grid item xs={6}>
          <TextField id="long" label="longitude" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField id="lat" label="latitude" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="inventory"
          label="Envanterler"
          variant="outlined"
          fullWidth
          multiline={true}
          rows={5}
        />
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Typography variant="h6">Alıcı Ekle</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="deliveryFullname"
          label="Alıcı Adı Soyadı"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="deliveryPhone"
          label="Sürücü Telefon No"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="address"
          label="Teslim Adresi"
          variant="outlined"
          fullWidth
          multiline={true}
          rows={2}
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        <Grid item xs={6}>
          <TextField
            id="deliveryLong"
            label="longitude"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="deliveryLat"
            label="latitude"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="deliveryGoogleMapsLink"
          label="Map Link"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="outlined" startIcon={<AddIcon />}>
          Ekle
        </Button>
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

      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="contained">Kayıt Oluştur</Button>
      </Grid>
    </Grid>
  );
};

export default Sender;
