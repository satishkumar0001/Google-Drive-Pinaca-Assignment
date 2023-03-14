import Header from "./Header";
import Sidebar from "./Sidebar";
import { auth, provider } from "./firebase";
import Data from './Data'
import { useState } from "react";



function App() {
  const [user,setUser] = useState(null); 

  const signin = ()=>{
    auth.signInWithPopup(provider).then(({user})=>{
      setUser(user)
    }).catch(error=>{
      alert(error.message);
    })
  }
  return (
    <>
    {
      user ? (
        <>
      <Header photoURL={user.photoURL}/>
      <div className="App">
      <Sidebar/>
      <Data/>
    </div>
        </>
      ):(
        <div className="loginWrap">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png" alt="logo"/>
          <button onClick={signin}>Login to Google Drive</button>
        </div>
      )
    }
   
    </>
  );
}

export default App;
