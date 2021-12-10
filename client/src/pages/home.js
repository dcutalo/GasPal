import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import '../App.css'
import GaugeChart from 'react-gauge-chart'
import Axios from 'axios';
import Popup from './userprofile/Popup'
import { useAuth0 } from "@auth0/auth0-react";
import Select from 'react-select';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  var userDefaultCarAddr = "http://localhost:5000/usercarsDefaultCar/" + user.nickname;
  var userCarsAddr = "http://localhost:5000/usercars/" + user.nickname;
  const [a, setVal] = useState("");
  const [c, setFuel] = useState([]);
  const [cars, setCars] = useState([]);
  const [curr, setCurr] = useState(0);
  const [userName, setUsername] = useState(user.nickname)
  const [userCarID, setUserCarID] = useState(0)
  const [color, setColor] = useState("")
  const [c_fuel, setCFuel] = useState(0)
  const [confirm, setConfirm] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [carToDefault, setCarToDefault] = useState([]);
  /*
  const [fuels, setFuels] = useState([]);
  const [ids, setIDs] = useState([])
  const [colors, setColors] = useState("")
  const [sw, setSw] = useState(0)
  */
  useEffect(() => {
      console.log("made it to this step: set fuel")
      Axios.get(userDefaultCarAddr).then((response) => 
      {
        setFuel(response.data.map(item=>item.current_fuel));
        setUserCarID(response.data.map(resp=>resp.car_id));
        setColor(response.data.map(resp=>resp.color));
      });
  }, []);

  useEffect(() => {
    console.log("made it to this step: set fuel")
    Axios.get(userCarsAddr).then((response) => 
    {
      setCars(response.data.map(car=>car));
    });
}, []);

  
/*
  function switchCar(){
    if(sw === 0)
    {
      setSw(1)
    }
    if (sw === 1)
    {
      setSw(0)
    }
  }

  useEffect(() => {
    Axios.get(userAddr).then((response) => 
      {
        setCars(response.data.map(car=>car));
        setFuels(response.data.map(item=>item.current_fuel));
        setIDs(response.data.map(resp=>resp.car_id));
        setColors(response.data.map(resp=>resp.color));
      });
    if((curr+1) >= cars.length){
      setCurr(0)
    }
    else{
      setCurr(curr + 1)
    }
    setFuel(fuels[curr])
    setUserCarID(ids[curr])
    setColor(colors[curr])
  }, [sw]);
*/

  useEffect(() => {
    validateInput(a)
  }, [a]);

  function submitFuel(){
    Axios.put("http://localhost:5000/usercars/update", {
      username: userName,
      car_id: userCarID,
      color: color,
      current_fuel: c_fuel
    }).then(() => {
      console.log("Successful insert to usercars");
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  function validateInput(input) {
    
    setValidInput(input < 101);
    
  }

  const changeDefaultCar = carNum => {
    console.log(carNum);
    Axios.all([
      Axios.put("http://localhost:5000/usercarsDefaultCarReset/update", {
        username: userName
      }), 
      Axios.put("http://localhost:5000/usercarsDefaultCarSet/update", {
        username: userName,
        car_id: carNum.car_id
      })
    ])
    .then(Axios.spread((data1, data2) => {
      // output of req.
      console.log('data1', data1, 'data2', data2)
    }));

    refreshPage();
  }

  function fillFuel(input){

    if(cars.length==0){
      alert("No cars added")
    }
    else {
    if(validInput) {
      setFuel(input)
      setCFuel(input)
      setConfirm(true);
    }
    else {
      alert("Invalid Input: " + input + " please enter a value less than 100");
    }
  }
  }

  function dosomething(){

  }
    return (
      <><><div>
        <br></br>
        <br></br>
        <GaugeChart className="gauge"
          nrOfLevels={10}
          colors={["red", "green"]}
          arcWidth={0.3}
          percent={c / 100}
          textColor='#730000'
          arcPadding={0.02}
          style={{ width: '70%' }}
          animDelay={200} />
        <br></br>
        <br></br>
        <h2 className="gastext">Current Car ID: {userCarID}</h2>
        <h2 className="gastext">Enter Current Fuel:</h2>
        <div className="gasvalue">
          <TextField
            value={a}
            label="Your Current Fuel %"
            onChange={(e) => {
              let input = e.target.value ;
              if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]'))) {
                setVal(input)
              }     
            }}/>
      <div className="selectCar">
      <pre>Select Car:</pre>
      <Select options={cars}
        getOptionValue={e => e.car_id}
        getOptionLabel={e => e.car_id}
        onChange={changeDefaultCar}
      />
      </div>
        </div>
        <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => {validateInput(a); fillFuel(a); } }>Confirm</button>
      </div><button className="fillUpbtn" style={{ height: 40, width: 200 }} onClick={() => {setVal("100"); validateInput(a); fillFuel(100);}}>Fill Up</button>
      </><Popup trigger={confirm} setTrigger={setConfirm}>
          <h3> Save changes?</h3>
          <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { submitFuel(); setConfirm(false); } }>Confirm</button>
          <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { setConfirm(false); refreshPage();} }>Undo</button>
          
      </Popup></>
      
    );
  };
  
export default Home;