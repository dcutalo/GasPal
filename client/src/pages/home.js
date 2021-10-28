import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import '../App.css'
import GaugeChart from 'react-gauge-chart'
import Axios from 'axios';
import Popup from './userprofile/Popup'

const name = "uncoolguy01"
const addr = "http://localhost:5000/usercars/" + name

const Home = () => {
  const [a, setVal] = useState("");
  const [c, setFuel] = useState([]);
  const [userName, setUsername] = useState(name)
  const [userCarID, setUserCarID] = useState("1")
  const [color, setColor] = useState("black")
  const [c_fuel, setCFuel] = useState("0")
  const [confirm, setConfirm] = useState(false);
  const [validInput, setValidInput] = useState(false);

  useEffect(() => {
    Axios.get(addr).then((response) => 
    {
      setFuel(response.data.map(item=>item.current_fuel));
    });
  }, []);

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
    setValidInput(input <= 100 && input.length > 0);
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
    </div><button className="fillUpbtn" style={{ height: 40, width: 200 }} onClick={() => { fillFuel(100); setConfirm(true); }}>Fill Up</button>

    </><Popup trigger={confirm} setTrigger={setConfirm}>
        <h3> Save changes?</h3>
        <button className="confirmBtn" style={{ height: 40, width: 200 }} onClick={() => { submitFuel(); setConfirm(false); } }>Confirm</button>
        <button className="undoBtn" style={{ height: 40, width: 200 }} onClick={() => {  setConfirm(false); refreshPage();} }>Undo</button>
        
    </Popup></>
    
  );
};
  
export default Home;