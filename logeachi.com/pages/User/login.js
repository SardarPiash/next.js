import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect } from "react";

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();
  const [sessionStatus, setSessionStatus] = useState(false);
  const[sessionMsg,setSession_msg]=useState("");


  const onSubmit = async () => {
    setLoading(true);
    setNameError('');
    setPasswordError('');
    setApiError('');
    setSession_msg('');

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
        // console.log(name);
        const res = await axios.get(`http://localhost:3001/admin/seeuserprofile/${name}`);
        const user = res.data;
        
        if(user.status !=="admin"){
          setSession_msg("You are not an Admin");
          setSessionStatus(false);
          return;
        }
      if(user.approval != "approved"){
        setSession_msg("You are not an Approved Member!");
        setSessionStatus(false);
        return;
      }
        //console.log(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('name', name); 
        router.push('/admin/profile');
      }
      else if (response.data.message === "Invalid name or password") {
        setApiError("Invalid name or password");
      }
      else if (response.data.message === "User not found") {
        setApiError("User not found"); 
      }

    } catch (error) {
      console.error(error);
      setLoading(false);
      setApiError("Something went wrong.");
    }
  };

  return (
    <> 
    <Header/>
    <section className="bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 align="center" className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <div align="center">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Name"
                  />
                  {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
                <button type="submit" disabled={loading} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              {sessionMsg && <p style={{ color: 'red' }}>{sessionMsg}</p>}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <Link href="/User/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
