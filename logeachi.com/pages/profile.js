import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    
    if (!userData) {
      // User data not found, redirect to login
      router.push('/login'); // Adjust the route to your login page
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Handle parsing error if necessary
    }
  }, []);

  return (
    <div align="center">
      <h1>Profile Page</h1>
      {user ? (
        <>
          <p>
            <span>Name:</span> {user.name}
          </p>
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>Phone:</span> {user.phone}
          </p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
