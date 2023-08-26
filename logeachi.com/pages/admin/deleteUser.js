import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

function deleteUser() {
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");

    if (!userData) {
      router.push('/User/login');
      return;
    }
  }, [router]);


    const fetchData = async () => {
        setError("");
        setFlag("");
        setLoading(true);
        if (!name) {
          setError("Enter a customer name to delete profile!");
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.delete(`http://localhost:3001/admin/delete/${name}`);
          console.log(response.data);
          setFlag("User Deleted!");
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
            <h1 style={{ color: "red" }}>Delete User By Name</h1>
            <form onSubmit={handleSubmit(fetchData)}>
              <label htmlFor="name"> Name:</label>
              <input name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Deleting..." : "Delete User"}
              </button>
            </form>
            <hr />
            {flag && <p style={{ color: "red" }}>{flag}</p>}
          </div>
        </>
      );
    }
    
    export default deleteUser;