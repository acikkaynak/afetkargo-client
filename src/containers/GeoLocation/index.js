import React, { useCallback, useEffect } from "react";
import { useGeolocated } from "react-geolocated";

const useGeoLocation = () => {
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

  useEffect(() => {
    // getPosition();
    console.log("yenilendi: ", Date.now());
    console.log("coords", coords);
    console.log("lat", coords?.latitude);
    console.log("lon", coords?.longitude);
  }, [coords]);

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
          <td>{coords.latitude}</td>
        </tr>
        <tr>
          <td>longitude</td>
          <td>{coords.longitude}</td>
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
