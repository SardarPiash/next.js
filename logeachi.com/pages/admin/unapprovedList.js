import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Header from "../components/header";

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
    <Header/>
      <Sidebar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center mt-8 bg-white p-6 rounded shadow-md">
            {approved && <p className="text-red-500">{approved}</p>}
            <h1 className="text-2xl font-bold mb-4">Unapproved User List</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error.message}</p>
            ) : unapprovedUsers.length > 0 ? (
              <ul className="list-disc list-inside">
                {unapprovedUsers.map((user, index) => (
                  <li key={index} className="mb-4 border p-4 rounded shadow">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>NID:</strong> {user.nid}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Approval:</strong> {user.approval}</p>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mt-2" onClick={() => handleApproveClick(user.name)}>Approve</button>
                    <hr className="my-4" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic">No unapproved users found</p>
            )}
          </div>
      </div>
      <Footer/>
    </>
  );
}

export default UnapprovedList;
