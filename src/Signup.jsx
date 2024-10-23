import { useState } from "react"

import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";


function Signup() {

    let [user, setUser] = useState({});

    let submitData = (e) =>{
        e.preventDefault();
        console.log(user);
        
        if(user.password == user.cpass){
            createUserWithEmailAndPassword(auth,user.email,user.password)
            .then((res)=>{
                console.log(res.user);
            })
            .catch((err)=>{
                alert(err.code);
            })
        }
        else{
            alert("Not Match");
        }
    }

    let changeInput = (e) =>{
         let {name,value} = e.target;
         setUser({...user, [name]:value})
    }

  return (
    <>
     
      <h1>Firebase</h1>
      <form method="post" onSubmit={(e)=>submitData(e)}>
      <table border={1} align='center'>
      

        <tr>
          <td>Enter email</td>
          <td><input type="text" name="email" onChange={(e)=>changeInput(e)}/></td>
        </tr>

        <tr>
          <td>Enter Password</td>
          <td><input type="Password" name="password" onChange={(e)=>changeInput(e)}/></td>
        </tr>
        <tr>
          <td>Enter Confirm Password</td>
          <td><input type="Password" name="cpass" onChange={(e)=>changeInput(e)}/></td>
        </tr>

        <tr>
          <td></td>
          <td><input type="submit"name="submit" /></td>
        </tr>


      </table>
      </form>
      
      
    </>
  )
}

export default Signup
