import { Button, Divider, Grid, Link, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeoLocation from "../GeoLocation";

import startTransferRequest from "../../api/startTransfer";

function createData(
  deliveryFullname,
  deliveryPhone,
  address,
  deliveryGoogleMapsLink
) {
  return { deliveryFullname, deliveryPhone, address, deliveryGoogleMapsLink };
}

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

  const [deliveryRows, setDeliveryRows] = useState([]);

  const [isDriverOnRoad, setIsDriverOnRoad] = useState(false);
  const [driverInfo, setDriverInfo] = useState([]);

  useEffect(() => {
    let driverInfoData = JSON.parse(localStorage.getItem("afetkargo_surucu"));
    setDriverInfo(driverInfoData);
    setDeliveryRows(driverInfoData?.receiverList ?? []);
  }, []);

  const driverOnRoad = () => {
    setIsDriverOnRoad(true);
    const data = {
      "driverPassword": "9CRPX5",
      "plateNo": driverInfo.plateNo,
      "cargoId": driverInfo.id
    };
    const response = startTransferRequest(data);
    console.log("response", response)
  };

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
      <GeoLocation
        isDriverOnRoad={isDriverOnRoad}
        driverOnRoad={driverOnRoad}
      />
      <Grid item xs={12}>
        <Typography variant="h4">afetkargo | Lojistik İzleme</Typography>
      </Grid>

      <Divider />

      <Grid item xs={12}>
        <Typography variant="h6">{driverInfo?.originAddress}</Typography>
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
              {deliveryRows && deliveryRows.length ? (
                deliveryRows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.receiverFullname}
                    </TableCell>
                    <TableCell align="center">{row.receiverPhone}</TableCell>
                    <TableCell align="right">
                      {row.destinationAddress}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
      >
        {!isDriverOnRoad && (
          <Button variant="contained" onClick={driverOnRoad}>
            Yola çıktım
          </Button>
        )}
        {isDriverOnRoad && <span>Konum bilgileriniz alınmıştır.</span>}
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
