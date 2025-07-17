import { generateToken } from "../lib/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{

    const {fullName,email,password} = req.body;

    try {
        
        if(!fullName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"An account with this email alreadu exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            fullName,
            email,
            password:hashedPassword
        })

        const token = generateToken(newUser._id);

        res.status(201).json({
            success:true,
            message:"Account created successfully",
            userData:{
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                createdAt:newUser.createdAt
            },
            token
        });

    } catch (error) {
        console.error("Signup Error:",error);
        res.status(500).json({
            success:false,
            message:"An internal server error occured"
        })
    }
}

export const login = async (req,res)=>{
    
    const {email,password} = req.body;
    
    try {
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success:true,
            message:"Logged in successfully",
           userData:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                createdAt:user.createdAt
            },
            token
        })

    } catch (error) {
        console.error("Error in login :",error);
        res.status(500).json({
            success:false,
            message:"An internal server error occured"
        })
    }
}

export const checkAuth = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: req.user,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Not authenticated",
  });
};
