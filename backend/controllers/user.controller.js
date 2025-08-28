import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const register=async(req,res)=>{
//     try {
//         let image_filename=`${req.file.filename}`;
//         const {name,email,password}=req.body;
//         const existingUser=await User.findOne({email});
//         if(existingUser){
//             return res.status(400).json({message:"User already exists",success:false});
//         }
//         const hashedPassword=await bcrypt.hash(password,10);
//         const user=await User.create({name,email,password:hashedPassword,image:image_filename});
//         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
//         res.status(201).json({message:"Sign up successfully",success:true,user,token});
//     } catch (error) {
//         res.status(500).json({message:"Internal server error"});
//     }
// };
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: req.file?.path || null,  // ✅ Cloudinary URL
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "Sign up successful", success: true, user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid email or password",success:false});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid email or password",success:false});

        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({message:"Login successful",success:true,token,user});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}