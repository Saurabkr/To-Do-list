const collectionSchema = require("../model/collectionSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const generateToken = require("../utils/feature")

const getAllUsers = async (req,res)=>{
    
}

const logout = async (req,res)=>{

     res.status(200).cookie("token", "", {
            httpOnly : true,
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "User Logged out!"
        })
}


const register = async (req,res,next)=>{
      const {name, email, password} = req.body;

      const isPresent = await collectionSchema.findOne({email});

      if(isPresent){
        return res.status(404).json({
            status: false,
            message: 'User exist!!'
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await collectionSchema.create({name, email, password:hashedPassword});

      generateToken(user, res, "User Registered!!", 201)
}

const login = async (req,res, next)=>{
      const {email, password} = req.body;

      const user = await collectionSchema.findOne({email}).select("+password")
      console.log(user)

      if(!user){
        return res.status(404).json({
            status: false,
            message: 'Invalid email or password'
        })
      }

      const isVerified = await bcrypt.compare(password, user.password)

      if(!isVerified){
        return res.status(404).json({
            status: false,
            message: 'Invalid email or password'
        })
      }

      generateToken(user, res, `welcome ${user.name}`, 200)
}

const getUserById = async(req,res)=>{

    return res.status(200).json({
        status: true,
        user : req.user
    })

}


module.exports = {getAllUsers, register, login, getUserById, logout}