import { useState } from "react"

import { auth,Provider } from "./firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'

function Signin() {
    let navigate = useNavigate();

    let [login, setLogin] = useState({});
    let submitData = (e) =>{
        e.preventDefault();
        console.log(login);
        signInWithEmailAndPassword(auth,login.email,login.password)
        .then((res)=>{
            console.log(res.user);
            localStorage.setItem("userId",JSON.stringify(res.user.uid));
            navigate("/home")
        })
        .catch((err)=>{
            alert(err.code)
        })
        
    }

    let changeInput = (e) =>{
        let {name,value} = e.target;
        setLogin({...login, [name]:value});
    }

    let handleClick = () =>{
        signInWithPopup(auth, Provider)
        .then((res)=>{
            console.log(res.user);
            navigate("/home");
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    

  return (
    <>
     
      <h1 style={{textAlign:"center"}}> Sign-In Firebase</h1>
      <form method="post" onSubmit={(e)=>submitData(e)}>
      <table border={1} align='center'>
        <tr>
          <td>Enter email</td>
          <td><input type="email" name="email" onChange={(e)=>changeInput(e)}/></td>
        </tr>

        <tr>
          <td>Enter password</td>
          <td><input type="password" name="password" onChange={(e)=>changeInput(e)}/></td>
        </tr>

        <tr>
          <td></td>
          <td><input type="submit"name="submit" /></td>
        </tr>


      </table>
      </form>
      <div style={{textAlign:"center"}}>
        {/* <button onClick={()=>handleClick()}>Login With Google</button> */}

        <GoogleButton onClick={()=>handleClick()}></GoogleButton>
      </div>

      
      
    </>
  )
}

export default Signin
