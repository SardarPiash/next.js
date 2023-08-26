import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form"; 

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
        setUser("");
        setLoading(true);
        
        if (!name) {
            setNameError("Enter A Name to search"); 
            setLoading(false);
            setError(false);
            return;
        }
        if(name){
            try {
            const response = await axios.post(`http://localhost:3001/admin/showregisterduser/${name}`);          
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }}
    };

    return (
        <>
            <Sidebar />
            <div>
                <h1 style={{ color: "red" }}>Search a user by name</h1>
                <form onSubmit={handleSubmit(fetchData)}>
                    <label htmlFor="name">User Name:</label>
                    <input name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                    {nameError && <p style={{ color: "red" }}>{nameError}</p>} 
                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Search User"}
                    </button>
                </form>
                <hr />
                <h1 style={{ color: "green" }}>User Information:</h1>
                <div>
                    {user ? (
                        <ul>
                            <li>
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
        </>
    );
}

export default SearchUser;
