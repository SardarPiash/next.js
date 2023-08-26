import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";
function sellerList(){
    const[loading,setLoading]=useState(true);
    const router = useRouter();
    // const {handleSubmit}=useForm();
    const[sellerList,setSellerList]=useState([]);
    const[error,setError]=useState('');

    useEffect(() => {
        const userData = sessionStorage.getItem("user");
            
        if (!userData) {
          router.push('/User/login'); 
          return;
        }
        fetchData();
      }, [router]);

      const fetchData = async () => {
        setError("");
        setLoading(true);
    
        try {
          const response = await axios.get("http://localhost:3001/admin/seller_list");
          setSellerList(response.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

    
    return (
        <>
        <Sidebar />
        <div>
        <h1 style={{color:"red"}}>Seller's List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : sellerList.length > 0 ? (
          <ul>
            {sellerList.map((user, index) => (
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
          <p>No Seller found</p>
        )}
      </div>
        </>

    );
}
export default sellerList;