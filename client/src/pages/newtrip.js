import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import '../style/newtrip.css';

function NewTrip() {

    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");

    
    return (
        <>
        <h2 className='destprompt'>Enter destination:</h2>
        <div className='newstart'>
            <TextField
                value={start}
                label="Start"
                onChange={(e) => {
                    setStart(e.target.value);
                } } />
        </div>
         
        <h2 className='destprompt'>Enter destination:</h2>       
        <div className='newdest'>
            <TextField
                value={dest}
                label="Destination"
                onChange={(e) => {
                    setDest(e.target.value);
                } } />
        
        </div>
        
            <button className="newBtn" style={{ height: 50, width: 200 }} onClick={() => {} }>Add New Trip</button>
            <h3>start: {start}</h3>
            <h4>destination: {dest}</h4>
        </>
        
    )
}

export default NewTrip