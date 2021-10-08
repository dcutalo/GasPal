
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import gif from '../../src/Screenshot 2021-10-04 084010';
import '../App.css'

const Home = () => {
  const [name, setName] = useState("");
  
  return (
    <div>
    <img src={gif} style={{justifyContent: 'center',alignItems: 'center',}}/>
    
    <div
          style={{
              marginLeft: "40%",
          }}
      >
          <h2>Your gas value:</h2>
          <TextField
              value={name}
              label="Enter value"
              onChange={(e) => {
                  setName(e.target.value);
              } } />
          <h3>Your Enter Value is: {name} </h3>
      </div>
    </div>
  );
};
  
export default Home;