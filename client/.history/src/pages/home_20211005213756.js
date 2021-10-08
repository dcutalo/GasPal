
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import gif from '../1f8f36ae39d05387.gif'


const Home = () => {
  const [name, setName] = useState("");
  
  return (
    <><img src={gif} alt="loading..." /><div
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
      </div></>
  );
};
  
export default Home;