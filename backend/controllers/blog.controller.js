import { create } from "domain";
import Blog from "../models/blog.model.js";
import fs from 'fs';

export const allBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find({}).sort({createdAt:-1});
        return res.status(200).json({blogs,success:true,message:"All blogs"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}
export const createBlog=async(req,res)=>{
    try {
       const {title,category,description}=req.body;
       const image_filename=`${req.file.filename}`;
       const blog=await Blog.create({
              title,
              category,
              description,
              image:image_filename,
              author:{
                id:req.user._id,
                name:req.user.name,
                image:req.user.image,
              },
       });
       return res.status(201).json({message:"blog created",success:true,blog});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
};

export const deleteBlog=async(req,res)=>{
    const blog=await Blog.findById(req.params.id);
    fs.unlink(`uploads/${blog.image}`,()=>{});
    if(!blog){
         return res.status(404).json({message:"blog not found",success:false});
    }
    if(blog.author.id.toString()!==req.user.id.toString()){
        return res.status(403).json({message:"Not authorized to delete this blog",success:false});
    }
    await blog.deleteOne();
    return res.status(201).json({message:"blog deleted successfully",success:true});
};

export const singleBlog=async(req,res)=>{
    try {
       const blog=await Blog.findById(req.params.id);
       return res.status(200).json({message:"blog found",success:true,blog }); 
    } catch (error) {
        return res.status(500).json({message:"internal server error",success:false});
    }
};

export const userBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find({"author.id":req.user._id}).sort({createdAt:-1});
        res.status(200).json(blogs);
    } catch (error) {
        return  res.status(500).json({message:"internal server error",success:false});
    }
    
};
