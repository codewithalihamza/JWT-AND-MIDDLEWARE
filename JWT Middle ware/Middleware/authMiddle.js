import JWT from 'jsonwebtoken'
import userModel from '../Model/userModel.js';


export const logInMiddle = async(req,res,next)=>{
    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.JWT_KEY)
        req.user = decode; 
        next();
    } catch (error) {
        console.log(error)
    }
};


export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !==1){
            res.send({
                message:"unAuthorized User"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
    }
}