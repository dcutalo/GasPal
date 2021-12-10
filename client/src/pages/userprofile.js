import Popup from './userprofile/Popup'
import React, {useState, useEffect, useCallback} from 'react';
import '../style/userprofile.css';
import Axios from 'axios';
import AsyncSelect from 'react-select/async';
import { useAuth0 } from "@auth0/auth0-react";
import { SliderPicker } from 'react-color'
import Profile from '../components/profile.js';
import {Redirect} from 'react-router-dom';
import Select from 'react-select';
function UserProfile() {
const { user, isAuthenticated, isLoading } = useAuth0();
var userAddr = "http://localhost:5000/usercars/" + user.nickname;

const [userName, setUsername] = useState([])
const [addCar, setAddCar] = useState(false);
const [deleteCar, setDeleteCar] = useState(false);
const [deleteC, setDeleteC] = useState('');
const [emailButton, setEmailButton] = useState(false);
const [userNameBtn, setUserNameBtn] = useState(false);
const [changePass, setChangePass] = useState(false);
const [Logout, setLogout] = useState(false);
const [myCarBtn, setMyCarBtn] = useState(false);
const [DeleteProfile, setDeleteProfile] = useState(false);
const [myCars, setMyCars] = useState([])
const [carList, setCarList] = useState([])
const [color, setColor] = useState('#000000')
const [blank, setBlank] = useState(false);
//dropdown
const [visible, setVisible] = React.useState(false);
const [visible1, setVisible1] = React.useState(false);
const [visible2, setVisible2] = React.useState(false);
const [visible3, setVisible3] = React.useState(false);
const [inputCar, setCar] = useState('');

const [selectedCar, setSelectedCar] = useState('');
const [selectedMake, setSelectedMake] = useState('');
const [selectedModel, setSelectedModel] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const [selectedTrim, setSelectedTrim] = useState('');
const [options, setoptions] = useState([])
const [options2, setoptions2] = useState([])
const [options3, setoptions3] = useState([])
const [options4, setoptions4] = useState([])
const [modelOptions, setModelOptions] = useState([])

console.log("isAuth: ", isAuthenticated)
console.log("user: ", user)
console.log("isLoading: " + isLoading)

const [tri, setTri] = useState(false);
const [makes, setMakes] = useState([]);

// handle selection
const handleChange = value => {
  setSelectedMake(value.make);
  setVisible(true)
}


useEffect(() => {
  const m = []
  for (var i = 0; i<options.length; i++){
    if (options[i].make === selectedMake){
      m.push(options[i])
    }
  }
  setoptions2(m)
}, [selectedMake]);

const handleChange1 = value => {
  setSelectedModel(value.model);
  setVisible1(true)
}

useEffect(() => {
  const m = []
  for (var i = 0; i< options2.length; i++){
    if (options2[i].model === selectedModel){
      m.push(options2[i])
    }
  }
  setoptions3(m)
}, [selectedModel]);

const handleChange2 = value => {
  setSelectedCar(value);
  setVisible2(true)
}

useEffect(() => {
  const m = []
  for (var i = 0; i< options3.length; i++){
    if (options3[i].year === selectedYear){
      m.push(options3[i])
    }
  }
  setoptions4(m)
}, [selectedYear]);


const handleChange3 = value => {
  setSelectedCar(value);
  setVisible3(true)
}
useEffect(() => {
  for (var i = 0; i< options.length; i++){
    if ((options[i].make === selectedMake) && (options[i].model === selectedModel) 
    && (options[i].year === selectedYear) && (options[i].trim === selectedTrim)){
      setSelectedCar(options[i])
    }
  }
}, [selectedTrim]);

useEffect(() => {
  setColor(color)
}, [color]);

const handleChange4 = value => {
  setDeleteC(value);
}

function deleteCarA(){
  Axios.delete("http://localhost:5000/usercars/delete", {data:{
        username: user.nickname,
        car_id: deleteC.car_id
  }}).then(() => {
  console.log("Successful car delete");
  });
  setTri(false)
}

useEffect(() => {
  deleteCarA()
}, [tri]);

const fetchCars = () => {
  return  Axios.get(userAddr
    ).then(result => {
    const res =  result.data;
    return res;
  });
}

function refreshPage() {
  setVisible(false)
  setVisible1(false)
  setVisible2(false)
  setVisible2(false)
  window.location.reload(false);
}

function newCar(){
    Axios.post("http://localhost:5000/usercars/insert", {
          username: user.nickname,
          car_id: selectedCar.car_id,
          color: color,
          current_fuel: 100
    }).then(() => {
    console.log("Successful car insert");
    });
};

function checkCar(){
  if(myCars.length == 0){
    setBlank(true)
  }
  else{
    setMyCarBtn(true)
  }
}

useEffect(() => {
  Axios.get('http://localhost:5000/usercars/' + user.nickname).then((response) => 
  {
      setMyCars(response.data);
  });
  Axios.get("http://localhost:5000/users").then((response) => 
  {
      setUsername(response.data);
  });
  Axios.get('http://localhost:5000/cars/').then((response) => 
  {
      const clist = response.data.map(result => ({
        car_id: result.car_id,
        make: result.make,
        model: result.model,
        year: result.year,
        trim: result.trim,
        package: result.package,
        tank_max: result.tank_max,
        mpg: result.mpg
      }))
      setoptions(clist);
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
          if (val.username === user.nickname){
              return (    
                  <>
                  <img src={user.picture} alt="user's picture"/>
                  <br></br>
                  <h2>{user.nickname}</h2>
                  <br></br>
                  </>
              )}  
          }           
        )}
      </div>
    
    <br></br>
      <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => checkCar()}>My Cars</button>     
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

     <Popup trigger={blank} setTrigger={setBlank}>
      <h3>You currently have no cars added</h3>
     <button className ="confirmBtn" style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setAddCar(true)}>Add New Car</button>
     </Popup>

     <Popup trigger={myCarBtn} setTrigger={setMyCarBtn}>
      
     {myCars.map((car) =>{
          for (var i = 0; i<options.length; i++){
            if(options[i].car_id === car.car_id){
              let c = car.color
              return (
                <><h3>CarID: {car.car_id} | Make: {options[i].make} | Model: {options[i].model} | Trim: {options[i].trim}</h3>
                <h4 style={{ color: c }}>Color: {car.color}</h4><br></br>
                </>
              )
            }
          }
       })
      }
      
       <button className ="confirmBtn" style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setAddCar(true)}>Add New Car</button>
       <button className ="confirmBtn" style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setDeleteCar(true)}>Delete Car</button>
      </Popup>

      <Popup trigger={deleteCar} setTrigger={setDeleteCar}>
        <div>
        <pre>Select Car to Delete:</pre>
        <Select options={myCars}
        getOptionValue={e => e.car_id}
        getOptionLabel={e => e.car_id}
        onChange={handleChange4}
        />
      </div>
      <button className = "confirmBtn" style={{fontSize: '18px', height:30, width: 200}} onClick={() => {setTri(true);setDeleteCar(false);refreshPage()}} > Confirm</button> 
      </Popup>
      
     <Popup trigger={addCar} setTrigger={setAddCar}>
     <div>
        <pre>Select Make:{selectedMake}</pre>
        <Select options={options}
        getOptionValue={e => e.make}
        getOptionLabel={e => e.make}
        onChange={handleChange}
        />
      </div>
      <br></br>
      <h2></h2>
      <br></br>
      {visible && <div>
        <pre>Select Model:{selectedModel}</pre>
        <Select options={options2}
        getOptionValue={e => e.model}
        getOptionLabel={e => e.model}
        onChange={handleChange1}
        />
      
      </div>}
      <br></br>
      <br></br>
      {visible1 &&  <div>
        <pre>Select Year:{selectedYear}</pre>
        <Select options={options3}
        getOptionValue={e => e.year}
        getOptionLabel={e => e.year}
        onChange={handleChange2}
        />
      </div>}
      <br></br>
      <br></br>
      {visible2 &&  <div>
        <pre>Select Trim:</pre>
        <Select options={options3}
        getOptionValue={e => e.trim}
        getOptionLabel={e => e.trim}
        onChange={handleChange3}
        />
      </div>}
      <br></br>
      <br></br>
      {visible3 &&  <div>
        <div>
        <pre>Select Car Color:</pre><h4 style={{color}}>{color}</h4>
        <br></br>
        <SliderPicker color={color} onChange={updatedColor => setColor(updatedColor.hex)}/>
          </div>
        <div>
        <button className = "confirmBtn" style={{fontSize: '18px', height:30, width: 200}} onClick={() => {newCar();setAddCar(false);refreshPage()}} > Confirm</button> 
        </div>
        </div>}
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
