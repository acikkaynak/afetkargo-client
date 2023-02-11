import {
    Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
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
    "34KLJ23",
    "Ali Kaan",
    "087897887879",
    "https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
  ),
  createData(
    "34DSJ234",
    "Onur Güngör",
    "087897887879",
    "https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
  ),
  createData(
    "34KEWJ25",
    "Ali Kaan",
    "087897887879",
    "https://www.google.com/maps/place/Crystal+Admiral+Resort+Suites+%26+SPA/@36.6949113,31.6098093,13.75z/data=!4m8!3m7!1s0x14c3536c30bc9b99:0x5cbeef369867e031!5m2!4m1!1i2!8m2!3d36.6950891!4d31.5976238"
  ),
];
const AdminDashboard = () => {
  const DEFAULT_CENTER = [41.018646, 28.945409];
  const [senderData, setSenderData] = useState({
    code: "#12345678",
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

  const StyledMarker = styled(Marker)``;
  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "24px",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">afetkargo | Admin Dashboard</Typography>
        </Grid>
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
            <StyledMarker position={DEFAULT_CENTER} id="marker-wrapper">
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </StyledMarker>
          </MapContainer>
        </Grid>
        <Divider />

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "700" }}>
                    Plaka No
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "700" }}>
                    Şöför Adı Soyadı
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "700" }}>
                    Telefon No
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "700" }}>
                    Nerede
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
                        <Button variant="outlined">
                            Konum
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default AdminDashboard;
