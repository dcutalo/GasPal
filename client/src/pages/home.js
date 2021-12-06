import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import '../App.css'
import GaugeChart from 'react-gauge-chart'
import Axios from 'axios';
import Popup from './userprofile/Popup'
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  var userAddr = "http://localhost:5000/usercars/" + user.nickname;

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
  const [fuels, setFuels] = useState([]);
  const [ids, setIDs] = useState([])
  const [colors, setColors] = useState("")
  useEffect(() => {
      console.log("made it to this step: set fuel")
      Axios.get(userAddr).then((response) => 
      {
        setCars(response.data.map(car=>car));
        setFuels(response.data.map(item=>item.current_fuel));
        setIDs(response.data.map(resp=>resp.car_id));
        setColors(response.data.map(resp=>resp.color));
      });
  }, []);

  function switchCar(){
    if((curr+1) >= cars.length){
      setCurr(0)
    }
    else{
      setCurr(curr + 1)
    }
    setFuel(fuels[curr])
    setUserCarID(ids[curr])
    setColor(colors[curr])
  }
  useEffect(() => {
    setFuel(fuels[0])
    setUserCarID(ids[0])
    setColor(colors[0])
  }, [cars]);

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

  function fillFuel(input){
    if(validInput) {
      setFuel(input)
      setCFuel(input)
      setConfirm(true);
    }
    else {
      alert("Invalid Input: " + input + " please enter a value less than 100");
    }
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
        </div>
        <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => {validateInput(a); fillFuel(a); } }>Confirm</button>
      </div><button className="fillUpbtn" style={{ height: 40, width: 200 }} onClick={() => {setVal("100"); validateInput(a); fillFuel(100);}}>Fill Up</button>
      <button style={{ fontWeight: 'bold', position: "absolute", bottom: 10, right: 10, height:30, width:100}} onClick={() => switchCar()}> 
                  Switch Car</button> 
      </><Popup trigger={confirm} setTrigger={setConfirm}>
          <h3> Save changes?</h3>
          <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { submitFuel(); setConfirm(false); } }>Confirm</button>
          <button className="undoBtn" style={{ height: 40, width: 200 }} onClick={() => {  setConfirm(false); refreshPage();} }>Undo</button>
          
      </Popup></>
      
    );
  };
  
export default Home;