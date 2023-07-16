import userModel from '../Model/userModel.js'
import { hashPassword, comparePassword } from '../Helper/authHash.js';
import JWT from 'jsonwebtoken'


export const regCont = async(req,res)=>{
    try {
        const{name,email,password} = req.body;

        // validation
        if(!name || !email || !password){
            return res.send({
                message:"Please Enter Something"
            })
        }
        // already register check
        const chk = await userModel.findOne({email});
        if(chk){
            return res.send({
                message:"User Already Register"
            })
        }
        //getting hash password
        const hashedPassword = await hashPassword(password);

        //saving data
        const user = await userModel({name,email,password:hashedPassword}).save();
        res.status(200).send({
            message:"User Successfully registerd",
            user
        });
    } catch (error) {
        console.log(error)
    }
};

// login

export const loginCont = async(req,res)=>{
    try {
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.send({
                message:"login error"
            })
        }

        //chk user register or not
        let user = await userModel.findOne({email})
        if(!user){
            return res.send({
                message:"user not registerd"
            })
        }

        // chk password
        let check = await comparePassword(password,user.password)
        if(!check){
            return res.send({
                message:"password is incorect"
            })
        }

        // JWT
        const token = await JWT.sign({_id:user._id} , process.env.JWT_KEY , {expiresIn:'1D'})
        res.status(201).send({
            message:"User Successfully Login",
            user:{
                name:user.name,
                email:user.email
            },
            token
        })
    } catch (error) {
        console.log(error)
    }
}


//test
export const testCont = async(req,res)=>{
    try {
        res.send({
            message:"protected route new"
        })
    } catch (error) {
        console.log(error)
    }
}