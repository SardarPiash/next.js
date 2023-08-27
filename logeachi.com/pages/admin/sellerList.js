import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/footer";

function SellerList() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [sellerList, setSellerList] = useState([]);
  const [error, setError] = useState('');

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
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md">
          <h1 className="text-red-500 text-2xl font-bold mb-4">Seller's List</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : sellerList.length > 0 ? (
            <ul>
              {sellerList.map((user, index) => (
                <li key={index} className="mb-4">
                  <p className="font-semibold">Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>NID: {user.nid}</p>
                  <p>Status: {user.status}</p>
                  <p>Address: {user.address}</p>
                  <hr className="my-2 border-gray-300" />
                </li>
              ))}
            </ul>
          ) : (
            <p>No Sellers found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SellerList;
