import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { db,auth } from './firebase-config'
import {addDoc, collection, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore'

function App() {


let getUserData = collection(db, "users");
let [user, setUser] = useState([]);
let [addUser, setAddUser] = useState({});
let [userId, setUserId] = useState(null);

auth.onAuthStateChanged((user)=>{
  if(user){
    console.log(user.uid);
  }
  else{
     window.location= '/';
  }
})

 useEffect(()=>{
        setTimeout(()=>{
            getUserDataFromFirebase()
        },1000)
 },[])

 let getUserDataFromFirebase = () =>{
        let getUser = async () =>{
          let data = await getDocs(getUserData);

          setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
          // var allRecord = [];
          // data.docs.map((res)=>{
          //   let obj = {...res.data(),id: res.id};
          //   allRecord.push(obj);
          // })
          // setUser(allRecord)
      }

      getUser();
 }

 let changeInput =  (e) =>{
     let {name,value} = e.target;
     setAddUser({...addUser,[name]:value});
    }
    
    let submitData = async (e) =>{
      e.preventDefault();
      console.log(addUser)
      let addR;
      let editData;
      if(userId){
        console.log("edit");
         editData = await updateDoc(doc(getUserData,userId), addUser);
         getUserDataFromFirebase();
      }
      else{
         addR = await addDoc(getUserData,addUser);
         getUserDataFromFirebase();
      }
 }

 let updateRecord = async (id) =>{
     let singleUser = await getDoc(doc(getUserData,id))
     setAddUser(singleUser.data())
     setUserId(id);
 }


 let logoutUser = () =>{
     auth.signOut();
     window.location="/";
 }

  return (
    <>
     
      <h1>Firebase</h1>
      <button onClick={()=>logoutUser()}>Logout</button>
      <form method="post" onSubmit={(e)=>submitData(e)}>
      <table border={1} align='center'>
        <tr>
          <td>Enter Name</td>
          <td><input type="text" name="name" value={addUser.name?addUser.name:""} onChange={(e)=>changeInput(e)}/></td>
        </tr>

        <tr>
          <td>Enter email</td>
          <td><input type="text" name="email" value={addUser.email?addUser.email:""}  onChange={(e)=>changeInput(e)}/></td>
        </tr>

        <tr>
          <td></td>
          <td><input type="submit" value={userId?"Edit":"Add"} name="submit" /></td>
        </tr>


      </table>
      </form>
      <br/>
      <br/>
      <br/>


      <table border={1} align='center'>
        <tr>
          <td>name</td>
          <td>Email</td>
          <td>Actions</td>
        </tr>

        {user.map((v,i)=>{
          return (
            <tr>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td><button onClick={()=>updateRecord(v.id)}>Update</button></td>
            </tr>
          )
        })}
      </table>
      
    </>
  )
}

export default App
