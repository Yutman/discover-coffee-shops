'use client';

import { useState } from 'react';

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState('');
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      setLocationErrorMsg("Geolocation is not supported by your browser");
      return;
    }
    setIsFindingLocation(true); // Start locating
    console.log("Locating…");
    setLocationErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Delay updating the state for 3 seconds (3000ms)
        setTimeout(() => {

          setLongLat(`43.65107,-79.347015`);
          setIsFindingLocation(false);
          setLocationErrorMsg('');
        }, 500);
      },
      (error) => {
        console.error("Unable to retrieve your location", error);
        // Even on error, wait 3 seconds before resetting the state
        setTimeout(() => {
          setIsFindingLocation(false);
          setLocationErrorMsg("Unable to retrieve your location");
        }, 500);
      }
    );
  };

  return {
    longLat,
    handleTrackLocation,
    isFindingLocation,
    locationErrorMsg,
  };
};

export default useTrackLocation;
