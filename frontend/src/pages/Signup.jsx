import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'

const Signup = () => {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    image:null,
  });
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const onChangeHandler=(e)=>{
    console.log(e.target.value);
      setFormData({...formData,[e.target.name]:e.target.value});
  };
  const fileHandler=(e)=>{
    setFormData({...formData,image:e.target.files[0]});
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      const data=new FormData();
      data.append("name",formData.name);
      data.append("email",formData.email);
      data.append("password",formData.password);
      data.append("image",formData.image);
      setLoading(true);
      const res=await axios.post("http://localhost:4000/user/register",data,{
        headers:{
          "Content-Type":"multipart/formData",
        },
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className='w-full bg-pink-200 py-12 mx-auto flex items-center justify-center'>
      <div className='w-full bg-white max-w-md p-5 mx-auto py-6 border-gray-200 shadow-md '>
        <h1 className='text-lg font-bold text-center text-gray-700'>Create your account!</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-5 mt-5 w-full'>
          <input onChange={onChangeHandler} name="name" value={formData.name} type="text" placeholder='Your name' className='w-full p-2 border border-gray-300 rounded outline-none' required />
           <input onChange={onChangeHandler} name="email" value={formData.email} type="email" placeholder='Your email' className='w-full p-2 border border-gray-300 rounded outline-none' required/>
            <input onChange={onChangeHandler} name="password" value={formData.password} type="password" placeholder='Your password' className='w-full p-2 border border-gray-300 rounded outline-none' required />
             <input onChange={fileHandler} accept='image/*' type="file"  className='w-full p-2 border border-gray-300 rounded outline-none' required />
            <button className='bg-orange-600 text-white px-6 py-2 w-full cursor-pointer'> Signup</button>
        </form>
        <p className='text-center mt-4 '>Already have an account? <Link to={"/login"} className='text-orange-600 cursor-pointer'>Login Here</Link></p>
      </div>
    </div>
  )
}

export default Signup
