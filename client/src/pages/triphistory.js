/*global google*/
import React, {useState, useEffect} from 'react';
import '../style/triphistory.css';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Popup from './userprofile/Popup'
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import DirectionsRenderer from 'react-google-maps/lib/components/DirectionsRenderer';

function TripHistory() {

    // const [itemname, methodcall] = useState(itemtype)
    const [tripList, setTripList] = useState([]);
    const [car, setCar] = useState([]);
    const [tripToDelete, setTripToDelete] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const { user } = useAuth0();
    const userAddr = "http://localhost:5000/trips/" + user.nickname;
    const [directions, setDirections] = useState([]);
    const [showMap, setShowMap] = useState(false);
    // use AXIOS to communicate with backend
    useEffect(() => {
        const script = document.createElement('script');
        
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8&callback=initMap";
        script.async = true;
        
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:5000/cars").then((response) => 
        {
            setCar(response.data);
        });
    }, []);

    useEffect(() => {
        Axios.get(userAddr).then((response) => 
        {
            setTripList(response.data);
        });
    }, [car]);
    
    function deleteTrip() {
        Axios.delete("http://localhost:5000/trips/delete", {
                data:{
                    trip_id: tripToDelete
                }
        }).then(() => {
            console.log("Successful deletion from trips");
        });

        window.location.reload(false);
    }
    
    function Map() {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(41.8507300, -87.6512600),
            destination: new google.maps.LatLng(41.8525800, -87.6514100),
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
                className="GoogleMaps"
                defaultZoom={10}
                defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}/>
            <DirectionsRenderer
                directions={directions} /></>
        );
    }

    const WrappedMap = withScriptjs((withGoogleMap(Map)));

    return (
        <><div className='triphistory'>
            <h1 className="tripHisHeader">Current User Trip History</h1>
            <br></br>
            {tripList.reverse().map((val) => car.map((val2) => {
                if (val.car_id == val2.car_id) {
                    return (
                        <><h2 className={"tripinfo" + val.car_id}>
                            Trip_ID: {val.trip_id}  | Car_ID: {val.car_id} | Gas Tank:{val2.tank_max} Gallons<br></br> 
                            {val2.make} | {val2.model} | {val2.year} | {val2.trim} | {val2.package}<br></br>
                            Starting Address: {val.start_adr} <br></br>
                            Destination Address: {val.end_adr}<br></br>
                            Distance: {val.distance} miles |
                            Gas Usage: {(val.distance/val2.mpg).toFixed(2)} Gallons ({((val.distance/val2.mpg)/val2.tank_max).toFixed(2)}%)
                        </h2><button style={{ height: 40, width: 200 }} onClick={() => { setConfirm(true); setTripToDelete(val.trip_id); } }>Delete</button>
                        <button style={{ height: 40, width: 200 }} onClick={() => setShowMap(true) }>Map</button>
                        <br></br>
                        <br></br>
                        </>
                    );
                }
            })
            )}
        </div>
            <Popup trigger={confirm} setTrigger={setConfirm}>
                <h3> Are you sure you want to delete this trip?</h3>
                <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { deleteTrip(); setConfirm(false); } }>Confirm</button>
                <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { setConfirm(false)} }>Undo</button>

            </Popup>
            <Popup trigger={showMap} setTrigger={setShowMap}>
            <WrappedMap
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBwHhEVEn_9nLrizLT_zf49V2RrTMS83V8&callback=initMap"}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
        </Popup>
            </>
            
        );
}




export default TripHistory