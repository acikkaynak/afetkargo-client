import { useState } from "react";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GoogleIcon from "@mui/icons-material/Google";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRef } from "react";
import {
  Alert,
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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMemo } from "react";
import { useEffect } from "react";
import TablePaginationActions from "../../components/TablePagination";
import getCargoListWithPagination from "../../api/getCargoListWithPagination";
import getCargoLocationById from "../../api/getCargoLocationById";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [defaultCenter, setDefaultCenter] = useState([38.9637, 35.2433]);
  const [cargoList, setCargoList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [page, setPage] = useState(0);
  const [totalRow, setTotalRow] = useState(0);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const tableRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState({});
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    loadCargoList();
  }, [searchKey, page, rowsPerPage]);

  const loadCargoList = async () => {
    let pagination = {
      page: page + 1,
      limit: rowsPerPage,
    };

    let filter = {
      searchKey: searchKey,
    };

    const result = await getCargoListWithPagination(pagination, filter);

    if (result?.code == 200) {
      setCargoList(result?.data?.items);
      setTotalRow(result?.data?.meta?.totalItems);
      setShowMessage(false);
    } else {
      setShowMessage(true);
      setMessage(result?.message ?? "Beklenmedik bir hata oluştu.");
    }
  };

  const locationByCargoId = async (row) => {
    const result = await getCargoLocationById(row.id);

    if (result?.code == 200) {
      handleLocateMap(result?.data);
      setSelectedCargo(result?.data);
      setSelectedRow(row);
      setShowMessage(false);
    } else {
      setShowMessage(true);
      setMessage(result?.message ?? "Beklenmedik bir hata oluştu.");
      setSelectedRow({});
      setSelectedCargo({});
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

    setDefaultCenter([cargo.lat, cargo.long]);
    mapRef.current.flyTo([cargo.lat, cargo.long], 16);
  };

  const handleStatus = (status) => {
    switch (status) {
      case 1:
        return (
          <Chip
            label="Beklemede"
            color="warning"
            size="small"
            variant="outlined"
          />
        );

      case 2:
        return (
          <Chip
            label="Yola Çıktı"
            color="primary"
            size="small"
            variant="outlined"
          />
        );

      case 3:
        return (
          <Chip
            label="Sürücü Tarafından Teslim Edildi"
            color="success"
            size="small"
            variant="outlined"
          />
        );

      case 4:
        return (
          <Chip
            label="Teslim Alındı"
            color="success"
            size="small"
            variant="outlined"
          />
        );

      case 5:
        return (
          <Chip
            label="Eksik Teslim Alındı"
            color="warning"
            size="small"
            variant="outlined"
          />
        );

      case 5:
        return (
          <Chip
            label="Teslim Edilmedi"
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
          <Typography variant="h4">afetkargo | Yönetici Paneli</Typography>
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

            {selectedCargo?.long?.length > 0 &&
            selectedCargo?.lat?.length > 0 ? (
              <Marker position={[+selectedCargo?.lat, +selectedCargo?.long]}>
                <Popup>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span>
                      <strong>{`Plaka No: ${selectedRow?.plateNo}`}</strong>
                    </span>
                    <span>{`Çıkış Adresi: ${selectedRow?.originAddress}`}</span>
                    <span>{`Şoför: ${selectedRow?.driverFullname}`}</span>
                    <span>{`Telefon: ${selectedRow?.driverPhone}`}</span>
                    <span>{`Envanter: ${selectedRow?.inventory}`}</span>
                    <span>{`Koli Sayısı: ${
                      selectedRow?.partialCount ?? 0
                    }`}</span>
                  </div>
                </Popup>
              </Marker>
            ) : null}
            {/* ))} */}
          </MapContainer>
        </Grid>
        <Divider />

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {showMessage ? (
              <Grid item xs={12} display="flex" flexDirection="column">
                <Alert severity="error" sx={{ width: "95%" }}>
                  {message}
                </Alert>
                {message == "Unauthorized" ? (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/")}
                  >
                    Ana Sayfaya Dön
                  </Button>
                ) : null}
              </Grid>
            ) : null}
            <OutlinedInput
              value={searchKey}
              onChange={(e) => setSearchKey(e?.target?.value)}
              onKeyDown={(e) => (e?.key == "Escape" ? setSearchKey("") : "")}
              fullWidth={true}
              placeholder="Plaka veya Telefon yazıp arayın.."
              endAdornment={
                searchKey?.length > 0 ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchKey("")}>
                      <CancelIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
            ></OutlinedInput>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            ref={tableRef}
            style={{ boxShadow: "none" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "700" }}>
                    Transfer Durumu
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
                {/* {rows.map((row, index) => ( */}
                {cargoList.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{
                      backgroundColor:
                        row?.id == selectedCargo?.cargoId ? "#b9e3d061" : "",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {handleStatus(row?.status)}
                    </TableCell>

                    <TableCell align="center">{row.plateNo}</TableCell>

                    <TableCell align="center">{row.driverFullname}</TableCell>

                    <TableCell align="center">{row.driverPhone}</TableCell>

                    <TableCell
                      align="right"
                      style={{
                        display: "flex",
                        gap: "2px",
                      }}
                    >
                      {row?.originLong != null && row?.originLat != null ? (
                        <>
                          <Tooltip title="Araç konumunu haritada gösterir.">
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ textTransform: "none" }}
                              onClick={() => locationByCargoId(row)}
                            >
                              <LocationOnIcon />
                              Konum
                            </Button>
                          </Tooltip>
                          <Tooltip title="Araç konumunu google haritada gösterir.">
                            <IconButton
                              onClick={() => {
                                window.open(
                                  `https://www.google.com/maps/@${selectedCargo?.lat},${selectedCargo?.long},22z`,
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
                                  ` https://www.google.com/maps?saddr=My+Location&daddr=${selectedCargo?.lat},${selectedCargo?.long}`,
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
                                  `https://maps.apple.com/place?q=${selectedCargo?.lat},${selectedCargo?.long}&ll=${selectedCargo?.lat},${selectedCargo?.long}&z=18,`,
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
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ textTransform: "none" }}
                          disabled={true}
                        >
                          <LocationOnIcon />
                          Konu Bilgisi Yok
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[7, 10, 25]}
                    labelRowsPerPage={"Sayfadaki satır sayısı:"}
                    labelDisplayedRows={({ from, to, count }) =>
                      `${count} kayıttan ${from}-${to}`
                    }
                    colSpan={8}
                    count={totalRow}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    style={{ borderBottom: "none" }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default AdminDashboard;
