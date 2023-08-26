import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from "react-hook-form";
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
 <div>
    <h1>Register here</h1>
    <br></br>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>UserName:</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            {nameError && <p style={{color:'red'}}>{nameError}</p>}
            <br></br>
            <label>Password:</label>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
            {passwordError && <p style={{color:'red'}}>{passwordError}</p>}
            <br></br>
            <label>email:</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            {emailError && <p style={{color:'red'}}>{emailError}</p>}
            <br></br>
            <label>NID:</label>
            <input type="number" value={nid} onChange={(e)=>setNID(e.target.value)} />
            {nidError && <p style={{color:'red'}}>{nidError}</p>}
            <br></br>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
            {addressError && <p style={{color:'red'}}>{addressError}</p>}
            <br></br>
            <label>Status:</label>
            <input type="radio" value="admin" onChange={(e)=>setStatus(e.target.value)} />Admin
            <input type="radio" value="seller" onChange={(e)=>setStatus(e.target.value)} />seller
            <input type="radio" value="customer" onChange={(e)=>setStatus(e.target.value)} />Customer
            {statusError && <p style={{color:'red'}}>{statusError}</p>}
            <br></br>
            {userError && <p style={{ color: 'red' }}>{userError}</p>}
            <button type="submit" disabled={loading}>
            {loading ? "register..." : "registration"}
            </button>
        </div>
    </form>
    <p>Already have an account?
    <Link href="/User/login">login</Link>
    </p>
 </div>
    );
}
export default registration;