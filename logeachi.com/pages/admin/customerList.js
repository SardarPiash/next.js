import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
function customerList(){
    const [custmerInfo, setCustomerInfo]=useState([]);
    const[loading,setLoading]=useState(true);
    const router =useRouter();
    const[error,setError]=useState();
    useEffect(() =>{
     const sessionData = sessionStorage.getItem("user");
     if(!sessionData){
        router.push("/User/login");
        return;
     }
     fetchData();
    },[router]);
    const fetchData = async () =>{
        try{
            const response= await axios.get("http://localhost:3001/admin/customer_list");
            // console.log(response.data);
            setCustomerInfo(response.data);
            setLoading(false);
        } catch(error){
           setError(error);
           setLoading(false);
          }
    };
    
    return (
        <>
        <Sidebar />
        <div>
        <h1 style={{color:"red"}}>Customer's List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : custmerInfo.length > 0 ? (
          <ul>
            {custmerInfo.map((user, index) => (
              <li key={index}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>NID: {user.nid}</p>
                <p>status: {user.status}</p>
                <p>Address: {user.address}</p>
                <hr></hr>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Customer found</p>
        )}
      </div>
        </>

    );
}
export default customerList;