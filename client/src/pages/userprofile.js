import Popup from './userprofile/Popup'
import React, {useState, useEffect} from 'react';
import '../style/userprofile.css';
import Axios from 'axios';
import AsyncSelect from 'react-select/async';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../components/profile.js'
const name = "coolguy05"

function UserProfile() {
const [addCar, setAddCar] = useState(false);
const [emailButton, setEmailButton] = useState(false);
const [userNameBtn, setUserNameBtn] = useState(false);
const [changePass, setChangePass] = useState(false);
const [Logout, setLogout] = useState(false);
const [DeleteProfile, setDeleteProfile] = useState(false);
//dropdown
const [inputCar, setCar] = useState('');
const [selectedCar, setSelectedCar] = useState(null);
const { user, isAuthenticated, isLoading } = useAuth0();
console.log("isAuth: ", isAuthenticated)
console.log("user: ", user)
console.log("isLoading: " + isLoading)

// handle input change event
const handleInputChange = value => {
  setCar(value);
};

// handle selection
const handleChange = value => {
  setSelectedCar(value);
}

const fetchData = () => {
  return  Axios.get('http://localhost:5000/cars').then(result => {
    const res =  result.data;
    return res;
  });
}

const [userName, setUsername] = useState([])
useEffect(() => {
  Axios.get("http://localhost:5000/users").then((response) => 
  {
      setUsername(response.data);
  });
}, []);

if(isLoading) {
  return <div>Loading...</div>
}
  return (
      <div className="userp">
      <main className="btns">
        <div>
      {userName.map((val) => {
          if (val.username === name){
              return (    
                  <>
                  <h2>{user.nickname}</h2>
                  <br></br>
                  <br></br>
                  <img src={user.picture} alt="user's picture"/>
                  </>
              )}  
          }           
        )}
      </div>
      <br></br>
        <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setAddCar(true)}>Add Car</button>     
        <br></br>
        <br></br>
        <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setEmailButton(true)}>Update Email</button>
        <br></br>
        <br></br>
        <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setUserNameBtn()}>Change User Name</button>
        <br></br>
        <br></br>
        <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setChangePass(true)}>Change Password</button>     
        <br></br>
        <br></br>
        <button style={{ fontWeight: 'bold', color: '#CB1B1E', position: "absolute", bottom: 10, right: 10, height:30, width:100}} onClick={() => setDeleteProfile(true)}> 
                    DeleteProfile</button> 
        <br></br>
        <br></br>
        <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setLogout(true)}>Logout</button> 
      </main>

      <Popup trigger={addCar} setTrigger={setAddCar}>
      <div>Selected Value: {JSON.stringify(selectedCar || {}, null, 2)}</div>
      <div>
          <pre>Select Make:</pre>
          <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedCar}
          getOptionValue={e => e.car_id}
          getOptionLabel={e => e.make}
          loadOptions={fetchData}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
        </div>
        <br></br>
        <br></br>
        <div>
          <pre>Select Model:</pre>
          <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedCar}
          getOptionValue={e => e.car_id}
          getOptionLabel={e => e.model}
          loadOptions={fetchData}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
        </div>
        <br></br>
        <br></br>
        <div>
          <pre>Select Year:</pre>
          <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedCar}
          getOptionValue={e => e.car_id}
          getOptionLabel={e => e.year}
          loadOptions={fetchData}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
        </div>
        <br></br>
        <br></br>
        <div>
        <button className = "confirmBtn" style={{fontSize: '18px', height:30, width: 200}} > Confirm</button> 
        </div>
        </Popup>
      <Popup trigger={emailButton} setTrigger={setEmailButton}>
          <form action="text">
            Enter your new email address:
            <input type="text" placeholder="New Email" required className="emailText"></input>  
          </form>
        </Popup>
        <Popup trigger={userNameBtn} setTrigger={setUserNameBtn}>
          <form action="text">
            Enter your new user name:
            <input type="text" placeholder="New User Name" required className="emailText"></input>  
          </form>
        </Popup>
        <Popup trigger={changePass} setTrigger={setChangePass}>
          <form action="text">
            Enter your old password:
            <input type="text" placeholder="Old Password" required className="emailText"></input>
            {' '}
            <input type="text" placeholder="New Password" required className="emailText"></input>  
          </form>
        </Popup>
      </div>
  );
}

export default UserProfile;
