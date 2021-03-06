import React, {useState, useEffect} from 'react';
import { DirectionsService, DirectionsRenderer } from 'react-google-maps';

function MyMap() {
  var startMarker;
  var destMarker;
  var map;
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();

  function initMap() {
  
    const center = {lat: 39.7065471738, lng: -75.1177295291};
    const options = {zoom: 15, scaleControl: true, center: center};
    map = new google.maps.Map(
        document.getElementById('map'), options);
    
    //const Rowan = {lat: 39.7065471738 , lng: -75.1177295291};
    //const Rutgers = {lat: 40.741632, lng: -74.17486};
    
    startMarker = new google.maps.Marker({position: {startLat, startLong}, map: map});
    destMarker = new google.maps.Marker({position: {destLat, destLong}, map: map});
  
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map); 
      
  }

  directionsService.route(route,
    function(response, status) {
      if (status !== 'OK') {
        window.alert('Directions request failed due to ' + status);
        return;
      } else {
        directionsRenderer.setDirections(response);
        var directionsData = response.routes[0].legs[0];
        if (!directionsData) {
          window.alert('Directions request failed');
          return;
        }
        else {
          document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
        }
      }
    });

  function addPoints(){
		var startLat = parseFloat(document.getElementById('startLat').value);
		var startLong = parseFloat(document.getElementById('startLong').value);
		var destLat = parseFloat(document.getElementById('destLat').value);
		var destLong = parseFloat(document.getElementById('destLong').value);
		
		var newStartLatLng = new google.maps.LatLng(startLat, startLong); 
		startMarker.setPosition(newStartLatLng);
		
		var newDestLatLng = new google.maps.LatLng(destLat, destLong); 
		destMarker.setPosition(newDestLatLng);
		
		var START = new google.maps.LatLng(startLat, startLong);
		var DEST = new google.maps.LatLng(destLat, destLong);
		
		var route = {
		origin: START,
		destination: DEST,
		travelMode: 'DRIVING'
  };

  return (
    <><div id="map"></div>
    <div id="msg"></div>

    <label for="startLat">Enter Starting Latitude</label>

    <input type="text" id="startLat" /><br></br>
    <label for="startLong">Enter Starting Longitude</label>

    <input type="text" id="startLong" /><br></br>
    <label for="destLat">Enter Destination Latitude</label>

    <input type="text" id="destLat" /><br></br>
    <label for="destLong">Enter Destination Longitude</label>

    <input type="text" id="destLong" /><br></br>
    <input type="button" onClick={() => addPoints()} value="Build Route" />
    
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8&callback=initMap">
    </script>
    </>
  );

    
}
}
export default MyMap;