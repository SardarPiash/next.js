import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import Header from "../components/header";

function SearchUser() {
    const { handleSubmit } = useForm();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);
    const [user, setUser] = useState(null);
    const [nameError, setNameError] = useState(''); 
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
        setUser(null);
        setLoading(true);
        
        if (!name) {
            setNameError("Enter a Name to search"); 
            setLoading(false);
            setError(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3001/admin/showregisterduser/${name}`);          
            setUser(response.data);
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
            <div className="max-w-md mx-auto mt-10 px-4 py-8 bg-white rounded-lg shadow-md">
                <h1 className="text-red-500 text-2xl font-bold mb-4">Search a User by Name</h1>
                <form onSubmit={handleSubmit(fetchData)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {nameError && <p className="mt-1 text-red-500 text-sm">{nameError}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        {loading ? "Submitting..." : "Search User"}
                    </button>
                </form>
                <hr className="my-4 border-gray-300" />
                <h1 className="text-green-500 text-2xl font-bold mb-4">User Information:</h1>
                <div>
                    {user ? (
                        <ul>
                            <li className="mb-4">
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>NID: {user.nid}</p>
                                <p>Status: {user.status}</p>
                                <p>Address: {user.address}</p>
                            </li>
                        </ul>
                    ) : (
                        <p>No user found...</p>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default SearchUser;
