import React, {useState, useEffect} from 'react';
import '../style/triphistory.css';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Popup from './userprofile/Popup'

function TripHistory() {

    // const [itemname, methodcall] = useState(itemtype)
    const [tripList, setTripList] = useState([]);
    const [car, setCar] = useState([]);
    const [tripToDelete, setTripToDelete] = useState([0]);
    const [confirm, setConfirm] = useState(false);
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
    
    function deleteTrip() {
        Axios.delete("http://localhost:5000/trips/delete", {
                trip_id: tripToDelete
        }).then(() => {
            console.log("Successful deletion from trips");
        });
    }
    
    return (
        <><div className='triphistory'>
            <h1 className="tripHisHeader">Current User Trip History</h1>
            <br></br>
            {tripList.map((val) => car.map((val2) => {
                if (val.car_id == val2.car_id) {
                    return (
                        <><h2 className={"tripinfo" + val.car_id}>
                            make: {val2.make} <br></br>
                            Trip_ID: {val.trip_id}  Car_ID: {val.car_id}<br></br>
                            Starting Address: {val.start_adr} <br></br>
                            Destination Address: {val.end_adr}<br></br>
                            Distance: {val.distance} miles
                        </h2><button value={val.trip_id} style={{ height: 40, width: 200 }} /*onClick={() => { setConfirm(true); this.setTripToDelete(val.trip_id); } }*/>Delete</button></>
                    );
                }
            })
            )};
        </div>
            <Popup trigger={confirm} setTrigger={setTripToDelete}>
                <h3> Are you sure you want to delete this trip?</h3>
                <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { deleteTrip(); setConfirm(false); } }>Confirm</button>
                <button className="undoBtn" style={{ height: 40, width: 200 }} onClick={() => { } }>Undo</button>

            </Popup></>
        );
}




export default TripHistory