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
        <div>
    <h1 align="Center">Update Your Profile</h1>
    <br></br>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div align="center">
            <label for="name">UserName:</label>
            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
            {nameError && <p style={{color:'red'}}>{nameError}</p>}
            <br></br>
            <label for="password">Password:</label>
            <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            {passwordError && <p style={{color:'red'}}>{passwordError}</p>}
            <br></br>
            <label for="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            {emailError && <p style={{color:'red'}}>{emailError}</p>}
            <br></br>
            <label for="nid">NID:</label>
            <input type="number" id="nid" value={nid} onChange={(e)=>setNID(e.target.value)} />
            {nidError && <p style={{color:'red'}}>{nidError}</p>}
            <br></br>
            {/* <label>Phone Number:</label>
            <input type="number" value={phone} onChange={(e)=>setPhoneNumber(e.target.value)} />
            {phoneNumberError && <p style={{color:'red'}}>{phoneNumberError}</p>}
            <br></br> */}
            <label for="address">Address:</label>
            <input type="text" id="address" value={address} onChange={(e)=>setAddress(e.target.value)} />
            {addressError && <p style={{color:'red'}}>{addressError}</p>}
            <br></br>
            <label for="status">Status:</label>
            <input type="radio" id="status" value="admin" onChange={(e)=>setStatus(e.target.value)} />Admin
            <input type="radio" id="status" value="seller" onChange={(e)=>setStatus(e.target.value)} />seller
            <input type="radio" id="status" value="customer" onChange={(e)=>setStatus(e.target.value)} />Customer
            {statusError && <p style={{color:'red'}}>{statusError}</p>}
            <br></br>
            {userError && <p style={{ color: 'red' }}>{userError}</p>}
            <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
            </button>
        </div>
    </form>
 </div>
        </>

    );
}
export default updateUserProfile;