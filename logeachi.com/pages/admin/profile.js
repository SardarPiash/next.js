import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Sidebar from "../components/sidebar";
import axios from "axios";

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
      console.log(userName);
      
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
      <Sidebar />
      <div align="center">
        <h1>User Dashboard</h1>
        {user ? (
          <>
            <p>
              <span>Name:</span> {user.name}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
            <p>
              <span>NID:</span> {user.nid}
            </p>
            <p>
              <span>Address:</span> {user.address}
            </p>
          </>
        ) : (
          <p>Something went wrong</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
