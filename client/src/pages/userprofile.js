import Popup from './userprofile/Popup'
import React, {useState, useEffect} from 'react';
import '../style/userprofile.css';
import Axios from 'axios';
import AsyncSelect from 'react-select/async';
import { useAuth0 } from "@auth0/auth0-react";
import { SliderPicker } from 'react-color'
const name = "uncoolguy05"

function UserProfile() {
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
const [color, setColor] = useState('#fff')
//dropdown
const [visible, setVisible] = React.useState(false);
const [visible1, setVisible1] = React.useState(false);
const [visible2, setVisible2] = React.useState(false);
const [visible3, setVisible3] = React.useState(false);
const [inputCar, setCar] = useState('');
const [selectedCar, setSelectedCar] = useState(null);
const { user, isAuthenticated, isLoading } = useAuth0();
console.log("isAuth: ", isAuthenticated)
console.log("user: ", user)
console.log("isLoading: " + isLoading)

const [model, setModel] = useState('');

let honda = 'Honda'
// handle input change event
const handleInputChange = value => {
  setCar(value);
};

// handle selection
const handleChange = value => {
  setSelectedCar(value);
  setVisible(true)
}

const handleChange1 = value => {
  setSelectedCar(value);
  setVisible1(true)
}

const handleChange2 = value => {
  setSelectedCar(value);
  setVisible2(true)
}

const handleChange3 = value => {
  setSelectedCar(value);
  setVisible3(true)
}

const handleChange4 = value => {
  setDeleteC(value);
}

function handleDelete(){
  Axios.post("http://localhost:5000/usercars/delete", {
        username: name,
        car_id: deleteC.car_id
  }).then(() => {
  console.log("Successful car insert");
  });
};
const fetchData = () => {
  return  Axios.get('http://localhost:5000/cars'
    ).then(result => {
    const res =  result.data;
    return res;
  });
}

const fetchCars = () => {
  return  Axios.get('http://localhost:5000/usercars/' + name
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

function check(value){
  if (value.make == selectedCar.make){
    setModel(value.model)
    return value.model
  }
}

function newCar(){
    Axios.post("http://localhost:5000/usercars/insert", {
          username: name,
          car_id: selectedCar.car_id,
          color: color,
          current_fuel: 100
    }).then(() => {
    console.log("Successful car insert");
    });
};



useEffect(() => {
  Axios.get('http://localhost:5000/usercars/' + name).then((response) => 
  {
      setMyCars(response.data);
  });
}, []);

useEffect(() => {
  Axios.get("http://localhost:5000/users").then((response) => 
  {
      setUsername(response.data);
  });
}, []);

useEffect(() => {
  Axios.get('http://localhost:5000/cars/').then((response) => 
  {
      setCarList(response.data);
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
      <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setMyCarBtn(true)}>My Cars</button>     
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

     <Popup trigger={myCarBtn} setTrigger={setMyCarBtn}>
       
     {myCars.map((car) =>{
          for (var i = 0; i<carList.length; i++){
            if(carList[i].car_id === car.car_id){
              let c = car.color
              return (
                <><h3>CarID: {car.car_id} | Make: {carList[i].make} | Model: {carList[i].model} | Trim: {carList[i].trim}</h3>
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
        <pre>Select Make:</pre>
        <AsyncSelect cacheOptions defaultOptions value={deleteC}
        getOptionValue={e => e.car_id}
        getOptionLabel={e => e.car_id}
        loadOptions={fetchCars} onInputChange={handleInputChange} onChange={handleChange4}/>
      </div>
      <button className = "confirmBtn" style={{fontSize: '18px', height:30, width: 200}} onClick={() => {handleDelete();setDeleteCar(false);refreshPage()}} > Confirm</button> 
      </Popup>
      
     <Popup trigger={addCar} setTrigger={setAddCar}>
     <div>Selected Value: {JSON.stringify(selectedCar || {}, null, 2)}</div>
     <div>
        <pre>Select Make:</pre>
        <AsyncSelect cacheOptions defaultOptions value={selectedCar}
        getOptionValue={e => e.car_id}
        getOptionLabel={e => e.make}
        loadOptions={fetchData} onInputChange={handleInputChange} onChange={handleChange}/>
      </div>
      <br></br>
      <h2></h2>
      <br></br>
      {visible && <div>
        <pre>Select Model:</pre>
        <AsyncSelect cacheOptions defaultOptions value={selectedCar}
        getOptionValue={e => (e.make === selectedCar.make? e.car_id:null)}
        getOptionLabel={e => check(e)}
        loadOptions={fetchData} onInputChange={handleInputChange} onChange={handleChange1}/>
      </div>}
      <br></br>
      <br></br>
      {visible1 &&  <div>
        <pre>Select Year:</pre>
        <AsyncSelect cacheOptions defaultOptions value={selectedCar}
        getOptionValue={e => (e.make === selectedCar.make && e.model === selectedCar.model? e.car_id:null)}
        getOptionLabel={e => (e.make === selectedCar.make && e.model === selectedCar.model? e.year:null)}
        loadOptions={fetchData} onInputChange={handleInputChange} onChange={handleChange2}/>
      </div>}
      <br></br>
      <br></br>
      {visible2 &&  <div>
        <pre>Select Trim:</pre>
        <AsyncSelect cacheOptions defaultOptions value={selectedCar}
        getOptionValue={e => (e.make === selectedCar.make && e.model === selectedCar.model && e.year === selectedCar.year? e.car_id:null)}
        getOptionLabel={e => (e.make === selectedCar.make && e.model === selectedCar.model&& e.year === selectedCar.year? e.trim:null)}
        loadOptions={fetchData} onInputChange={handleInputChange} onChange={handleChange3}/>
      </div>}
      <br></br>
      <br></br>
      {visible3 &&  <div>
        <div>
        <pre>Select Car Color:</pre>
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
