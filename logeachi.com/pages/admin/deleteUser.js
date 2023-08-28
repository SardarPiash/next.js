import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Header from "../components/header";

function DeleteUser() {
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
    const userData = sessionStorage.getItem("user");
    const info = JSON.parse(userData);
    if (info.name !== name) {
      try {
        const response = await axios.delete(`http://localhost:3001/admin/delete/${name}`);
        console.log(response.data);
        setFlag(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setFlag("You can't delete your profile!");
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex items-center justify-center h-screen">
        <div className="mt-10 ml-56">
          <h1 className="text-red-500 text-3xl mb-4">Delete User By Name</h1>
          <form onSubmit={handleSubmit(fetchData)}>
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 w-full"
            /><br />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              {loading ? "Deleting..." : "Delete User"}
            </button>
          </form>
          <hr className="my-4" />
          {flag && <p className="text-red-500">{flag}</p>}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default DeleteUser;
