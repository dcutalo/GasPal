import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function Reports() {
    const [trips, setTrips] = useState([]);
    const [cars, setCars] = useState([]);
    const [carlist, setCarList] = useState([]);
    const { user } = useAuth0();
    const userAddr = "http://localhost:5000/trips/" + user.nickname;
    const userCars = "http://localhost:5000/usercars/" + user.nickname;
    const [distances, setDistances] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
      Axios.get(userAddr).then((response) => 
      {
        setTrips(response.data.map(trip=>trip));
      });
      Axios.get(userCars).then((response) => 
      {
        setCars(response.data.map(car=>car));
      });
      Axios.get("http://localhost:5000/cars/").then((response) => 
      {
        setCarList(response.data.map(c=>c));
      });
     }, []);

     useEffect(() => {
        let x = []
        for (var q = 0; q < cars.length; q++){
            x.push(0)
        }
        cars.map((val, i) => {
            trips.map((val2) => {
                if (val.car_id === val2.car_id){
                    x[i] += val2.distance
                }
            })
        })
        
        setDistances(x)
    }, [cars]);

    useEffect(() => {
        let d = 0.0
        {cars.map((val, i) => carlist.map((val2, j) => {
            if(val.car_id === val2.car_id && distances[i] != null){
                d += parseFloat(((parseFloat(distances[i])/parseFloat(val2.mpg))*3.423).toFixed(2))
            }
        }))}
        setTotalCost(d)
    });

    return (
        <div className='gasefficiencyreports'>
        <h1>Reports</h1><br></br>

            {cars.map((val, i) => carlist.map((val2, j) => {
                    if((val.car_id === val2.car_id) && (distances[i] != null)){
                        return (
                            <h3>
                            CarID: {val.car_id}<br></br>
                            Total Distance Travelled: {parseFloat(distances[i]).toFixed(2)} Miles<br></br>
                            Total Gas Spent: {(distances[i]/val2.mpg).toFixed(2)} Gallons<br></br>
                            Estimated Cost: {((distances[i]/val2.mpg)*3.423).toFixed(2)} USD<br></br>
                            <br></br>
                            </h3>
                        );
                    }
                })
            )};

            <h1>Your Estimated Total Cost<br></br> {totalCost} USD</h1>
        </div>
    )
}

export default Reports