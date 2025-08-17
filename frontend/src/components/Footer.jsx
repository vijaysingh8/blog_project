import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <>
    <div className='flex flex-col py-12 md:flex-row items-center justify-between'>
      <div className='w-full items-center flex flex-col justify-center px-2 sm:w-1/3
      gap-2'>
        <h1 className='text-xl font-bold text-gray-700'>About</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto distinctio cum incidunt libero minima eos, ab, minus sequi amet molestias fugiat sapiente sit voluptatem nulla illum delectus soluta tenetur iste?</p>
        <h4 className='text-lg font-normal '>Email: carry@gmail.com</h4>
        <h4 className='text-lg font-normal'>Phone: 1991999999</h4>
      </div>
      <div className='my-3'>
        <h1 className='text-xl font-bold text-gray-700 mb-3'>Quick Links</h1>
        <ul className='flex flex-col gap-2'>
            <Link className='cursor-pointer hover:text-black text-gray-700' to="/">Home</Link>
            <Link className='cursor-pointer hover:text-black text-gray-700' to="/blogs">Blogs</Link>
            <Link className='cursor-pointer hover:text-black text-gray-700' to="/about">About</Link>
            <Link className='cursor-pointer hover:text-black text-gray-700'  to="/contact">Contact</Link>
        </ul>
      </div>
      <div className='my-3'>
        <h1 className='text-xl font-bold text-gray-700 mb-3'>Categories</h1>
        <ul className='flex flex-col gap-2'>
            <Link className='cursor-pointer hover:text-black text-gray-700' >Weather</Link>
            <Link className='cursor-pointer hover:text-black text-gray-700' >Lifestyle</Link>
            <Link className='cursor-pointer hover:text-black text-gray-700' >Technology</Link>
            <Link className='cursor-pointer hover:text-black text-gray-700' >News</Link>
        </ul>
      </div>
    </div>
    <hr className='h-0.5 text-gray-600 bg-gray-700 w-full'/>
    <div className='flex flex-col sm:flex-row justify-between items-center my-6'>
        <div className='flex gap-2 items-center justify-center'>
            <img src={assets.logo} alt="" />
            <p>Meta <span className='font-bold text-xl'>Blog</span></p>
        </div>
        <ul className='flex flex-col sm:flex-row items-center gap-3'>
            <li>Privacy Policy</li>
            <li>Terms and conditions</li>
            <li>copyright @vijay</li>
        </ul>
    </div>
    </>
  )
}

export default Footer
