'use client';

type PositionType = {
        coords: {latitude: number; longitude: number};
};

const useTrackLocation = () => {
     function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

   console.log (`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    console.error("Unable to retrieve your location");
  }

const handleTrackLocation = () => {
        if (!navigator.geolocation) {
    console.log ("Geolocation is not supported by your browser");
  } else {
    console.log ("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

    return {
        //latLong
        handleTrackLocation,
    }
}

export default useTrackLocation;