import Popup from './components/Popup'
import { useState } from 'react'

function App() {
const [emailButton, setEmailButton] = useState(false);
const [userNameBtn, setUserNameBtn] = useState(false);
const [changePass, setChangePass] = useState(false);

  return (
    <div className="App">
     <main>
       <h1>User Profile</h1>
       <br></br>
       <button onClick={() => setEmailButton(true)}>Update Email</button>
       <br></br>
       <br></br>
       <button onClick={() => setUserNameBtn(true)}>Change User Name</button>
       <br></br>
       <br></br>
       <button onClick={() => setChangePass(true)}>Change Password</button>     
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

export default App;
