import React, {useState, useEffect} from 'react';
import '../style/triphistory.css';
import Axios from 'axios';
const name = "coolguy04"

function TripHistory() {

    // const [itemname, methodcall] = useState(itemtype)
    const [tripList, setTripList] = useState([])
    const [car, setCar] = useState([])
    
    // use AXIOS to communicate with backend
    useEffect(() => {
        Axios.get("http://localhost:5000/trips").then((response) => 
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