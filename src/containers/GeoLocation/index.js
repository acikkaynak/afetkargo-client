import React, { useCallback, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";

import setLocationRequest from "../../api/setLocation";

const useGeoLocation = ({ isDriverOnRoad, driverOnRoad }) => {
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
    // getPosition();
    if (coords?.latitude !== latitude)
      setLatitude(coords?.latitude);
    if (coords?.longitude !== longitude)
      setLongitude(coords?.longitude);
    console.log("yenilendi: ", Date.now());
    console.log("coords", coords);
    console.log("lat", coords?.latitude);
    console.log("lon", coords?.longitude);
  }, [coords]);

  useEffect(() => {
    if (isDriverOnRoad) {
      window.setInterval(() => {
        postLocation()
      }, 1000 * 60 * 15)
    }
  }, [isDriverOnRoad])

  const postLocation = () => {
    const data = {
      "cargoId": "123123-123123-123dsfdfgdfgd-22342",
      "lat": latitude,
      "long": longitude
    };
    const result = setLocationRequest(data);
    console.log("result", result)
  }

  // const getLocation = useCallback(() => {
  //   handleReadGeoLocation();
  // }, []);

  // const handleReadGeoLocation = () => {
  //   console.log("güncellendi:", Date.now());
  //   console.log("latitude:", coords?.latitude);
  //   console.log("longitude:", coords?.longitude);

  //   setTimeout(() => {
  //     handleReadGeoLocation();
  //   }, 5000);
  // };

  return !isGeolocationAvailable ? (
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
