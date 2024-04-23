import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req,res,next)=>{
      if(req?.rawHeaders[7].includes('Safari')){
         throw new ApiError(403,"Not supported in this browser!")
      }

        const token = req?.cookies?.accessToken || req.header('Authorization').replace('Bearer ',"");

        if(!token){
            throw new ApiError(401,'Unauthorized request!');
        }

        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN);
        
        if(!decoded){
         throw new ApiError(403,"Access Token expired!");
        }

       const user = await User.findById(decoded._id).select("-password -refreshToken");

       if(!user){
        throw new ApiError(400,"Invaild access token");
       }

       req.user = user;
       next();
});

export default verifyJWT;