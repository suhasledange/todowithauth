import jwt from 'jsonwebtoken'
import User from '../models/User.js';

// const protectRoute = async (req,res,next) =>{

//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         return res.status(401).json({
//             success:false,
//             message:"No token provided"
//         })
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);

//         const user = await User.findById(decoded.id).select("-password")

//         if(!user){
//             return res.status(404).json({
//                 success:false,
//                 message:"User not found"
//             })
//         }
//         req.user = user
//         next();
        
//     } catch (error) {
//         console.error("token error occured",error)
//         res.status(401).json({
//             message:"Invalid or expired token"
//         })
//     }
// }

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default protectRoute