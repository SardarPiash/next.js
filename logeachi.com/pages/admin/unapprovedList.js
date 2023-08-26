import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useRouter } from "next/router";

function UnapprovedList() {
  const [unapprovedUsers, setUnapprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[approved,setApproved]=useState('');
  const router = useRouter();
   
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
        
    if (!userData) {
      router.push('/User/login'); 
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/unapproved");
      setUnapprovedUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleApproveClick = async (name) => {
    console.log(name);
    try {
      const response = await axios.put(`http://localhost:3001/admin/aproved_new_member/${name}`);
      setApproved(response.data);
    fetchData();
      
    } catch (error) {
      console.error("Error approving member:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div>
        {approved && <p style={{color:"red"}}>{approved}</p>}
        <h1>Unapproved User List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : unapprovedUsers.length > 0 ? (
          <ul>
            {unapprovedUsers.map((user, index) => (
              <li key={index}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>NID: {user.nid}</p>
                <p>Status: {user.status}</p>
                <p>Address: {user.address}</p>
                <p>Approval: {user.approval}</p>
                <button onClick={() => handleApproveClick(user.name)}>Approve</button>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No unapproved users found</p>
        )}
      </div>
    </>
  );
}

export default UnapprovedList;
