import React, { useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

import setLocationRequest from "../../api/setLocation";

const useGeoLocation = ({ isDriverOnRoad, driverOnRoad }) => {
  const [cargoId, setCargoId] = useState("");
  const {
    coords,
    timestamp, // timestamp of when the last position was retrieved
    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError, // object with the error returned from the Geolocation API call
    getPosition, // a callback you can use to trigger the location query manually
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  });
  const [latitude, setLatitude] = useState(coords?.latitude);
  const [longitude, setLongitude] = useState(coords?.longitude);

  useEffect(() => {
    setCargoId(JSON.parse(localStorage.getItem("afetkargo_surucu")).id);

    setLatitude(coords?.latitude);
    setLongitude(coords?.longitude);
  }, [coords]);


  useEffect(() => {
    if (isDriverOnRoad) {
      postLocation();

      const interval = setInterval(() => {
        postLocation();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isDriverOnRoad]);

  const postLocation = () => {
    const data = {
      cargoId: cargoId,
      lat: latitude ? latitude : coords?.latitude,
      long: longitude ? longitude : coords?.longitude,
    };
    const result = setLocationRequest(data);
    console.log("result", result);
  };

  return null;
  !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <table>
      <tbody>
        <tr>
          <td>latitude</td>
          <td>{latitude}</td>
        </tr>
        <tr>
          <td>longitude</td>
          <td>{longitude}</td>
        </tr>
        <tr>
          <td>altitude</td>
          <td>{coords.altitude}</td>
        </tr>
        <tr>
          <td>heading</td>
          <td>{coords.heading}</td>
        </tr>
        <tr>
          <td>speed</td>
          <td>{coords.speed}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default useGeoLocation;
