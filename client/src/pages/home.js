import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import gif from '../1f8f36ae39d05387.gif';
import '../App.css'

const Home = () => {
  const [a, setName] = useState("");
  const [c, confirm] = useState("");
  return (
    <div>
    <img src={gif} className="homeimg"/>
    <h2 className="gastext">Enter Gas Value:</h2>
    <div className="gasvalue">
          <TextField
              value={a}
              label="Enter your value"
              onChange={(e) => {
                  setName(e.target.value);
              } } />
              <button style={{ height:30, width: 100}} onClick={() => confirm(true)}>Confirm</button>
          <h3>{a}</h3>
      </div>
    </div>
  );
};
  
export default Home;