import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';
import '../style/newtrip.css';

function NewTrip() {
    const name = "uncoolguy01"
    const car = 2;
    const userCarEndpoint = "http://localhost:5000/usercars/" + name
    const carEndpoint = "http://localhost:5000/cars/" + car
    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");
    const [fuel, setFuel] = useState([]);
    const [fuel_cap, setFuelCap] = useState(0);
    const [carMPG, setCarMPG] = useState(0);
    const [carId, setCarId] = useState(car);
    const [distance, setDistance] = useState(25);
    const [userName, setUsername] = useState(name);

    useEffect(() => {
        Axios.get(userCarEndpoint).then((response) => 
        {
          setFuel(response.data.map(item=>item.current_fuel));
        });

        Axios.get(carEndpoint).then((response) => 
        {
          setFuelCap(response.data.map(carro=>carro.tank_max));
          setCarMPG(response.data.map(carro=>carro.mpg));
        });
    }, []);

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