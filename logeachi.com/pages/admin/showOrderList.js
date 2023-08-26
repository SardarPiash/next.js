import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios
import { useRouter } from "next/router"; // Import useRouter

function ShowOrderList() {
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [error, setError] = useState("");
  const [orderList, setOrderList] = useState([]); // State for storing order list
  const router = useRouter(); // Use useRouter to access router

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
        
    if (!userData) {
      router.push('/User/login'); 
      return;
    }
  }, [router]); // Include router in dependency array

  const fetchData = async () => {
    setError(""); // Clear previous error message
    setLoading(true); // Set loading to true while fetching data
    if (!name) {
      setError("Enter a customer name to see the order list!");
      setLoading(false); // Set loading back to false
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/admin/show_order_list/${name}`);
      setOrderList(response.data); // Update order list
      setLoading(false); // Set loading back to false
    } catch (error) {
      setError(error.message); // Display error message
      setLoading(false); // Set loading back to false
    }
  };

  return (
    <>
      <Sidebar />
      <div>
        <form onSubmit={handleSubmit(fetchData)}>
          <label htmlFor="name">Customer Name:</label>
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} /><br></br>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Show Order"}
          </button>
        </form>
        <div>
          {orderList.length > 0 && (
            <ul>
              {orderList.map((customer, index) => (
                <li key={index}>
                  <p>Customer Name: {customer.orderId}</p>
                  <p>Product Name: {customer.product_name}</p>
                  <p>Seller Name: {customer.seller_name}</p>
                  <hr />
                </li>
              ))}
            </ul>
          )}
          {orderList.length === 0 && !loading && <p>No orders found for {name}</p>}
        </div>
      </div>
    </>
  );
}

export default ShowOrderList;
