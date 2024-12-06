import mongoose,{Schema} from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        lowerCase: true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowerCase: true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        default: undefined,
    }
},{
    timestamps: true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(incomingPassword){
    return await bcryptjs.compare(incomingPassword,this.password);
}

userSchema.methods.generateAccessToken =function(){
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.EXPIRY_ACCESS_TOKEN
        }
);
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign({
      _id:this._id
   },
   process.env.REFRESH_TOKEN,
   {
    expiresIn:process.env.EXPIRY_REFRESH_TOKEN
   });

}

export const User = mongoose.model("User",userSchema);