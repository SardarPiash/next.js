import { userTextArray } from "@/temp_database/temp_database";
import { useState} from "react";

export default function chat(){

  const[msg1,setMsg1]=useState('');
  const[msg2,setMsg2]=useState('');
  const[person1,setPerson1]=useState('');
  const[person2,setPerson2]=useState('');
  const [userText,setUserText]=useState([]);


/*************************If wants to print value for specific name************************** */
    // const [piashText,setUserTextPiash]=useState([]);
    // const [kaiumText,setUserTextKaium]=useState([]);
    // const fetchComment= async() => {
    //   const Piash = userTextArray.filter((user)=>user.name==="Piash");
    //   setUserText(Piash);
    //   const Kaium = userTextArray.filter((user)=>user.name==="Kaium");
    //   setUserTextKaium(Kaium);
    // }

    const fetchComment= async() => {
      const arrayData = await fetch("/api/call_temp_database")
      const data = await arrayData.json()
      setUserText(data);
    }



  return(

    <div>
      <h2 align="center">Live Chat Box</h2>
      <form>
        <label>Name:</label>
        <input type="text" id="person1" value={person1} onChange={(e)=>setPerson1(e.target.value)}/><br/>
        <label>Text:</label>
        <input type="text" id="msg1" value={msg1} onChange={(e) => setMsg1(e.target.value)}/><br/>
        <br/><br/> 
        <label>Name:</label>
        <input type="text" id="person2" value={person2} onChange={(e)=>setPerson2(e.target.value)}/><br/>
        <label>Text:</label>
        <input type="text" id="msg2" value={msg2} onChange={(e) => setMsg2(e.target.value)}/><br/>
      </form>
      <br/><br/><br/><br/><br/>
      <h2>Chat info</h2>
      <br/>
      <p><b>{person1}:</b> {msg1}</p><br/><br/>
      <hr/>
      <p><b>{person2}:</b> {msg2}</p><br/><br/>
      <hr/>
      <button onClick={fetchComment}>Previous data</button>

      {userText.map(user=>{
         
         return(
          <div>{user.name} : {user.text}</div>
         )
      } 
        )}
      
      {/* /*************************If wants to print value for specific name**************************  */}
      {/* {piashText.map(user=>{
         
         return(
          <div>{user.name} : {user.text}</div>
         )
      } 
        )}
      
      {kaiumText.map(user=>{
         
         return(
          <div>{user.name} : {user.text}</div>
         )
      } 
        )} */}
        
         
    </div>
  );


}

