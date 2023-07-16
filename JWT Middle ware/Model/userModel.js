import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true});

export default mongoose.model('user',userModel);