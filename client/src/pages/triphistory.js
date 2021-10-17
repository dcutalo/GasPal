import React, {useState, useEffect} from 'react';
import '../style/triphistory.css';
import Axios from 'axios';

function TripHistory() {

    // const [itemname, methodcall] = useState(itemtype)
    const [tripList, setTripList] = useState([])

    // use AXIOS to communicate with backend
    useEffect(() => {
        Axios.get("http://localhost:5000/trips").then((response) => 
        {
            setTripList(response.data);
        });
    }, []);

    
    return (
        <div className='triphistory'>
            <h1 className="tripHisHeader">Current User Trip History</h1>
            <br></br>
            {tripList.map((val) =>{
                return (
                <h2 className="tripinfo">
                    Trip_ID: {val.trip_id}  Car_ID: {val.car_id}<br></br>
                    Starting Address: {val.start_adr} <br></br>
                    Destination Address: {val.end_adr}<br></br>
                    Distance: {val.distance} 
                </h2>
                );
            })};
        </div>
        );
}




export default TripHistory