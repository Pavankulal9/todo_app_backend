import mongoose,{Schema} from "mongoose";

const todoSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    pin:{
        type:Boolean,
        default:false
    },
    owner:{
        type:String,
        required: true
    }
},{
    timestamps:true
});


export const Todo = mongoose.model("Todo",todoSchema);