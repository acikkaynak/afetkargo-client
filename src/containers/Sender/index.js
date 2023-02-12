import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import createCargoRequest from "../../api/createCargoRequest"

const Sender = () => {
  const navigate = useNavigate();
  const cargoId = JSON.parse(localStorage.getItem("afetkargo_surucu")).id

  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState([]);

  const [deliveryRows, setDeliveryRows] = useState([]);

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
    destinationLong: 36.8415523
  });

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
    const tempAllData = Object.assign({}, senderData);
    tempAllData.receiverList = [];
    tempAllData.receiverList.push(deliveryData);
    setSenderData(tempAllData);

    const response = await createCargoRequest(tempAllData)
    console.log("response", response);
    if (response.code === 200) {
      setShowResult(true)
      setResultData(response.data);
    };
  }

  const handleAddDelivery = () => {
    let row = {
      cargoId: deliveryData.cargoId,
      receiverFullname: deliveryData.receiverFullname,
      receiverPhone: deliveryData.receiverPhone,
      destinationAddress: deliveryData.destinationAddress,
      destinationLat: deliveryData.destinationLat,
      destinationLong: deliveryData.destinationLong
    };

    setDeliveryRows((deliveryRows) => [...deliveryRows, row]);
  };

  return (
    <>
      {!showResult ?
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
              onChange={(e) => fieldOnChange(e.target.value.toUpperCase(), "plateNo")}
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

          <Grid item xs={12}>
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
          </Grid>

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
                      Adres
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
                      <TableCell align="right">{row.destinationAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                Geri Dön
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" onClick={() => { handleRegisterTruck() }}>
                Kayıt Oluştur
              </Button>
            </Grid>
          </Grid>
        </Grid>
        :
        <Grid display={"flex"} flexDirection={"column"} gap={"20px"}>
          <Grid display={"flex"} flexDirection={"column"} gap={"15px"}>
            <span>Kaydınız Oluşturulmuştur.</span>
            <span>Kargo Kodu: {resultData.cargoCode}</span>
            <span>Sürücü Şifresi: {resultData.driverPassword}</span>
            <span>Teslimat Şifresi: {resultData.receiverPassword}</span>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
              Geri Dön
            </Button>
          </Grid>
        </Grid>
      }
    </>


  );
};

export default Sender;
