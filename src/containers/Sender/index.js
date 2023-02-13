import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Autocomplete,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

import createCargoRequest from "../../api/createCargoRequest";

import { OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Sender = () => {
  const navigate = useNavigate();
  const cargoId = localStorage.getItem("afetkargo_surucu")
    ? JSON.parse(localStorage.getItem("afetkargo_surucu")).id
    : "";

  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const [deliveryRows, setDeliveryRows] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [showDeliveryError, setShowDeliveryError] = useState(false);
  const [showSenderError, setShowSenderError] = useState(false);

  const provider = new OpenStreetMapProvider();

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [senderData, setSenderData] = useState({
    plateNo: "",
    driverFullname: "",
    driverPhone: "",
    inventory: "",
    originAddress: "",
    destinationAddress: "",
    originLat: 37.5553633,
    originLong: 36.8415523,
    partialCount: 0,
    companyName: "",
    destinationCountyId: 46,
    destinationCityId: 1,
  });

  const [deliveryData, setDeliveryData] = useState({
    cargoId: cargoId,
    receiverFullname: "",
    receiverPhone: "",
    destinationAddress: "",
    destinationLat: 37.5553633,
    destinationLong: 36.8415523,
  });

  const [defaultCenter, setDefaultCenter] = useState([38.9637, 35.2433]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setDefaultCenter([marker.getLatLng().lat, marker.getLatLng().lng]);
          mapRef.current.flyTo(marker.getLatLng(), 16);
        }
      },
    }),
    []
  );

  useEffect(() => {
    getSearchList();
  }, [searchInput]);

  const getSearchList = async () => {
    if (searchInput?.length > 2) {
      const results = await provider.search({ query: searchInput });
      const converted = results.map((item, index) => ({
        id: index,
        label: item.label,
        lat: item.y,
        long: item.x,
      }));
      setSearchResults(converted);
    }
  };

  const handleAdressSelect = (selectedAdress) => {
    setSearchInput(selectedAdress.label);
    setDefaultCenter([selectedAdress.lat, selectedAdress.long]);
    mapRef.current.flyTo([selectedAdress.lat, selectedAdress.long], 16);
  };

  const searchInputChange = (inputValue) => {
    setSearchInput(inputValue);
  };

  const fieldOnChange = (value, field) => {
    let tempData = Object.assign({}, senderData);
    tempData[field] = value;
    setSenderData(tempData);
  };

  const deliveryFieldOnChange = (value, field) => {
    let tempData = Object.assign({}, deliveryData);
    tempData[field] = value;
    setDeliveryData(tempData);
  };

  const handleRegisterTruck = async () => {
    if (senderData.plateNo.length < 1 ||
      senderData.driverFullname.length < 1 ||
      senderData.driverPhone.length < 1 ||
      senderData.inventory.length < 1
    ) {
      setShowSenderError(true);
      return;
    }
    setShowSenderError(false);
    const tempAllData = Object.assign({}, senderData);
    tempAllData.receiverList = [];
    tempAllData.receiverList = deliveryRows;
    setSenderData(tempAllData);

    const response = await createCargoRequest(tempAllData);
    console.log("response", response);
    if (response.code === 200) {
      setShowResult(true);
      setResultData(response.data);
    } else {
      setShowMessage(true);
      setMessage(
        response?.message ??
        "Kayıt oluşturulurken hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin."
      );
    }
  };

  const handleAddDelivery = () => {
    if (deliveryData.receiverFullname.length < 1 || deliveryData.receiverPhone.length < 1) {
      setShowDeliveryError(true);
      return;
    }
    setShowDeliveryError(false)
    let row = {
      cargoId: deliveryData.cargoId,
      receiverFullname: deliveryData.receiverFullname,
      receiverPhone: deliveryData.receiverPhone,
      destinationAddress: deliveryData.destinationAddress,
      destinationLat: defaultCenter[0],
      destinationLong: defaultCenter[1],
    };

    setDeliveryRows((deliveryRows) => [...deliveryRows, row]);
    clearReceiverData();
  };

  const copyInfos = () => {
    const copiedData = `
      Kargo Kodu: ${resultData.cargoCode}
      Plaka Numarası: ${resultData.plateNo}
      Sürücü Şifresi: ${resultData.driverPassword}
      Teslimat Şifresi: ${resultData.receiverPassword}
    `;
    navigator.clipboard.writeText(copiedData);
  };

  const clearReceiverData = () => {
    setDeliveryData({
      cargoId: cargoId,
      receiverFullname: "",
      receiverPhone: "",
      destinationAddress: "",
      destinationLat: 37.5553633,
      destinationLong: 36.8415523,
    });
    // * Advice
    // setDefaultCenter([38.9637, 35.2433]);
    // mapRef.current.flyTo([38.9637, 35.2433], 5)
    setSearchInput("");
  };

  return (
    <>
      {!showResult ? (
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
            <Typography variant="h4">afetkargo | Kargo Girişi</Typography>
          </Grid>

          <Divider />

          <Grid item xs={12}>
            <TextField
              id="plateno"
              label="Plaka No"
              variant="outlined"
              fullWidth
              value={senderData.plateNo}
              onChange={(e) =>
                fieldOnChange(e.target.value.toUpperCase(), "plateNo")
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="driverFullname"
              label="Sürücü Adı Soyadı"
              variant="outlined"
              fullWidth
              value={senderData.driverFullname}
              onChange={(e) => fieldOnChange(e.target.value, "driverFullname")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="driverPhone"
              label="Sürücü Telefon No"
              variant="outlined"
              fullWidth
              value={senderData.driverPhone}
              onChange={(e) => fieldOnChange(e.target.value, "driverPhone")}
            />
          </Grid>

          {/* <Grid
      item
      xs={12}
      style={{ display: "flex", flexDirection: "row", gap: "10px" }}
    >
      <FormControl fullWidth>
        <InputLabel id="startCityLabel">Başlangıç İli</InputLabel>
        <Select
          labelId="startCityLabel"
          id="startCityId"
          value={senderData.cityId}
          onChange={(e) => fieldOnChange(e.target.value, "cityId")}
        >
          <MenuItem value={46}>KAHRAMANMARAŞ</MenuItem>
          <MenuItem value={31}>HATAY</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="startCountLabel">Başlangıç İlçesi</InputLabel>
        <Select
          labelId="startCountLabel"
          id="startCountId"
          value={senderData.countyId}
          onChange={(e) => fieldOnChange(e.target.value, "countyId")}
        >
          <MenuItem value={1}>ilçe 1</MenuItem>
          <MenuItem value={2}>ilçe 2</MenuItem>
        </Select>
      </FormControl>
    </Grid> */}

          <Grid item xs={12}>
            <TextField
              id="originAddress"
              label="Başlangıç Adresi"
              variant="outlined"
              fullWidth
              multiline={true}
              rows={2}
              value={senderData.originAddress}
              onChange={(e) => fieldOnChange(e.target.value, "originAddress")}
            />
          </Grid>

          {/* <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              id="googleMapsLink"
              label="Google Maps Adres Linki"
              variant="outlined"
              placeholder="https://www.google.com/maps/place/@..."
              fullWidth
              value={senderData.googleMapsLink}
            // onChange={(e) => fieldOnChange(e.target.value, "googleMapsLink")}
            />

            <Tooltip title="Kalkış noktasının adres bilgisini google maps üzerinden bulup, adres linkini kopyalayıp buraya yapıştırabilirsiniz.">
              <IconButton style={{ height: "40px" }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid> */}

          <Grid item xs={12}>
            <TextField
              id="partial-count"
              label="Koli Sayısı"
              variant="outlined"
              fullWidth
              value={senderData.partialCount}
              onChange={(e) => fieldOnChange(+e.target.value, "partialCount")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="inventory"
              label="Envanterler"
              variant="outlined"
              fullWidth
              multiline={true}
              rows={5}
              value={senderData.inventory}
              onChange={(e) => fieldOnChange(e.target.value, "inventory")}
            />
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant="h6">Alıcı Ekle</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="receiverFullname"
              label="Alıcı Adı Soyadı"
              variant="outlined"
              fullWidth
              value={deliveryData.receiverFullname}
              onChange={(e) =>
                deliveryFieldOnChange(e.target.value, "receiverFullname")
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="receiverPhone"
              label="Alıcı Telefon No"
              variant="outlined"
              fullWidth
              value={deliveryData.receiverPhone}
              onChange={(e) =>
                deliveryFieldOnChange(e.target.value, "receiverPhone")
              }
            />
          </Grid>

          {/* <Grid
      item
      xs={12}
      style={{ display: "flex", flexDirection: "row", gap: "10px" }}
    >
      <FormControl fullWidth>
        <InputLabel id="deliveryCityLabel">Teslim İli</InputLabel>
        <Select
          labelId="deliveryCityLabel"
          id="deliveryCityId"
          value={deliveryData.cityId}
          onChange={(e) => deliveryFieldOnChange(e.target.value, "cityId")}
        >
          <MenuItem value={46}>KAHRAMANMARAŞ</MenuItem>
          <MenuItem value={31}>HATAY</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="deliveryCountLabel">Teslim İlçesi</InputLabel>
        <Select
          labelId="deliveryCountLabel"
          id="deliveryCountId"
          value={deliveryData.countyId}
          onChange={(e) => deliveryFieldOnChange(e.target.value, "countyId")}
        >
          <MenuItem value={1}>ilçe 1</MenuItem>
          <MenuItem value={2}>ilçe 2</MenuItem>
        </Select>
      </FormControl>
    </Grid> */}

          {/* <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              id="deliveryGoogleMapsLink"
              label="Google Maps Teslimat Adres Linki"
              variant="outlined"
              placeholder="https://www.google.com/maps/place/@..."
              fullWidth
              value={deliveryData.deliveryGoogleMapsLink}
            // onChange={(e) => deliveryFieldOnChange(e.target.value, "deliveryGoogleMapsLink")}
            />

            <Tooltip title="Teslim noktasının adres bilgisini google maps üzerinden bulup, adres linkini kopyalayıp buraya yapıştırabilirsiniz.">
              <IconButton style={{ height: "40px" }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid> */}

          {/* <Grid item xs={12}>
            <TextField
              id="destinationAddress"
              label="Teslim Adresi"
              variant="outlined"
              fullWidth
              multiline={true}
              rows={2}
              value={deliveryData.destinationAddress}
              onChange={(e) => deliveryFieldOnChange(e.target.value, "destinationAddress")}
            />
          </Grid> */}

          <Autocomplete
            disablePortal
            id="location-search"
            noOptionsText={'Aradığınız adres bulunamadı. Haritadan hedef adresi seçebilirsiniz.'}
            options={searchResults}
            value={searchInput}
            onChange={(e, value) => handleAdressSelect(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Adres Ara"
                onChange={(e) => searchInputChange(e.target.value)}
              />
            )}
          />

          {defaultCenter?.length && (
            <Grid>
              <span>Güncel Koordinatlar: </span>
              <span>
                {defaultCenter[0]}, {defaultCenter[1]}
              </span>
            </Grid>
          )}

          <Grid item xs={12}>
            <MapContainer
              ref={mapRef}
              center={defaultCenter}
              zoom={5}
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
              <Marker
                id="marker-wrapper"
                ref={markerRef}
                draggable={true}
                eventHandlers={eventHandlers}
                position={defaultCenter}
              />
            </MapContainer>
          </Grid>
          {showDeliveryError &&
            <Grid>
              <Alert severity="error">Alıcı Adı, Alıcı Telefon Numarası girdiğinizden emin olun.</Alert>
            </Grid>
          }
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddDelivery}
            >
              Alıcıyı Ekle
            </Button>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant="h6">Alıcı Listesi</Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <TableContainer component={Paper}>
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
                      Koordinatlar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveryRows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.receiverFullname}
                      </TableCell>
                      <TableCell align="center">{row.receiverPhone}</TableCell>
                      <TableCell align="right">{row.destinationLat} - {row.destinationLong}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
            {deliveryRows.map((row, index) => (
              <List key={index} sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Alıcı Adı Soyadı"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {row.receiverFullname}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Cep Telefonu"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {row.receiverPhone}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Koordinatlar"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {row.destinationLat} - {row.destinationLong}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            ))}
          </Grid>
          {showMessage ? (
            <StyledGrid item xs={12}>
              <Alert severity="error" sx={{ width: "100%" }}>
                {message}
              </Alert>
            </StyledGrid>
          ) : null}
          {showSenderError &&
            <Grid>
              <Alert severity="error">Gönderen Plaka No, Sürücü Adı, Sürücü Telefon Numarası, Envanter girdiğinizden emin olun.</Alert>
            </Grid>
          }
          <Grid container>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Geri Dön
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                onClick={handleRegisterTruck}
              >
                Kayıt Oluştur
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid display={"flex"} flexDirection={"column"} gap={"20px"}>
          <Grid display={"flex"} flexDirection={"column"} gap={"15px"}>
            <span>Kaydınız Oluşturulmuştur.</span>
            <span>Kargo Kodu: {resultData.cargoCode}</span>
            <span>Plaka Numarası: {resultData.plateNo}</span>
            <span>Sürücü Şifresi: {resultData.driverPassword}</span>
            <span>Teslimat Şifresi: {resultData.receiverPassword}</span>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Geri Dön
            </Button>
            <Button variant="contained" onClick={() => copyInfos()}>
              Bilgileri Kopyala
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Sender;
