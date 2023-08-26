import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

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
    setOrderList("");
    setLoading(true);
    if (!name) {
      setError("Enter a customer name to see the order list!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/admin/show_order_list/${name}`);
      console.log(response.data);
      setOrderList(response.data);
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
        <h1 style={{color:"red"}}>Search Order List By Customer Name</h1>
        <form onSubmit={handleSubmit(fetchData)}>
          <label htmlFor="name">Customer Name:</label>
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Show Order"}
          </button>
        </form>
        <hr></hr>
        <h1 style={{color:"green"}}>Order List:</h1>
        <div>
          {orderList.length > 0 ? (
            <ul>
              {orderList.map((order, index) => (
                <li key={index}>
                  <p>Customer Name: {order.name}</p>
                  <p>Product Name: {order.product_name}</p>
                  <p>Seller Name: {order.seller_name}</p>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders founds......</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowOrderList;
