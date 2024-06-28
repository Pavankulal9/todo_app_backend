import { option } from "../content.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

    
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: true});
    
        return {accessToken,refreshToken};
    } catch (error) {
       throw new ApiError(500,"Somthing went wrong while generating tokens!"); 
    }
}

const registerUser = asyncHandler(async(req,res)=>{
   const {name,username,email,password} = req.body;

   if([name,username,email,password].some((field)=> field.trim() === "")){
    throw new ApiError(400,"All field data is required!");
   }

   const userExist = await User.findOne({
    $or:[{email},{username}]
   });

   if(userExist){
    throw new ApiError(401,"User with email already exist");
   }

   const user = await User.create({
    name,
    username,
    email,
    password,
   });

   const createdUser = await User.findById(user._id).select("-password -todos");

   if(!user){
    throw new ApiError(500,"Server error,please try again");
   }

   res
   .status(200)
   .json(
    new ApiResponse(200,createdUser,"Registered user successfully!")
 )
});

const loginUser = asyncHandler(async(req,res)=>{
    const {username,password}= req.body;

    if(!username || username === ""){
      throw new ApiError(400,'usernama and password field required!');
    }

    const user = await User.findOne({
        $or:[{username}]
    });


    if(!user){
        throw new ApiError(401,"User do not exist!")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(403,"Invaild password!");
    }


    const{accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");


    res
    .status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(
        new ApiResponse(200,{user:{loggedInUser,accessToken:accessToken}},"User logged In successfully")
    )
});

const getCurrentUser= asyncHandler(async(req,res)=>{
    res
    .status(200)
    .json(
        new ApiResponse(200,req.user,"fetched user details sucessfully")
    )
});

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incommingRefreshToken = req?.cookies?.refreshToken || req?.body?.refreshToken;

    if(!incommingRefreshToken){
        throw new ApiError(400,"Unauthorized request!");
    }

    const decoded = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN);

    if(!decoded?._id){
        throw new ApiError(403,"Invaild refresh Token");
    }

    const user = await User.findById(decoded._id);

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id); 


    res
    .status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(
        new ApiResponse(200,{accessToken},"Access and Refresh Token updated successfully")
    );
});

const logoutUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    user.refreshToken = undefined,
    await user.save({validateBeforeSave: true});


    res.clearCookie('jwt',option);
    res.json(
        new ApiResponse(200,{},"User loggedOut successfully!")
    );
})


export {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshAccessToken,
    logoutUser,
}