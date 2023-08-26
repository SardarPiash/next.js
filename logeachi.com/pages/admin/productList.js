import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form"; 

function ProductList() {
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState('');
  const [productList, setProductList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const sessionData = sessionStorage.getItem("user");
    if (!sessionData) {
      router.push("/User/login");
      return;
    }
  }, [router]);

  const fetchData = async () => {
        setError("");
        setNameError("");
        setName("");
        setProductList("");
        setLoading(true);
        
        if (!name) {
            setNameError("Enter A Name to search"); 
            setLoading(false);
            return;
        }

    try {
      const response = await axios.post(`http://localhost:3001/admin/Product_list/${name}`);
      setProductList(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div>
        <h1 style={{ color: "red" }}>Search Product List By Seller Name</h1>
        <form onSubmit={handleSubmit(fetchData)}>
          <label htmlFor="name">Seller Name:</label>
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
          {nameError && <p style={{ color: "red" }}>{nameError}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Show Order"}
          </button>
        </form>
        <hr />
        <h1 style={{ color: "green" }}>Product List:</h1>
        <div>
          {productList.length > 0 ? (
            <ul>
              {productList.map((order, index) => (
                <li key={index}>
                  <p>Seller Name: {order.name}</p>
                  <p>Product Name: {order.product_name}</p>
                  <p>Product Description: {order.product_description}</p>
                  <p>Product Price: {order.product_price}</p>
                  <hr />
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
