import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
function blockedUser(){
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
          setError("Enter a customer name to blocked profile!");
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.put(`http://localhost:3001/admin/blocked_user/${name}`);
          console.log(response.data);
          setFlag(response.data);
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
            <h1 style={{ color: "red" }}>Blocked User By Name</h1>
            <form onSubmit={handleSubmit(fetchData)}>
              <label htmlFor="name"> Name:</label>
              <input name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Blocking..." : "Blocked User"}
              </button>
            </form>
            <hr />
            {flag && <p style={{ color: "red" }}>{flag}</p>}
          </div>
        </>

    );
}
export default blockedUser;