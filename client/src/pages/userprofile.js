import Popup from './userprofile/Popup'
import { useState } from 'react'
import '../style/userprofile.css'
import Axios from "axios";

function UserProfile() {
const [emailButton, setEmailButton] = useState(false);
const [userNameBtn, setUserNameBtn] = useState(false);
//const [username, setUsername] = useState("");
//const [email, setEmail] = useState("");
const [changePass, setChangePass] = useState(false);
const [Logout, setLogout] = useState(false);
const [DeleteProfile, setDeleteProfile] = useState(false);

//  const submitUser = () => {
//    Axios.post("http://localhost:5000/users/insert", {
//      username: username,
//      email: email,
//    }).then(() => {
//      alert("Successful insert");
//    });
//  };

  return (
    <div className="userp">
     <main className="btns">
       <h1 className="profiletext">User Profile</h1>
       <br></br>
       <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setEmailButton(true)}>Update Email</button>
       <br></br>
       <br></br>
       <button style={{ fontWeight: 'bold', height:30, width: 200}} onClick={() => setUserNameBtn(true)}>Change User Name</button>
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
