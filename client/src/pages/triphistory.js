import React, {useState, useEffect} from 'react';
import '../style/triphistory.css';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function TripHistory() {

    // const [itemname, methodcall] = useState(itemtype)
    const [tripList, setTripList] = useState([]);
    const [car, setCar] = useState([]);
    const { user } = useAuth0();
    const userAddr = "http://localhost:5000/trips/" + user.nickname;
    
    // use AXIOS to communicate with backend
    useEffect(() => {
        Axios.get(userAddr).then((response) => 
        {
            setTripList(response.data);
        });
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:5000/cars").then((response) => 
        {
            setCar(response.data);
        });
    }, []);
    
    
    
    return (
        <div className='triphistory'>
            <h1 className="tripHisHeader">Current User Trip History</h1>
            <br></br>
            {tripList.map((val) => 
                car.map((val2) =>{
                    if (val.car_id == val2.car_id){
                        return (
                        <h2 className="tripinfo">
                            make: {val2.make} <br></br>
                            Trip_ID: {val.trip_id}  Car_ID: {val.car_id}<br></br>
                            Starting Address: {val.start_adr} <br></br>
                            Destination Address: {val.end_adr}<br></br>
                            Distance: {val.distance} 
                        </h2>
                    )}
                })
            )};
        </div>
        );
}




export default TripHistory