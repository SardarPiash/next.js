import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Sidebar from "../components/sidebar";
import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    
    if (!userData) {
      router.push('/User/login'); 
      return;
    }
      try {
        const info = JSON.parse(userData);
        const userName = info.name;
        
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/admin/seeuserprofile/${userName}`);
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
  
        fetchData();
      } catch (error) {
        console.error("Error parsing user data:", error);
      }

    
  }, [router]);

  return (
    <>
    <Header/>
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-grow p-8 flex justify-center items-center">
        <div className="w-full md:w-1/2 h-1/2 bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">User Dashboard</h1>
          {user ? (
            <div className="text-left" align="center">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">NID:</span> {user.nid}</p>
              <p><span className="font-semibold">Address:</span> {user.address}</p>
            </div>
          ) : (
            <p className="text-red-500">Something went wrong</p>
          )}
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
    
  );
}

export default ProfilePage;
