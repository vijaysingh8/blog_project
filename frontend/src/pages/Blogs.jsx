import React, { useContext } from 'react'
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { StoreContext } from '../context/StoreContext';
const Blog = () => {
  const {blogData}=useContext(StoreContext);
  return (
    <div>
     <Hero/>
     <h1 className='text-3xl text-center  font-bold my-6'>All Blogs</h1>
     <p className='text-base px-3 sm:text-lg leading-6 max-w-2xl mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error incidunt earum neque culpa reiciendis veritatis nisi sapiente. Porro sed totam commodi illum atque, unde nemo, neque cum non, enim assumenda!</p>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4 my-6'>
        {blogData.map((blog,index)=>(
            <BlogCard key={index} id={blog._id} title={blog.title} image={blog.image}
            category={blog.category} author_name={blog.author.name} author_image={blog.author.image} 
            date={
          new Date(blog.createdAt).toLocaleDateString("en-US",{
            month:"long",
            day:"2-digit",
            year:"numeric",
          })
          } />
        ))}
      </div>
    </div>
  )
}

export default Blog
