import Sidebar from "../components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import axios from "axios";
function updateUserProfile(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nid, setNID] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nidError, setNIDError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [userError,setUsererror]=useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { handleSubmit } = useForm();
    
    useEffect(() => {
        const userData = sessionStorage.getItem("user");
        
        if (!userData) {
          router.push('/User/login'); 
          return;
        }
    }, []);
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
         const userData = sessionStorage.getItem("user");
         if(userData){
            const parseUserData = JSON.parse(userData);
            const status1 =parseUserData.status;
            if(parseUserData.name === name){
                try {
                    const response = await axios.put(`http://localhost:3001/admin/update-profile/${name}`, {
                      name,  
                      password,
                      email,
                      nid,
                      address,
                      status1
                    });
                    console.log(response.data);
                    setLoading(false);
                    if (response.data.message === "update_success"){
                      router.push('profile');
                    }
                    else if(response.data.message==="not_update"){
                        setUsererror('User Not Updated');
                    }
                }catch(error){
                    console.error(error);
                    setLoading(false);
                    setUsererror("Something went wrong.");
                }
            }else{
                setUsererror('UserName Can Not be Changed');
                setLoading(false);
                return;
            }
         }
         

    }

    return (
        <>
        <Sidebar />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
<div className="mx-auto w-full max-w-md p-6  dark:bg-gray-900 rounded shadow-md">
  <h1 className="text-2xl font-bold text-center text-white">Update Your Profile</h1>
  <br />

  <form onSubmit={handleSubmit(onSubmit)} className="text-center">
    <div className="mb-4">
      <label htmlFor="name" className="block text-white">UserName:</label>
      <input type="text" id="name" className="w-full border rounded py-1 px-2" value={name} onChange={(e) => setName(e.target.value)} />
      {nameError && <p className="text-red-500">{nameError}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-white">Password:</label>
      <input type="password" id="password" className="w-full border rounded py-1 px-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-white">Email:</label>
      <input type="email" id="email" className="w-full border rounded py-1 px-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      {emailError && <p className="text-red-500">{emailError}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="nid" className="block text-white">NID:</label>
      <input type="number" id="nid" className="w-full border rounded py-1 px-2" value={nid} onChange={(e) => setNID(e.target.value)} />
      {nidError && <p className="text-red-500">{nidError}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="address" className="block text-white">Address:</label>
      <input type="text" id="address" className="w-full border rounded py-1 px-2" value={address} onChange={(e) => setAddress(e.target.value)} />
      {addressError && <p className="text-red-500">{addressError}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="status" className="block text-white">Status:</label>
      <div>
        <label className="mr-2 text-white">
          <input type="radio" id="status" value="admin" className="mr-1" onChange={(e) => setStatus(e.target.value)} />
          Admin
        </label>
        <label className="mr-2 text-white">
          <input type="radio" id="status" value="seller" className="mr-1" onChange={(e) => setStatus(e.target.value)} />
          Seller
        </label >
        <label className="mr-2 text-white">
          <input type="radio" id="status" value="customer" className="mr-1" onChange={(e) => setStatus(e.target.value)} />
          Customer
        </label>
      </div>
      {statusError && <p className="text-red-500">{statusError}</p>}
    </div>

    {userError && <p className="text-red-500">{userError}</p>}

    <button
      type="submit"
      disabled={loading}
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      {loading ? "Updating..." : "Update Profile"}
    </button>
  </form>
</div>
</div>
</>

    );
}
export default updateUserProfile;