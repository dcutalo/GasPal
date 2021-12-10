/*global google*/
import React, { useState, useEffect } from 'react';
import { compose, withProps, lifecycle} from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

const startingStartPoint = 41.8507300; 
const startingEndPoint = -87.6512600;
const endingStartPoint = 41.8525800; 
const endingEndPoint = -87.6514100;



class Maps extends React.PureComponent {
  constructor( props ){
    super(props);
    
    this.state = {
      isMarkerShown: false,
      startingStartPoint: 39.702892, 
      startingEndPoint: -75.111839,
      endingStartPoint: 40.088322,
      endingEndPoint: -75.382133
    }
  }

  componentDidMount() {
    this.delayedShowMarker()

    const script = document.createElement("script");

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8&callback=initMap";
    script.async = true;

    document.body.appendChild(script);
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
    startingStartPoint = 12;
    console.log("startingStartPoint: " + startingStartPoint);
  }
  render() {
    console.log("rendering...")
    console.log(this.state.startingStartPoint);
    const FreshMaps = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8&callback=initMap",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        startingStartPoint: this.state.startingStartPoint,
        startingEndPoint:  this.state.startingEndPoint,
        endingStartPoint: this.state.endingStartPoint, 
        endingEndPoint: this.state.endingEndPoint,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const directionsService = new google.maps.DirectionsService();
    
          directionsService.route({
            origin: new google.maps.LatLng(startingStartPoint, startingEndPoint),
            destination: new google.maps.LatLng(endingStartPoint, endingEndPoint),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
      
    )(props =>
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(this.state.startingStartPoint, this.state.startingEndPoint)}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    );

    return (
      
      <FreshMaps
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />

      
    )
  }
} 

export default Maps;