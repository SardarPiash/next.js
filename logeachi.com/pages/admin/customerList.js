import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import Footer from "../components/footer";
import Header from "../components/header";

function CustomerList() {
    const [customerInfo, setCustomerInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [error, setError] = useState();

    useEffect(() => {
        const sessionData = sessionStorage.getItem("user");
        if (!sessionData) {
            router.push("/User/login");
            return;
        }
        fetchData();
    }, [router]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/admin/customer_list");
            setCustomerInfo(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return (
           <>
           <Header/>
            <Sidebar />
            <div className="flex items-center justify-center bg-gray-100 min-h-screen">
            <div className="w-3/4 p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-red-500 mb-4 text-center">Customer's List</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error.message}</p>
                ) : customerInfo.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {customerInfo.map((user, index) => (
                            <li key={index} className="mb-4 border p-4 rounded shadow">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>NID:</strong> {user.nid}</p>
                                <p><strong>Status:</strong> {user.status}</p>
                                <p><strong>Address:</strong> {user.address}</p>
                                <hr className="my-4" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Customer found</p>
                )}
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default CustomerList;
