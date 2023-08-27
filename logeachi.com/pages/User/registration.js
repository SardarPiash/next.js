import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from "react-hook-form";
import header from "../components/header";
function registration(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nid, setNID] = useState('');
    //const [phone, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nidError, setNIDError] = useState('');
    // const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [userError,setUsererror]=useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { handleSubmit } = useForm();

    const onSubmit =async () =>{
    setLoading(true);
    setNameError('');
    setPasswordError('');
    setEmailError('');
    setNIDError('');
    // setPhoneNumberError('');
    setAddressError('');
    setStatusError('');

    if(!name){
        setNameError('Please Fill the Name!');
        setLoading(false);
        return;
    }
    if(!password){
        setPasswordError('Please Fill the Password!');
        setLoading(false);
        return;
     }
    if(!email){
        setEmailError('Please Fill the Email!');
        setLoading(false);
        return;
     }
     if(!nid){
        setNIDError('Please Fill the NID!');
        setLoading(false);
        return;
     }
     if(!address){
        setAddressError('Please Fill the Address!');
        setLoading(false);
        return;
     }
     if(!status){
        setStatusError('Please Fill the Satus!');
        setLoading(false);
        return;
     }
     try {
        const response = await axios.post('http://localhost:3001/admin/registration', {
          name,
          password,
          email,
          nid,
          address,
          status
        });
        console.log(response.data);
        setLoading(false);
        if(response.data.message === "Success"){
            sessionStorage.setItem('register',true);
            router.push('/User/login');
        }else if(response.data.message==="user exist"){
            setUsererror('User Exist');
        }else{
            setUsererror('something is wrong');
        }
    }
        catch(error){
            console.error(error);
            setLoading(false);
            setUsererror("Something went wrong.");
        }

    };
    

    return(
        <>
        <div>
        <header/>
        <section class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
          Logeachi.Com   
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-8 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
 <div>
    <br></br>
    <form onSubmit={handleSubmit(onSubmit)} class="space-y-4 md:space-y-6">
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName:</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a User Name..."/>
            {nameError && <p style={{color:'red'}}>{nameError}</p>}
            <br></br>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Password:</label>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password..." />
            {passwordError && <p style={{color:'red'}}>{passwordError}</p>}
            <br></br>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email..."/>
            {emailError && <p style={{color:'red'}}>{emailError}</p>}
            <br></br>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NID:</label>
            <input type="number" value={nid} onChange={(e)=>setNID(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your NID..."/>
            {nidError && <p style={{color:'red'}}>{nidError}</p>}
            <br></br>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your address..."/>
            {addressError && <p style={{color:'red'}}>{addressError}</p>}
            <br></br>
            <div>
            <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status:</label>
            <input type="radio" name="status" value="admin" onChange={(e)=>setStatus(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</label>
            <input type="radio" name="status" value="seller" onChange={(e)=>setStatus(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Seller</label>
            <input type="radio" name="status" value="customer" onChange={(e)=>setStatus(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer</label>
            {statusError && <p style={{color:'red'}}>{statusError}</p>}
            </div>
            <br></br>
            {userError && <p style={{ color: 'red' }}>{userError}</p>}
            <button type="submit" disabled={loading} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {loading ? "register..." : "Create an account"}
            </button>
        </div>
    </form>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account?
    <Link href="/User/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
    </p>
 </div>
 </div>
 </div>
 </div>
 </section>
 </div>
 </>
    );
}
export default registration;