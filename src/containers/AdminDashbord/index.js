import { useState } from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GoogleIcon from "@mui/icons-material/Google";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";

import { useRef } from "react";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMemo } from "react";

function createData(
  plateNo,
  deliveryFullname,
  deliveryPhone,
  lon,
  lat,
  driverStatus,
  receiverStatus
) {
  return {
    plateNo,
    deliveryFullname,
    deliveryPhone,
    lon,
    lat,
    driverStatus,
    receiverStatus,
  };
}

const rows = [
  createData("07GG001", "Ali Kaan", "5XXXX", null, null, 0, 0),
  createData("07GG002", "Emirhan", "5XXXX", "36.543522", "32.006791", 1, 0),
  createData("07GG003", "Onur", "5XXXX", "36.536852", "31.998780", 2, 2),
  createData("07GG004", "Özge", "5XXXX", "36.542550", "31.991545", 2, 3),
  createData(
    "07GG005",
    "Ezgi",
    "5XXXX",
    "36.55420276708866",
    "31.973623320040062",
    2,
    1
  ),
];

const AdminDashboard = () => {
  const [defaultCenter, setDefaultCenter] = useState([38.9637, 35.2433]);

  const [searchText, setSearchText] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // const eventHandlers = useMapEvents({
  //   click() {
  //     const marker = markerRef.current;
  //     mapRef.flyTo(marker.getLatLng(), 16);
  //   },
  // });

  const eventHandlers = useMemo(
    () => ({
      click() {
        const marker = markerRef.current;
        if (marker != null) {
          setDefaultCenter([marker.getLatLng().lat, marker.getLatLng().lng]);
          mapRef.current.flyTo(marker.getLatLng(), 16);
        }
      },
    }),
    []
  );

  const handleLocateMap = (cargo) => {
    console.log(cargo);

    setDefaultCenter([cargo.lon, cargo.lat]);
    mapRef.current.flyTo([cargo.lon, cargo.lat], 16);
  };

  const handleDriverStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <Chip
            label="Kargo Yola Çıkmadı"
            color="warning"
            size="small"
            variant="outlined"
          />
        );

      case 1:
        return (
          <Chip
            label="Kargo Yolda"
            color="primary"
            size="small"
            variant="outlined"
          />
        );

      case 2:
        return (
          <Chip
            label="Kargo Teslim Edildi"
            color="success"
            size="small"
            variant="outlined"
          />
        );

      default:
        return <></>;
    }
  };

  const handleReceiverStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <Chip
            label="Alıcı Teslim Bekliyor"
            color="primary"
            size="small"
            variant="outlined"
          />
        );

      case 1:
        return (
          <Chip
            label="Alıcı Teslim Aldı, Envanter tam."
            color="success"
            size="small"
            variant="outlined"
          />
        );

      case 2:
        return (
          <Chip
            label="Alıcı Teslim Aldı, Envanter eksik."
            color="error"
            size="small"
            variant="outlined"
          />
        );

      case 3:
        return (
          <Chip
            label="Alıcı Teslim Alamadı."
            color="warning"
            size="small"
            variant="outlined"
          />
        );

      default:
        return <></>;
    }
  };

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
            ref={mapRef}
            center={defaultCenter}
            zoom={6}
            style={{
              width: "100%",
              height: "400px",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {rows
              .filter((q) => q.lat != null && q.lon != null)
              .map((vehicleCoordinate, index) => (
                <Marker
                  key={index}
                  position={[vehicleCoordinate?.lon, vehicleCoordinate?.lat]}
                  // ref={markerRef}
                  // eventHandlers={eventHandlers}
                >
                  <Popup>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <span>{`Plaka No: ${vehicleCoordinate?.plateNo}`}</span>
                      <span>{`Şoför: ${vehicleCoordinate?.deliveryFullname}`}</span>
                      <span>{`Telefon: ${vehicleCoordinate?.deliveryPhone}`}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </Grid>
        <Divider />

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={6}>
            <OutlinedInput
              value={searchText}
              onChange={(e) => setSearchText(e?.target?.value)}
              onKeyDown={(e) => (e?.key == "Escape" ? setSearchText("") : "")}
              fullWidth={true}
              placeholder="Plaka veya Telefon yazıp arayın.."
              endAdornment={
                searchText?.length > 0 ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchText("")}>
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
            ></OutlinedInput>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "700" }}>
                    Şoför Kargo Durumu
                  </TableCell>

                  <TableCell align="center" style={{ fontWeight: "700" }}>
                    Alıcı Kargo Durumu
                  </TableCell>

                  <TableCell align="center" style={{ fontWeight: "700" }}>
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
                      {handleDriverStatus(row?.driverStatus)}
                    </TableCell>
                    <TableCell align="center">
                      {handleReceiverStatus(row?.receiverStatus)}
                    </TableCell>
                    <TableCell align="center">{row.plateNo}</TableCell>
                    <TableCell align="center">{row.deliveryFullname}</TableCell>
                    <TableCell align="center">{row.deliveryPhone}</TableCell>
                    <TableCell
                      align="right"
                      style={{ display: "flex", gap: "2px" }}
                    >
                      {row?.lon != null && row?.lat != null ? (
                        <>
                          <Tooltip title="Araç konumunu haritada gösterir.">
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ textTransform: "none" }}
                              onClick={() => handleLocateMap(row)}
                            >
                              <LocationOnIcon />
                              Konum
                            </Button>
                          </Tooltip>
                          <Tooltip title="Araç konumunu google haritada gösterir.">
                            <IconButton
                              onClick={() => {
                                window.open(
                                  `https://www.google.com/maps/@${row?.lon},${row?.lat},22z`,
                                  "_blank",
                                  "noreferrer"
                                );
                              }}
                            >
                              <GoogleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Araç konumuna google haritadan adres tarifi al.">
                            <IconButton
                              onClick={() => {
                                window.open(
                                  ` https://www.google.com/maps?saddr=My+Location&daddr=${row?.lon},${row?.lat}`,
                                  "_blank",
                                  "noreferrer"
                                );
                              }}
                            >
                              <AndroidIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Araç konumuna apple haritadan adres tarifi al.">
                            <IconButton
                              onClick={() => {
                                window.open(
                                  `https://maps.apple.com/place?q=${row?.lon},${row?.lat}&ll=${row?.lon},${row?.lat}&z=18,`,
                                  "_blank",
                                  "noreferrer"
                                );
                              }}
                            >
                              <AppleIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip title="Araç konumunu haritada gösterir.">
                          <Button
                            variant="outlined"
                            size="small"
                            style={{ textTransform: "none" }}
                            disabled={true}
                          >
                            <LocationOnIcon />
                            Konu Bilgisi Yok
                          </Button>
                        </Tooltip>
                      )}
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
