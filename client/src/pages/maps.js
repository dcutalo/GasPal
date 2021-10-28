import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  position: 'absolute',
  width: '75%',
  height: '100%',
  right: '10px'

};

const center = {
  lat: 39.7065471738 ,
  lng: -75.1177295291
};


function MyMap() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyMap)