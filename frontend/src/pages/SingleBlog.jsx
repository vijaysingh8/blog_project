// import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import { StoreContext } from '../context/StoreContext';

// const SingleBlog = () => {
//   const {id}=useParams();
//   const {blogData}=useContext(StoreContext);
//   const blog=blogData.find((b)=>b._id===id);
//   return (
//     <div className='rounded-md border-1 border-gray-200 p-5 max-w-3xl flex-col gap-3 items-center justify-center mx-auto py-8'>
//     <img className='transition-transform duration-300 hover:scale-105' src={`${import.meta.env.VITE_BACKEND_URL}/images/${blog.image}`} />
//     <p className='text-2xl font-bold'>{blog.title}</p>
//     <p className='text-[#4B6BFB]'>{blog.category}</p>
//     <p >{blog.description}</p>
//     <div className='flex gap-2 items-center justify-center'>
//       <p className='text-lg font-bold'>Author:{blog.author.name}</p>
//       <img className='w-8 h-8 rounded-full' src={`${import.meta.env.VITE_BACKEND_URL}/images/${blog.author.image}`} alt="" />
//     </div>
//     <p >
//       {
//           new Date(blog.createdAt).toLocaleDateString("en-US",{
//             month:"long",
//             day:"2-digit",
//             year:"numeric",
//           })
//           }
//     </p>
//     </div>
//   )
// }

// export default SingleBlog
// import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import { StoreContext } from '../context/StoreContext';

// const SingleBlog = () => {
//   const {id}=useParams();
//   const {blogData}=useContext(StoreContext);
//   const blog=blogData.find((b)=>b._id===id);
//   return (
//     <div className='rounded-md border-1 border-gray-200 p-5 max-w-3xl flex-col gap-3 items-center justify-center mx-auto py-8'>
//     <img className='transition-transform duration-300 hover:scale-105' src={blog.image} />
//     <p className='text-2xl font-bold'>{blog.title}</p>
//     <p className='text-[#4B6BFB]'>{blog.category}</p>
//     <p >{blog.description}</p>
//     <div className='flex gap-2 items-center justify-center'>
//       <p className='text-lg font-bold'>Author:{blog.author.name}</p>
//       <img className='w-8 h-8 rounded-full' src={blog.author.image} alt="" />
//     </div>
//     <p >
//       {
//           new Date(blog.createdAt).toLocaleDateString("en-US",{
//             month:"long",
//             day:"2-digit",
//             year:"numeric",
//           })
//           }
//     </p>
//     </div>
//   )
// }

// export default SingleBlog
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token"); // ✅ get token
      if (!token) {
        setError("Login to continue");
        setLoading(false);
        return; 
      }
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blog/user/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token
            },
            withCredentials: true,
          }
        );

        setBlog(res.data.blog); // ✅ access blog correctly
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center">Loading blog...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!blog) return <p className="text-center">Blog not found</p>;

  return (
    <div className="rounded-md border border-gray-200 p-5 max-w-3xl flex-col gap-3 items-center justify-center mx-auto py-8">
      <img
        className="transition-transform duration-300 hover:scale-105 mx-auto"
        src={blog.image}
        alt={blog.title}
      />
      <p className="text-2xl font-bold mt-3">{blog.title}</p>
      <p className="text-[#4B6BFB]">{blog.category}</p>
      <p className="mt-3">{blog.description}</p>

      <div className="flex gap-2 items-center justify-center my-3">
        <p className="text-lg font-bold">Author: {blog.author?.name}</p>
        <img
          className="w-8 h-8 rounded-full"
          src={blog.author?.image}
          alt={blog.author?.name}
        />
      </div>

      <p className="text-gray-500">
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default SingleBlog;
