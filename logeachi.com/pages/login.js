import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setLoading(true);
    setNameError('');
    setPasswordError('');
    setApiError('');

    if (!name) {
      setNameError('Please fill in the username.');
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError('Please fill in the password.');
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3001/admin/login', {
        name,
        password
      });

      console.log(response.data);
      setLoading(false);
      if (response.data.message === "Login successful") {
        console.log(name);
        const res = await axios.get(`http://localhost:3001/admin/seeuserprofile/${name}`);
        const user = res.data;
        console.log(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('name', name); 
        router.push('profile');
      }
      else if (response.data.message === "Invalid name or password") {
        setApiError("Invalid name or password");
      }
      else if (response.data.message === "User not found") {
        setApiError("User not found"); // Set the error message here
      }

    } catch (error) {
      // Handle error
      console.error(error);
      setLoading(false);
      setApiError("Something went wrong.");
    }
  };

  return (
    <div align="center">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>UserName:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
