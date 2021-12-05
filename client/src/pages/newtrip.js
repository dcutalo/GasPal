import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';
import '../style/newtrip.css';
import { useAuth0 } from "@auth0/auth0-react";

function NewTrip() {
    const { user } = useAuth0();
    const userCarEndpoint = "http://localhost:5000/usercars/" + user.nickname
    
    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");
    const [fuel, setFuel] = useState([]);
    const [fuel_cap, setFuelCap] = useState(0);
    const [carMPG, setCarMPG] = useState(0);
    const [carId, setCarId] = useState(-1);
    const [distance, setDistance] = useState(25);
    const [userName, setUsername] = useState(user.nickname);

    useEffect(() => {
        Axios.get(userCarEndpoint).then((response) => 
        {
          setFuel(response.data.map(item=>item.current_fuel));
          console.log("changing endpoint to: " + "http://localhost:5000/cars/" + response.data.map(item=>item.car_id))
          setCarId(response.data.map(item=>item.car_id));
        });
    }, []);

    useEffect(() => {
        var carEndpoint = "http://localhost:5000/cars/" + carId;
        if(carEndpoint !== null) {
            console.log("trying the carEndpoint");
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
    
    return (
        <>
        <h2 className='destprompt'>Enter destination:</h2>
        <div className='newstart'>
            <TextField
                value={start}
                label="Start"
                onChange={(e) => {
                    setStart(e.target.value);
                } } />
        </div>
         
        <h2 className='destprompt'>Enter destination:</h2>       
        <div className='newdest'>
            <TextField
                value={dest}
                label="Destination"
                onChange={(e) => {
                    setDest(e.target.value);
                } } />
        
        </div>
            
            <button className="preBtn" style={{ height: 50, width: 200 }} onClick={() => {} }>Preview</button>
            <br></br>
            <button className="newBtn" style={{ height: 50, width: 200 }} onClick={() => {calcDistance(); newTrip()} }>Add New Trip</button>
            <h3>start: {start}</h3>
            <h4>destination: {dest}</h4>
            
        </>
        
    )
}

export default NewTrip