/*global google*/
import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';
import '../style/newtrip.css';
import { useAuth0 } from "@auth0/auth0-react";
import Autocomplete from "react-google-autocomplete";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import DistanceMatrixService from 'react-google-maps';
import { compose, withProps, lifecycle} from "recompose";
import Popup from './userprofile/Popup'
import {Link } from "react-router-dom";
function NewTrip() {
    const { user } = useAuth0();
    const userCarEndpoint = "http://localhost:5000/usercarsDefaultCar/" + user.nickname
    
    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");
    const [fuel, setFuel] = useState([]);
    const [fuel_cap, setFuelCap] = useState(0);
    const [carMPG, setCarMPG] = useState(0);
    const [carColor, setCarColor] = useState("")
    const [carId, setCarId] = useState(-1);
    const [distance, setDistance] = useState(1005.0);
    const [userName, setUsername] = useState(user.nickname);
    const [startPlaceId, setStartPlaceId] = useState(0);
    const [destPlaceId, setDestPlaceId] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [directions, setDirections] = useState();
    const [denied, setDenied] = useState(false);

    var distanceNode = require('distance-matrix-api');
    var origins = ["place_id:" + startPlaceId];
    var destinations = ["place_id:" + destPlaceId];
    const [startingStartPoint, setStartingStartPoint] = useState(41.8507300); 
    const [startingEndPoint, setStartingEndPoint] = useState(-87.6512600);
    const [endingStartPoint, setEndingStartPoint] = useState(41.8525800); 
    const [endingEndPoint, setEndingEndPoint] = useState(-87.6514100);
    

    const useGoogleMapsScript = url => {
        useEffect(() => {
            const script = document.createElement('script');
            
            script.src = url;
            script.async = true;
            
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            }
        }, [url]);
    }

    useEffect(() => {
        Axios.get(userCarEndpoint).then((response) => 
        {
            console.log(response)
          setFuel(response.data.map(item=>item.current_fuel));
          setCarId(response.data.map(item=>item.car_id));
          setCarColor(response.data.map(item=>item.color));
        });
    }, []);

    useEffect(() => {
       
    }, [directions]);

    useEffect(() => {
        var carEndpoint = "http://localhost:5000/cars/" + carId;
        if(carEndpoint !== null) {
            Axios.get(carEndpoint).then((response) => 
            {
            setFuelCap(response.data.map(carro=>carro.tank_max));
            setCarMPG(response.data.map(carro=>carro.mpg));
            });
        }
        else {
            console.log("carEnpoint is: " + carEndpoint + "!")
        }
    }, [carId]);

    function newTrip(){
        console.log(distance)
        if(distance < (((fuel / 100) * fuel_cap ) * carMPG)) {
            Axios.post("http://localhost:5000/trips/insert", {
                username: userName,
                start_adr: start,
                end_adr: dest,
                distance: distance,
                car_id: carId
            }).then(() => {
            console.log("Successful insert to trips");
            });
            Axios.put("http://localhost:5000/usercars/update", {
                username: userName,
                car_id: carId,
                color: carColor,
                current_fuel: 100 */*Decimal value of gas left in tank ->*/ ((((fuel / 100) * fuel_cap) /*<- current gas in gallons*/ - ( distance / carMPG ) /*<- cost of trip in gallons*/ ) / fuel_cap)
            });
        }
        else {
            //popup saying the user does not have enough gas to make the trip
            setDenied(true);
            console.log("sorry,can't make it")
        }
    };

    function calcDistance(){
        var endpointsValid = validAddresses(start, dest);
        if(endpointsValid) {
            //Google Maps sorcery - distance calculation
            //setDistance(resultOfCalculation);
        }
    };

    function validAddresses(start, dest) {
        //Google Validation sorcery - checks if addresses exist
        //return false if notValid;
    }
    
    function setStartLocation(place) {
        setStart(place.formatted_address)
        setStartPlaceId(place.place_id)
        console.log("start: " + place.place_id)
    }

    function setDestLocation(place) {
        setDest(place.formatted_address)
        setDestPlaceId(place.place_id)
        console.log("dest: " + place.place_id)
    }

    function Map() {
        useGoogleMapsScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8");
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(startingStartPoint, startingEndPoint),
            destination: new google.maps.LatLng(endingStartPoint, endingEndPoint),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {

                setDirections(result);
                console.log("directions worked: ")
                console.log(directions)
            } else {
              console.error(`error fetching directions ${result}`);
            }
        });

        return(
            <><GoogleMap
                defaultZoom={10}
                defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}/>
            <DirectionsRenderer
                directions={directions} /></>
        );
    }

    const WrappedMap = withScriptjs((withGoogleMap(Map)));

    function distanceCalculate() {
        distanceNode.key("AlphaDMAvyPM4huAsuOyQbmsOC6aapL4rwZCaRfA");
        distanceNode.units('imperial');
        distanceNode.matrix(origins, destinations, function(err, distances) {
            if(err) {
                console.log("There was an error in calculation")
            }
            if(!distances) {
                console.log("no distances calculated")
            }
            if (distances.status == 'OK' && distances.rows[0].elements[0].status == 'OK') {
            //    setDistance(distances.rows[0].elements[0].distance.text.substring)
                console.log(distances)
                var num = distances.rows[0].elements[0].distance.value;
                console.log(num)
                console.log(typeof(num))
               console.log((distances.rows[0].elements[0].distance.value * 1.0) / 1609.34)
               setDistance(distances.rows[0].elements[0].distance.value / 1609.34)
               setConfirm(true)
               console.log(distance)
            }
            else {
                console.log("distance calculation status: "  + distances.rows[0].elements[0].status)
            }
        })
    }


    return (
        <>
        <h2 className='destprompt'>Enter Start Location:</h2>
        <div className='newstart'>
            {/* <TextField
                value={start}
                label="Start"
                onChange={(e) => {
                    setStart(e.target.value);
                } } /> */}

            <Autocomplete
                apiKey="AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8"
                onPlaceSelected={(place) => setStartLocation(place)} //setStartPlaceId("place_id:" + place.)}
            />
        </div>
         
        <h2 className='destprompt'>Enter destination:</h2>       
        <div className='newdest'>
            {/* <TextField
                value={dest}
                label="Destination"
                onChange={(e) => {
                    setDest(e.target.value);
                } } /> */}

            <Autocomplete
            apiKey="AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8"
            onPlaceSelected={(place) => setDestLocation(place)}
            />

            {/* <DistanceCalculator
             googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8"
             loadingElement={<div style={{ height: `100%` }} />}
             containerElement={<div style={{ height: `400px` }} />}
             mapElement={<div style={{ height: `100%` }} />}
            /> */}
            
        </div>

        <div>
            {/* <WrappedMap
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8&callback=initMap"}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%`, width: `25%` }} />}
            /> */}
        </div>
            
            <Link to = "/map"><button className="preBtn" style={{ height: 50, width: 200 }} onClick={() => {} }>Preview</button></Link>
            <br></br>
            <button className="newBtn" style={{ height: 50, width: 200 }} onClick={() => { distanceCalculate(); } }>Add New Trip</button>
            <br></br>
            <h3>You are currently driving:</h3>

            <Popup trigger={confirm} setTrigger={setConfirm}>
                <h3> Are you sure you want to go on this trip?</h3>
                <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { newTrip(); setConfirm(false)} }>Confirm</button>
                <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => {setConfirm(false) } }>Undo</button>
            </Popup>

            <Popup trigger = {denied} setDenied={setDenied}>
                <h3>You can not make this trip with your current fuel level!</h3>
                <button className="confirmBtn" style={{height:40, width: 200}} onClick={() => {setDenied(false)}}>Close</button>
            </Popup>
            
        </>
        
    )
}

export default NewTrip