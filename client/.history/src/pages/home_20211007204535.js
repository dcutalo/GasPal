import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import gif from '../1f8f36ae39d05387.gif';
import '../App.css'

const Home = () => {
  const [a, setName] = useState("");
  
  return (
    <div>
    <img src={gif} style={{justifyContent: 'center',alignItems: 'center',}}/>
    
    <div
          style={{ marginLeft: "40%",}}
      >
          <h2>Your gas value:</h2>
          <TextField
              value={a}
              label="Enter value"
              onChange={(e) => {
                  setName(e.target.value);
              } } />
          <h3>Your Enter Value is: {a} </h3>
          <h4>hhshs:</h4>
      </div>
    </div>
  );
};
  
export default Home;