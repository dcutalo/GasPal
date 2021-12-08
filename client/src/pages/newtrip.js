import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';
import '../style/newtrip.css';
import { useAuth0 } from "@auth0/auth0-react";
import Autocomplete from "react-google-autocomplete";
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import DistanceMatrixService from 'react-google-maps';
import { compose, withProps, lifecycle} from "recompose";
import Popup from './userprofile/Popup'

function NewTrip() {
    const { user } = useAuth0();
    const userCarEndpoint = "http://localhost:5000/usercarsDefaultCar/" + user.nickname
    
    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");
    const [fuel, setFuel] = useState([]);
    const [fuel_cap, setFuelCap] = useState(0);
    const [carMPG, setCarMPG] = useState(0);
    const [carColor, setCarColor] = useState("black")
    const [carId, setCarId] = useState(-1);
    const [distance, setDistance] = useState(1005.0);
    const [userName, setUsername] = useState(user.nickname);
    const [startPlaceId, setStartPlaceId] = useState(0);
    const [destPlaceId, setDestPlaceId] = useState(0);
    const [confirm, setConfirm] = useState(false);

    var distanceNode = require('distance-matrix-api');
    var origins = ["place_id:" + startPlaceId];
    var destinations = ["place_id:" + destPlaceId];

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
        
    }, [distance]);

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
    }

    function setDestLocation(place) {
        setDest(place.formatted_address)
        setDestPlaceId(place.place_id)
    }

    // function DistanceMat() {
    //     return(
    //         <DistanceMatrixService
    //             options={{
    //                 destinations: [destPlaceId],
    //                 origins: [startPlaceId],
    //                 travelMode: "DRIVING",
    //             }}
    //             /*callback={/*(response) => { console.log(response); } }*//>
    //     );
    // }

    // const DistanceCalculator = withScriptjs(withGoogleMap(DistanceMat));
    

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
        <h2 className='destprompt'>Enter destination:</h2>
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
            
            <button className="preBtn" style={{ height: 50, width: 200 }} onClick={() => {} }>Preview</button>
            <br></br>
            <button className="newBtn" style={{ height: 50, width: 200 }} onClick={() => { distanceCalculate(); } }>Add New Trip</button>
            <br></br>
            <h3>You are currently driving:</h3>

            <Popup trigger={confirm} setTrigger={setDistance}>
                <h3> Are you sure you want to go on this trip?</h3>
                <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { newTrip(); setConfirm(false)} }>Confirm</button>
                <button className="undoBtn" style={{ height: 40, width: 200 }} onClick={() => { } }>Undo</button>
          
            </Popup>
            
        </>
        
    )
}

export default NewTrip