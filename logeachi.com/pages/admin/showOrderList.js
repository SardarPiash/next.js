import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";

function ShowOrderList() {
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderList, setOrderList] = useState([]);
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
    setOrderList([]);
    setLoading(true);
    if (!name) {
      setError("Enter a customer name to see the order list!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/admin/show_order_list/${name}`);
      setOrderList(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
      <Sidebar />
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="w-3/4 p-8 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4 text-center">Search Order List By Customer Name</h1>
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit(fetchData)} className="mb-4 w-full max-w-md">
              <label htmlFor="name" className="block mb-2">Customer Name:</label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none mt-4"
              >
                {loading ? "Submitting..." : "Show Order"}
              </button>
            </form>
          </div>
          <div className="text-center">
            <hr className="my-4" />
            <h1 className="text-2xl font-bold text-green-500 mb-2">Order List:</h1>
            {orderList.length > 0 ? (
              <ul className="list-disc list-inside">
                {orderList.map((order, index) => (
                  <li key={index} className="mb-4 border p-4 rounded shadow">
                    <p><strong>Customer Name:</strong> {order.name}</p>
                    <p><strong>Product Name:</strong> {order.product_name}</p>
                    <p><strong>Seller Name:</strong> {order.seller_name}</p>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ShowOrderList;
